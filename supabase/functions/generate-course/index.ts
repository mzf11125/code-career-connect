
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, topic } = await req.json();
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    console.log('Generating course for topic:', topic);

    const fullPrompt = `Create a comprehensive course roadmap for: ${topic}

Please format your response EXACTLY like this structure:

# [Course Title]

[Brief course description paragraph]

## Course Goals
- Goal 1
- Goal 2
- Goal 3
- Goal 4

## Module 1: [Module Title]
[Module description paragraph]

### Learning Objectives
- Objective 1
- Objective 2
- Objective 3

### Resources
- [Video Tutorial: Intro to ${topic}](https://youtube.com/watch?v=example1)
- [Official Documentation](https://docs.example.com/getting-started)
- [Interactive Quiz: Basics](https://quiz.example.com/basics)
- [Practice Exercises](https://codepen.io/example)

## Module 2: [Module Title]
[Module description paragraph]

### Learning Objectives
- Objective 1
- Objective 2

### Resources
- [Advanced Video Tutorial](https://youtube.com/watch?v=example2)
- [Reference Documentation](https://docs.example.com/advanced)
- [Knowledge Check Quiz](https://quiz.example.com/advanced)

[Continue with 4-6 modules total]

IMPORTANT REQUIREMENTS:
1. Include 4-6 modules total
2. Each module MUST have 3-4 resources including:
   - At least 1 video tutorial (YouTube or educational platform)
   - At least 1 documentation/guide link
   - At least 1 quiz or interactive exercise
3. Use REAL, working URLs when possible (YouTube, official docs, etc.)
4. Each module should have 2-4 learning objectives
5. Focus on practical, hands-on learning
6. Make it beginner-friendly but comprehensive
7. Ensure proper markdown formatting with [Title](URL) format for all links

Topic: ${topic}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 3000,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini response received');

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    const courseContent = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ courseContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-course function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
