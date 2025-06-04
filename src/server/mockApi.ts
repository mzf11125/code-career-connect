import { IncomingMessage, ServerResponse } from 'http'; // Import Node.js types
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

interface CourseRequest {
  topic: string;
  prompt?: string;
}

interface SuccessResponse {
  courseContent: string;
  isMock?: boolean;
  message?: string;
}

interface ErrorResponse {
  error: string;
}

// Define types for Node.js http req/res if using outside a full Express app
// If you are using this within a full Express app, your original Request/Response types are fine.
// However, based on the "vite.config.ts" error, this is likely a Connect-style middleware.
type NodeHttpRequest = IncomingMessage & { body?: CourseRequest }; // Augment if body parsing is handled upstream
type NodeHttpResponse = ServerResponse;

// Initialize the Google Generative AI with your API key from environment variables
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error(
    'CRITICAL: GOOGLE_API_KEY is not defined in your environment variables. Please ensure it is set.'
  );
  // Depending on your app's needs, you might throw an error here or disable AI features.
}
const genAI = new GoogleGenerativeAI(apiKey!); // The '!' asserts apiKey is defined after the check

// Fallback mock response for when Gemini API is unavailable
const getMockCourseContent = (topic: string, prompt: string = '') => {
  return `# ${topic.toUpperCase()} - Comprehensive Learning Path

## Course Description
This course provides a comprehensive introduction to ${topic}, covering fundamental concepts, practical applications, and advanced topics. ${prompt}

## Learning Objectives
- Understand the core principles of ${topic}
- Apply ${topic} concepts to real-world scenarios
- Develop practical skills through hands-on exercises
- Master advanced techniques and best practices

## Course Outline
### Module 1: Introduction to ${topic}
- What is ${topic}?
- History and evolution
- Key concepts and terminology

### Module 2: Core Concepts
- Fundamental principles
- Common patterns and practices
- Tools and technologies

### Module 3: Advanced Topics
- Advanced techniques
- Performance optimization
- Real-world applications

### Module 4: Project Work
- Building a complete project
- Best practices
- Deployment and maintenance

## Resources
- Official documentation
- Recommended books and articles
- Online communities and forums
- Additional learning materials`;
};

// Helper function to send JSON responses using Node.js http.ServerResponse
const sendJsonResponse = (
  res: NodeHttpResponse,
  statusCode: number,
  data: SuccessResponse | ErrorResponse
) => {
  if (res.headersSent) {
    console.warn('Headers already sent, cannot send response:', data);
    return;
  }
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

export const handleGenerateCourse = async (
  req: NodeHttpRequest, // Assuming Node.js http.IncomingMessage
  res: NodeHttpResponse // Assuming Node.js http.ServerResponse
) => {
  try {
    // Body parsing: Node's http.IncomingMessage doesn't parse bodies by default.
    // This needs to be handled before this function is called if you're not in an Express-like environment.
    // For Vite, if you're using `server.middlewares.use(express.json())` before your handler, `req.body` would be populated.
    // Otherwise, you'd need to parse it manually:
    let bodyData = '';
    if (req.method === 'POST') {
        // This is a simplified body parser. For production, use a robust library or ensure Vite's middleware does it.
        await new Promise((resolve, reject) => {
            req.on('data', chunk => {
                bodyData += chunk.toString();
            });
            req.on('end', () => {
                try {
                    if (bodyData) {
                        req.body = JSON.parse(bodyData) as CourseRequest;
                    } else {
                        req.body = {} as CourseRequest; // Or handle as an error
                    }
                    resolve(undefined);
                } catch (e) {
                    reject(e);
                }
            });
            req.on('error', reject);
        });
    }


    const { topic, prompt = '' } = req.body || {}; // Ensure req.body exists

    if (!topic) {
      return sendJsonResponse(res, 400, { error: 'Topic is required' });
    }

    if (!apiKey) {
      // If API key wasn't found at startup, it's safer to not even try.
      console.error('API key not configured. Falling back to mock data.');
      const mockContent = getMockCourseContent(topic, prompt);
      return sendJsonResponse(res, 200, {
        courseContent: mockContent,
        isMock: true,
        message:
          'Using mock data due to missing API key configuration. Please contact support.',
      });
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });
      const fullPrompt = `Create a comprehensive course outline for ${topic}. ${prompt}
      Please format the response in Markdown with the following structure:
      # [Course Title]
      ## Course Description
      [Detailed description of the course]
      ## Learning Objectives
      - [Objective 1]
      - [Objective 2]
      - [Objective 3]
      ## Course Outline
      ### Module 1: [Module Title]
      - [Lesson 1.1]
      - [Lesson 1.2]
      ### Module 2: [Module Title]
      - [Lesson 2.1]
      - [Lesson 2.2]
      ## Resources
      - [Resource 1]
      - [Resource 2]`;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const courseContent = response.text();

      return sendJsonResponse(res, 200, { courseContent });
    } catch (apiError: unknown) {
      let errorMessage = 'Unknown API error';
      if (apiError instanceof Error) {
        errorMessage = apiError.message;
      }
      console.warn(
        'Falling back to mock data due to API error:',
        errorMessage,
        apiError // Log the full error object for more details
      );

      const mockContent = getMockCourseContent(topic, prompt);
      // Check if the error is a 429 (Too Many Requests) specifically
      // This check is basic; the actual error object structure from Google's SDK might be more complex
      if (errorMessage.includes('429') || errorMessage.toLowerCase().includes('quota')) {
        return sendJsonResponse(res, 200, {
          courseContent: mockContent,
          isMock: true,
          message:
            'Using mock data due to API rate limits or quota issues. For full functionality, ensure your Gemini API key has sufficient quota or try again later.',
        });
      } else {
        return sendJsonResponse(res, 200, {
          courseContent: mockContent,
          isMock: true,
          message:
            'Using mock data due to an unexpected API error. Please try again later.',
        });
      }
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in handleGenerateCourse:', errorMessage, error);

    // Ensure response is sent only once
    if (!res.headersSent) {
      return sendJsonResponse(res, 500, {
        error: 'Failed to process your request. Please try again later.',
      });
    }
  }
};