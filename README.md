# UnemployedCSStudents

<div align="center">

**Your ultimate platform for mentorship, learning resources, and job opportunities for CS students and graduates**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-unemployedcsstudents.com-4AE3B5?style=for-the-badge&logo=web&logoColor=white)](https://unemployedcsstudents.com)
[![GitHub Stars](https://img.shields.io/github/stars/mzf11125/unemployedcsstudents?style=for-the-badge&logo=github)](https://github.com/mzf11125/unemployedcsstudents/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/mzf11125/unemployedcsstudents?style=for-the-badge&logo=github)](https://github.com/mzf11125/unemployedcsstudents/network/members)
[![License](https://img.shields.io/github/license/mzf11125/unemployedcsstudents?style=for-the-badge)](LICENSE)

</div>

## 🚀 About

UnemployedCSStudents is a comprehensive career acceleration platform designed specifically for computer science students and recent graduates. Our platform bridges the gap between academic learning and industry readiness by providing personalized mentorship, AI-powered resume building, real-time job opportunities, and educational resources.

### 🎯 Key Features

- **🧑‍🏫 Expert Mentorship**: Connect with industry professionals from FAANG/MAANG companies
- **📄 AI Resume Builder**: Create ATS-friendly resumes with AI enhancement and optimization
- **💼 Job Opportunities**: Real-time job listings synchronized from LinkedIn with smart filtering
- **📚 Learning Resources**: Curated educational content and skill development courses
- **🤖 AI-Powered Tools**: Resume enhancement, job matching, and skill gap analysis
- **👥 Community**: Connect with peers and build professional networks

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

</div>

### Frontend

- **React 18** - Modern UI library with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Radix-based component library
- **React Router** - Client-side routing
- **React Hook Form** - Performant forms with easy validation
- **Zustand** - Lightweight state management

### Backend & Services

- **Supabase** - Backend-as-a-Service (Database, Auth, Real-time)
- **PostgreSQL** - Primary database
- **Supabase Edge Functions** - Serverless functions
- **Gemini AI API** - AI-powered resume enhancement
- **LinkedIn Job API** - Real-time job data synchronization

### Development & Deployment

- **ESLint & Prettier** - Code linting and formatting
- **GitHub Actions** - CI/CD pipeline
- **Digital Ocean** - Cloud hosting and deployment
- **Vercel** - Frontend deployment (alternative)

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/mzf11125/unemployedcsstudents.git
cd unemployedcsstudents

# Install dependencies
npm install

# Start development server
npm run dev

```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript type checking

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate test coverage report
```

## 📁 Project Structure

```
unemployedcsstudents/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── MentorCard.tsx
│   │   ├── ResumeBuilder.tsx
│   │   └── ...
│   ├── pages/            # Route components
│   │   ├── Index.tsx
│   │   ├── Resume.tsx
│   │   ├── Jobs.tsx
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services and external integrations
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   └── styles/           # Global styles and Tailwind config
├── supabase/
│   ├── functions/        # Edge functions
│   └── migrations/       # Database migrations
├── docs/                 # Documentation
└── tests/               # Test files
```

## 🌟 Features Overview

### 👨‍🏫 Mentorship Platform

- Browse and connect with verified industry mentors
- Book 1:1 video sessions
- Real-time chat functionality
- Session scheduling and management
- Mentor ratings and reviews

### 📄 AI-Powered Resume Builder

- **Smart Templates**: Industry-specific resume templates
- **AI Enhancement**:
  - Content rephrasing for impact
  - ATS optimization
  - Complete rewrites with better structure
  - Custom enhancement with user prompts
- **Job Tailoring**: Customize resumes for specific job applications
- **Multi-format Export**: PDF, DOCX, and HTML formats
- **Version Management**: Track and manage multiple resume versions

### 💼 Job Opportunities

- Real-time job synchronization from LinkedIn
- Smart job filtering and search
- One-click resume optimization for specific jobs
- Direct application links
- Salary insights and company information

### 📚 Educational Resources

- Curated learning paths for different CS specializations
- Interactive coding challenges
- Industry best practices and guidelines
- Career guidance and interview preparation

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style

- Follow the existing code style and conventions
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📖 API Documentation

For detailed API documentation, visit our [API Docs](docs/API.md) or check the inline documentation in the service files.

### Key Endpoints

- **Authentication**: `/auth/*`
- **Mentors**: `/api/mentors`
- **Jobs**: `/api/jobs`
- **Resumes**: `/api/resumes`
- **AI Enhancement**: `/api/enhance-resume`

## 🚀 Deployment

The application is deployed on Digital Ocean and accessible at [unemployedcsstudents.com](https://unemployedcsstudents.com).

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy to your hosting provider
# (specific steps depend on your hosting choice)
```

### Automated Deployment

We use GitHub Actions for automated deployment. Check `.github/workflows/` for configuration details.

## 📊 Performance & Analytics

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Optimized with code splitting and tree shaking
- **SEO**: Fully optimized for search engines

## 🔒 Security

- **Authentication**: Supabase Auth with JWT tokens
- **Data Protection**: End-to-end encryption for sensitive data
- **API Security**: Rate limiting and request validation
- **GDPR Compliance**: Privacy-first approach to data handling

## 📱 Browser Support

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 🆘 Support

If you encounter any issues or have questions:

1. Check our [FAQ](docs/FAQ.md)
2. Search existing [GitHub Issues](https://github.com/mzf11125/unemployedcsstudents/issues)
3. Create a new issue with detailed information
4. Join our [Discord community](https://discord.gg/unemployedcs) for real-time help

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

<div align="center">

### Lead Developer & Project Creator

[![Muhammad Zidan Fatonie](https://img.shields.io/badge/Muhammad%20Zidan%20Fatonie-Project%20Creator-4AE3B5?style=for-the-badge&logo=github)](https://github.com/mzf11125)

**Muhammad Zidan Fatonie** - _Full Stack Developer_

- 📧 Email: [zidanfatonie@gmail.com](mailto:zidanfatonie@gmail.com)
- 🔗 LinkedIn: [Muhammad Zidan Fatonie](https://linkedin.com/in/muhammad-zidan-fatonie)
- 🐙 GitHub: [@mzf11125](https://github.com/mzf11125)

</div>

### Contributions Welcome!

We're always looking for contributors to help improve UnemployedCSStudents. Whether you're fixing bugs, adding features, or improving documentation, your contributions are valued!

## 🙏 Acknowledgments

- **Supabase** for providing an excellent backend platform
- **Vercel** for hosting and deployment solutions
- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **React community** for continuous innovation and support

## 📈 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/mzf11125/unemployedcsstudents?style=for-the-badge)
![GitHub code size](https://img.shields.io/github/languages/code-size/mzf11125/unemployedcsstudents?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/mzf11125/unemployedcsstudents?style=for-the-badge)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/mzf11125/unemployedcsstudents?style=for-the-badge)

---

<div align="center">

**Made with ❤️ by [Muhammad Zidan Fatonie](https://github.com/mzf11125)**

⭐ **Star this repository if you found it helpful!** ⭐

</div>
