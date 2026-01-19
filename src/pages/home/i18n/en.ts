import type { HomePageTranslations } from './types';

const en: HomePageTranslations = {
  hero: {
    greeting: "HEY IT'S ME!",
    name: 'DANIEL MARTINEZ',
    description:
      'Software Engineer specialized in full stack development with Node.js and Flutter. I bring ideas to life through clean and scalable solutions.',
    contactButton: 'Lets talk',
    followMe: 'Follow me on',
    imageAlt: 'Daniel Martinez',
  },
  services: {
    subtitle: 'Services',
    title: 'What I Am Providing',
    items: [
      {
        title: 'Flutter Mobile Development',
        description:
          'I build cross-platform mobile applications using Flutter, delivering native performance with a single codebase for iOS and Android.',
      },
      {
        title: 'Full Stack Development',
        description:
          'End-to-end web development with Node.js, React, and modern frameworks. From database design to responsive UIs.',
      },
      {
        title: 'Cloud Solutions',
        description:
          'Cloud architecture and deployment using AWS, GCP, or Azure. Scalable infrastructure with CI/CD pipelines.',
      },
      {
        title: 'API Development',
        description:
          'RESTful and GraphQL API design with Node.js. Secure, documented, and optimized for performance.',
      },
    ],
  },
  skills: {
    subtitle: 'Core Technologies',
    title: 'Where I Am Expert',
    items: [
      {
        title: 'Backend',
        description: 'Springboot, Nodejs, Nestjs, Express',
      },
      {
        title: 'Frontend',
        description: 'React, Vite, NextJs',
      },
      {
        title: 'Cloud',
        description: 'AWS, GCP, Vercel',
      },
      {
        title: 'Database',
        description: 'MongoDb, PostgreSQL, MySQL',
      },
      {
        title: 'DevOps',
        description: 'CI/CD, GitHub, Git',
      },
      {
        title: 'Mobile',
        description: 'Flutter',
      },
    ],
  },
  experience: {
    subtitle: 'Experience',
    title: 'Work Experience',
    items: [
      {
        logo: '/images/experience/humanforce.png',
        company: 'Humanforce',
        role: 'Software Engineer',
        period: 'Jan 2024 - Present',
        achievements: [
          'Worked on web applications serving 600,000+ users with a modern tech stack including a Laravel backend (PHP) with GraphQL endpoints, a React SPA frontend (TypeScript), event-driven Node.js (TypeScript) microservices, and also AWS Lambda backends (TypeScript).',
          'Enhanced the email log in intelliHR by integrating AWS SES and a microservice to track bounce, complaint, and delivery status, allowing users to retry failed messages.',
          'Built user management features for a multi-tenant infrastructure management system, enabling administrators to create users, assign companies, and define permissions (TypeScript, Angular, Lambda, API Gateway, DynamoDB).',
          'Developed backend APIs for the intelliHR-Thrive mobile app integration, streamlining in-app form completion and boosting task completion rates.',
          'Automated pruning of large database tables to reduce data growth and lower long-term storage costs.',
          'Setup Sumo Logic in Node.js and .NET lambdas to standardise logging format across codebases.',
          'Improved job data download performance by implementing a streaming mechanism, making downloads significantly faster and more memory-efficient.',
          'Implemented comprehensive testing across the stack using Playwright, PHPUnit, Jest and Cypress.',
          'Migrated legacy REST endpoints to GraphQL.',
          'Led smooth PHP and Laravel version upgrades.',
          'Setup ESLint and Prettier in CI/CD pipelines to enforce coding standards and consistent code quality across teams.',
        ],
      },
      {
        logo: '/images/experience/uq.png',
        company: 'The University of Queensland',
        role: 'Software Engineer',
        period: 'Nov 2022 - Jan 2024',
        achievements: [],
      },
      {
        logo: '/images/experience/youpay.png',
        company: 'YouPay',
        role: 'Software Developer',
        period: 'Feb 2022 - Nov 2022',
        achievements: [],
      },
      {
        logo: '/images/experience/m3digital.png',
        company: 'M3 Digital',
        role: 'Web Developer',
        period: 'Sep 2021 - Feb 2022',
        achievements: [],
      },
    ],
  },
  contact: {
    subtitle: 'Lets Talk',
    title: 'Ways to contact me',
    description:
      "I'm always happy to hear from you. If you have any questions, doubts, or simply want to connect, feel free to reach out. I'm here to help and will gladly answer anything you need.",
    items: [
      {
        icon: 'email',
        value: 'danimartinezar1205@gmail.com',
      },
      {
        icon: 'phone',
        value: '+57 3024689083',
      },
      {
        icon: 'location',
        value: 'Barranquilla, Colombia',
      },
    ],
  },
};

export default en;
