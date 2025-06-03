
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { enhancementType, resumeContent, userPrompt, resumeId } = await req.json();

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    // Get auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Verify user
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Create enhancement prompts based on type
    let systemPrompt = '';
    let userPromptText = '';

    switch (enhancementType) {
      case 'rephrase':
        systemPrompt = `You are an expert resume writer specializing in ATS-friendly resumes for FAANG/MAANG companies. 
        Rephrase the provided resume content to be more impactful while maintaining accuracy. 
        Focus on action verbs, quantifiable achievements, and technical keywords.
        Return the enhanced content in the same JSON structure as provided.`;
        userPromptText = `Rephrase this resume content to be more compelling and ATS-friendly:\n\n${JSON.stringify(resumeContent, null, 2)}`;
        break;

      case 'rewrite':
        systemPrompt = `You are an expert resume writer specializing in ATS-friendly resumes for FAANG/MAANG companies.
        Completely rewrite the provided resume content to be more professional and impactful.
        Improve sentence structure, add relevant technical keywords, and enhance descriptions.
        Return the enhanced content in the same JSON structure as provided.`;
        userPromptText = `Rewrite this resume content to be more professional and impactful:\n\n${JSON.stringify(resumeContent, null, 2)}`;
        break;

      case 'ats_optimize':
        systemPrompt = `You are an ATS optimization expert for FAANG/MAANG companies.
        Optimize the provided resume content for Applicant Tracking Systems.
        Add relevant keywords, improve formatting suggestions, and enhance technical terminology.
        Return the enhanced content in the same JSON structure as provided.`;
        userPromptText = `Optimize this resume content for ATS systems:\n\n${JSON.stringify(resumeContent, null, 2)}`;
        break;

      case 'custom':
        systemPrompt = `You are an expert resume writer specializing in ATS-friendly resumes for FAANG/MAANG companies.
        Follow the specific instructions provided by the user to enhance the resume content.
        Return the enhanced content in the same JSON structure as provided.`;
        userPromptText = `${userPrompt}\n\nResume content:\n${JSON.stringify(resumeContent, null, 2)}`;
        break;

      default:
        throw new Error('Invalid enhancement type');
    }

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\n${userPromptText}\n\nIMPORTANT: Respond with valid JSON only. No markdown formatting or additional text.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const enhancedText = data.candidates[0].content.parts[0].text;
    
    // Parse the enhanced content
    let enhancedContent;
    try {
      enhancedContent = JSON.parse(enhancedText);
    } catch (parseError) {
      // If parsing fails, try to extract JSON from the response
      const jsonMatch = enhancedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        enhancedContent = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse enhanced content as JSON');
      }
    }

    // Store the enhancement in the database
    const { data: enhancement, error: dbError } = await supabase
      .from('resume_enhancements')
      .insert({
        user_id: user.id,
        resume_id: resumeId,
        enhancement_type: enhancementType,
        original_content: resumeContent,
        enhanced_content: enhancedContent,
        user_prompt: userPrompt,
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save enhancement');
    }

    return new Response(JSON.stringify({
      success: true,
      enhancedContent,
      enhancementId: enhancement.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in enhance-resume function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to enhance resume' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
