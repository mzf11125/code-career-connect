
import { ResumeContent } from "./resumeEnhancementService";

export const generateResumeHTML = (resumeContent: ResumeContent): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${resumeContent.fullName} - Resume</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
        }
        h2 {
          color: #34495e;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        .contact-info {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .section {
          margin-bottom: 25px;
        }
        .skills {
          background: #e8f4fd;
          padding: 15px;
          border-radius: 5px;
        }
        @media print {
          body { margin: 0; padding: 15px; }
        }
      </style>
    </head>
    <body>
      <h1>${resumeContent.fullName}</h1>
      
      <div class="contact-info">
        <p><strong>Email:</strong> ${resumeContent.email}</p>
        <p><strong>Phone:</strong> ${resumeContent.phone}</p>
      </div>

      <div class="section">
        <h2>Professional Summary</h2>
        <p>${resumeContent.summary.replace(/\n/g, '<br>')}</p>
      </div>

      <div class="section skills">
        <h2>Skills</h2>
        <p>${resumeContent.skills.replace(/\n/g, '<br>')}</p>
      </div>

      <div class="section">
        <h2>Work Experience</h2>
        <div>${resumeContent.experience.replace(/\n/g, '<br>')}</div>
      </div>

      <div class="section">
        <h2>Education</h2>
        <div>${resumeContent.education.replace(/\n/g, '<br>')}</div>
      </div>
    </body>
    </html>
  `;
};

export const downloadResumeAsHTML = (resumeContent: ResumeContent, filename?: string) => {
  const html = generateResumeHTML(resumeContent);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `${resumeContent.fullName.replace(/\s+/g, '_')}_Resume.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadResumeAsPDF = async (resumeContent: ResumeContent, filename?: string) => {
  // For now, we'll download as HTML and suggest the user print to PDF
  // In a production app, you'd use a PDF generation service
  downloadResumeAsHTML(resumeContent, filename?.replace('.pdf', '.html'));
  
  // Show instructions for converting to PDF
  return {
    success: true,
    message: "Resume downloaded as HTML. Use your browser's 'Print to PDF' feature to convert to PDF format."
  };
};
