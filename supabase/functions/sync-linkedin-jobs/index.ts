
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LinkedInJobData {
  jobId?: string;
  title?: string;
  company?: string;
  location?: string;
  jobType?: string;
  description?: string;
  postedDate?: string;
  url?: string;
  skills?: string[];
  responsibilities?: string;
  requirements?: string;
  salaryRange?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { searchQuery = 'software engineer', location = 'United States', limit = 50 } = await req.json().catch(() => ({}))

    // Call Apify LinkedIn Jobs Scraper
    const apifyResponse = await fetch('https://api.apify.com/v2/acts/curious_coder~linkedin-jobs-scraper/run-sync-get-dataset-items?token=apify_api_VaNqJEAygTv56eRurxSMYAo9lFt6942FmrOB', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchQuery,
        location,
        maxItems: limit,
      }),
    })

    if (!apifyResponse.ok) {
      throw new Error(`Apify API error: ${apifyResponse.status}`)
    }

    const linkedInJobs: LinkedInJobData[] = await apifyResponse.json()
    console.log(`Fetched ${linkedInJobs.length} jobs from LinkedIn`)

    let syncedCount = 0
    let errorCount = 0

    // Process and upsert each job
    for (const job of linkedInJobs) {
      try {
        if (!job.jobId || !job.title || !job.company) {
          console.log('Skipping job with missing required fields:', job)
          continue
        }

        // Parse posted date
        let postedDate = null
        if (job.postedDate) {
          const dateStr = job.postedDate.replace(/\D/g, '')
          if (dateStr) {
            const daysAgo = parseInt(dateStr)
            if (!isNaN(daysAgo)) {
              postedDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            }
          }
        }

        // Extract skills from description and requirements
        const combinedText = `${job.description || ''} ${job.requirements || ''}`.toLowerCase()
        const skillKeywords = ['javascript', 'typescript', 'react', 'node.js', 'python', 'java', 'sql', 'aws', 'docker', 'kubernetes', 'git', 'agile', 'scrum']
        const extractedSkills = skillKeywords.filter(skill => combinedText.includes(skill.toLowerCase()))

        const { error } = await supabaseClient.rpc('upsert_job', {
          p_external_id: job.jobId,
          p_title: job.title,
          p_company: job.company,
          p_location: job.location || location,
          p_job_type: job.jobType || 'Full-time',
          p_description: job.description || '',
          p_posted_date: postedDate,
          p_url: job.url || `https://linkedin.com/jobs/view/${job.jobId}`,
          p_skills: extractedSkills.length > 0 ? extractedSkills : job.skills || [],
          p_responsibilities: job.responsibilities || '',
          p_requirements: job.requirements || '',
          p_salary_range: job.salaryRange || null,
        })

        if (error) {
          console.error('Error upserting job:', error)
          errorCount++
        } else {
          syncedCount++
        }
      } catch (jobError) {
        console.error('Error processing job:', jobError)
        errorCount++
      }
    }

    console.log(`Sync completed: ${syncedCount} jobs synced, ${errorCount} errors`)

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully synced ${syncedCount} jobs from LinkedIn`,
        syncedCount,
        errorCount,
        totalFetched: linkedInJobs.length,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Sync error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
