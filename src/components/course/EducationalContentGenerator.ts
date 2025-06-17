
interface ResourceData {
  introVideo: string;
  freeCodeCamp: string;
  docs: string;
  practiceUrl: string;
  additionalVideo: string;
  projectVideo: string;
}

interface Resource {
  title: string;
  type: string;
  url: string;
  description: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  learningObjectives: string[];
  estimatedTime: string;
  resources: Resource[];
}

const getResourcesForTopic = (topic: string, title: string): ResourceData => {
  if (topic.includes('python') || title.includes('python')) {
    return {
      introVideo: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
      freeCodeCamp: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
      docs: 'https://docs.python.org/3/tutorial/',
      practiceUrl: 'https://replit.com/languages/python3',
      additionalVideo: 'https://www.youtube.com/watch?v=8DvywoWv6fI',
      projectVideo: 'https://www.youtube.com/watch?v=8ext9G7xspg'
    };
  } else if (topic.includes('web development') || title.includes('web development') || topic.includes('html') || topic.includes('css') || topic.includes('javascript')) {
    return {
      introVideo: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
      freeCodeCamp: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
      docs: 'https://developer.mozilla.org/en-US/docs/Learn',
      practiceUrl: 'https://codepen.io/',
      additionalVideo: 'https://www.youtube.com/watch?v=hdI2bqOjy3c',
      projectVideo: 'https://www.youtube.com/watch?v=G3e-cpL7ofc'
    };
  } else if (topic.includes('react') || title.includes('react')) {
    return {
      introVideo: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
      freeCodeCamp: 'https://www.freecodecamp.org/learn/front-end-development-libraries/',
      docs: 'https://react.dev/learn',
      practiceUrl: 'https://codesandbox.io/',
      additionalVideo: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
      projectVideo: 'https://www.youtube.com/watch?v=hQAHSlTtcmY'
    };
  } else if (topic.includes('data') || topic.includes('analytics') || title.includes('data')) {
    return {
      introVideo: 'https://www.youtube.com/watch?v=ua-CiDNNj30',
      freeCodeCamp: 'https://www.freecodecamp.org/learn/data-analysis-with-python/',
      docs: 'https://www.kaggle.com/learn',
      practiceUrl: 'https://colab.research.google.com/',
      additionalVideo: 'https://www.youtube.com/watch?v=r-uOLxNrNk8',
      projectVideo: 'https://www.youtube.com/watch?v=vmEHCJofslg'
    };
  } else {
    return {
      introVideo: 'https://www.youtube.com/watch?v=zOjov-2OZ0E',
      freeCodeCamp: 'https://www.freecodecamp.org/learn/',
      docs: 'https://developer.mozilla.org/en-US/',
      practiceUrl: 'https://github.com/',
      additionalVideo: 'https://www.youtube.com/watch?v=UvBl2_0DNm0',
      projectVideo: 'https://www.youtube.com/watch?v=8uhO4jGY4DA'
    };
  }
};

export const generateEducationalContent = (courseTitle: string, courseTopic: string): Module[] => {
  const topicLower = courseTopic.toLowerCase();
  const titleLower = courseTitle.toLowerCase();
  const resources = getResourcesForTopic(topicLower, titleLower);

  return [
    {
      id: 'intro-module',
      title: `Introduction to ${courseTopic}`,
      description: 'Get started with the fundamentals and core concepts. This module provides a comprehensive overview and sets up your learning foundation.',
      learningObjectives: [
        `Understand what ${courseTopic} is and its real-world applications`,
        'Set up your development environment and tools',
        'Learn the basic terminology and concepts',
        'Complete your first hands-on exercise'
      ],
      estimatedTime: '2-3 hours',
      resources: [
        {
          title: `${courseTopic} Fundamentals - Video Tutorial`,
          type: 'video',
          url: resources.introVideo,
          description: 'Comprehensive introduction video covering the basics'
        },
        {
          title: 'Official Documentation & Getting Started Guide',
          type: 'documentation',
          url: resources.docs,
          description: 'Complete reference documentation and beginner tutorials'
        },
        {
          title: `Introduction to ${courseTopic} - Knowledge Check`,
          type: 'quiz',
          url: '#quiz-intro',
          description: 'Test your understanding of the core concepts'
        }
      ]
    },
    {
      id: 'fundamentals-module',
      title: 'Core Concepts & Hands-on Practice',
      description: 'Deep dive into essential concepts with practical exercises. Build real projects while learning best practices.',
      learningObjectives: [
        'Master the fundamental building blocks and syntax',
        'Write clean, efficient, and maintainable code',
        'Debug common issues and solve problems independently',
        'Build and deploy your first complete project'
      ],
      estimatedTime: '4-6 hours',
      resources: [
        {
          title: 'FreeCodeCamp Interactive Course',
          type: 'video',
          url: resources.freeCodeCamp,
          description: 'Complete interactive curriculum with hands-on projects'
        },
        {
          title: 'Advanced Concepts Tutorial Series',
          type: 'video',
          url: resources.additionalVideo,
          description: 'In-depth video series covering advanced topics'
        },
        {
          title: 'Practice Exercises & Code Challenges',
          type: 'documentation',
          url: resources.practiceUrl,
          description: 'Interactive coding environment for practice'
        },
        {
          title: 'Core Concepts Assessment',
          type: 'quiz',
          url: '#quiz-fundamentals',
          description: 'Comprehensive quiz covering all fundamental topics'
        }
      ]
    },
    {
      id: 'practical-module',
      title: 'Real-World Projects & Best Practices',
      description: 'Apply your knowledge to build portfolio-worthy projects. Learn industry standards and professional development practices.',
      learningObjectives: [
        'Build complex, real-world applications from scratch',
        'Implement industry best practices and design patterns',
        'Optimize performance and handle edge cases',
        'Deploy applications and manage production environments'
      ],
      estimatedTime: '6-8 hours',
      resources: [
        {
          title: 'Project-Based Learning Workshop',
          type: 'video',
          url: resources.projectVideo,
          description: 'Build complete projects step-by-step'
        },
        {
          title: 'Best Practices & Code Review Guide',
          type: 'documentation',
          url: resources.docs,
          description: 'Professional development standards and code quality guidelines'
        },
        {
          title: 'Portfolio Project Templates',
          type: 'documentation',
          url: resources.practiceUrl,
          description: 'Starter templates and project ideas for your portfolio'
        },
        {
          title: 'Final Project Assessment',
          type: 'quiz',
          url: '#quiz-final',
          description: 'Capstone project evaluation and certification quiz'
        }
      ]
    }
  ];
};
