
-- Insert job data into the jobs table
INSERT INTO public.jobs (
  external_id, title, company, location, job_type, description, posted_date, url, skills, responsibilities, requirements, salary_range
) VALUES 
(
  '4250448797',
  'Software Developer',
  'Fait Distribution',
  'Burlington, WI',
  'Full-time',
  'Fait Distribution is a family-owned and operated wholesale contact lens distributor and buying group. We pride ourselves in projecting a professional image to our customers that is both confident and enthusiastic. Our commitment to exceeding customer expectations and creating long lasting relationships is driven by our dedicated Associates. Being part of a family-owned company like Fait Distribution is something special. We''re a close-knit company where Associates are valued and truly drive and make an impact on our success. There are always exciting and new opportunities for you to advance your career and grow within our company. At Fait Distribution you will find a supportive and fast-paced environment with a fun work culture. We trust you will find employment here challenging, yet highly rewarding.',
  '2025-06-13',
  'https://www.linkedin.com/jobs/view/software-developer-at-fait-distribution-4250448797?refId=gkhFVmYrBcrmnokHrnzZyw%3D%3D&trackingId=RnAVIdYXM0un%2FqM4yZNY7g%3D%3D&position=23&pageNum=0',
  ARRAY['.NET', 'C#', 'Bash', 'Python', 'PHP', 'filepro'],
  'Enhance and support sales, intranet, web, warehouse, and ERP applications that support business activities. Design, develop, maintain and enhance systems based on business requirements using approved technologies and coding standards. Monitor and optimize systems to ensure best performance. Perform unit testing using tools. Document code appropriately for maintainability.',
  'A bachelor''s degree in computer science or the equivalent in relevant work experience is preferred. 3+ years programming experience in a professional environment. An aptitude and desire to learn a new programming environment is required. Must be a true team player; personable, professional, flexible, have a high level of integrity.',
  NULL
),
(
  '4252524776',
  'Software Engineer - New Grad 2025',
  'Lensa',
  'San Francisco, CA',
  'Full-time',
  'Autodesk''s Platform team is looking for a Software Engineer to join our organization that comprises of cloud services and web client components. You will be instrumental in driving key parts of the implementation of the cloud data platform of Autodesk. You''ll have the opportunity to work on applications that directly impact millions of users of Autodesk products.',
  '2025-06-17',
  'https://www.linkedin.com/jobs/view/software-engineer-new-grad-2025-at-lensa-4252524776?refId=gkhFVmYrBcrmnokHrnzZyw%3D%3D&trackingId=HIE8PcB7IUuessHMLva4fg%3D%3D&position=25&pageNum=0',
  ARRAY['Java', 'Python', 'C#', 'REST', 'AWS', 'MySQL', 'Oracle', 'MongoDB', 'CI/CD'],
  'Contribute to all aspects of service development including front-end, back-end, DevOps, and quality. Assist in the operation of the service, e.g. monitoring, alerting, metrics, logging, and troubleshooting, including participating in an on-call rotation. Work closely with senior engineers, architects, product owners to understand requirements and translate them into elegant implementations.',
  'Bachelor''s degree or equivalent experience in Computer Science. 0 – 2 years of software engineering experience. Strong CS Fundamental with experience with at least one of these programming languages (Java, Python, C#, etc). Familiar understanding of web services, including REST. Knowledge of Design Patterns and understanding of design paradigms.',
  '$85,000 - $137,500'
),
(
  '4252529494',
  'Junior Data Analyst',
  'Lensa',
  'Arlington, VA',
  'Full-time',
  'This is an exciting full-time opportunity to work in a fast-paced environment with a team of passionate technologists. We take an innovative approach to supporting our client, working side-by-side in an agile environment using emerging technologies. As a solution builder, you will be working to support the client''s mission and goals of growing an enterprise analytics platform.',
  '2025-06-17',
  'https://www.linkedin.com/jobs/view/junior-data-analyst-at-lensa-4252529494?refId=gkhFVmYrBcrmnokHrnzZyw%3D%3D&trackingId=F0Hq8h7yzAo5SJmRGVpOmA%3D%3D&position=22&pageNum=0',
  ARRAY['Python', 'R', 'SQL', 'Tableau', 'Power BI', 'Business Objects', 'Data Visualization', 'MS SQL Server'],
  'Demonstrate in-depth technical capabilities with the ability to support multiple work streams and drive assimilation of new techniques and solutions. Apply data and technical expertise in analysis, data mining and visualization of data using Business Intelligence tools and data development platforms. Evaluate data quality using SQL and data analysis techniques that improve client-reporting capabilities.',
  'Bachelor''s degree or master''s degree in Computer Science, Mathematics or STEM related discipline. 1+ Years of Experience working on Analytics and Business Intelligence focused initiatives, preferably in a consulting capacity. 1+ Years of Experience using Python, R, or other languages to build statistical models or analyze data.',
  '$50,800 - $119,200'
);
