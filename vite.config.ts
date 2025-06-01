
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { handleGenerateCourse } from "./src/server/mockApi";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Proxy API requests to our mock implementation
      '/api/generate-course': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          
          // Handle the POST request to /api/generate-course
          proxy.on('proxyReq', (proxyReq, req, res) => {
            if (req.url === '/api/generate-course' && req.method === 'POST') {
              let body = '';
              
              req.on('data', (chunk) => {
                body += chunk.toString();
              });
              
              req.on('end', async () => {
                try {
                  // Parse the body and add it to the request object
                  const parsedBody = JSON.parse(body);
                  // Extend the request object with the parsed body
                  (req as any).body = parsedBody;
                  await handleGenerateCourse(req as any, res as any);
                } catch (error) {
                  console.error('Error handling proxy request:', error);
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Internal Server Error' }));
                }
              });
              
              return true; // Indicates that we've handled the request
            }
            
            return false;
          });
        }
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
