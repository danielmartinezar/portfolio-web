import type { HomePageTranslations } from './types';

const en: HomePageTranslations = {
  hero: {
    greeting: "HEY IT'S ME!",
    name: 'DANIEL MARTINEZ',
    description:
      'Software Engineer specialized in full stack development with Node.js and Flutter. I bring ideas to life through clean and scalable solutions.',
    contactButton: 'Lets talk',
    followMe: 'Find me on',
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
    subtitle: 'My Skills',
    title: 'Technologies I Work With',
    categories: {
      backend: {
        label: 'Backend',
        items: [
          { name: 'Node.js', icon: 'nodejs' },
          { name: 'TypeScript', icon: 'typescript' },
          { name: 'NestJS', icon: 'nestjs' },
          { name: 'Spring Boot', icon: 'springboot' },
        ],
      },
      frontend: {
        label: 'Frontend',
        items: [
          { name: 'React', icon: 'react' },
          { name: 'TypeScript', icon: 'typescript' },
        ],
      },
      database: {
        label: 'Database',
        items: [
          { name: 'PostgreSQL', icon: 'postgresql' },
          { name: 'MongoDB', icon: 'mongodb' },
        ],
      },
      mobile: {
        label: 'Mobile',
        items: [
          { name: 'Flutter', icon: 'flutter' },
        ],
      },
      devops: {
        label: 'DevOps',
        items: [
          { name: 'Git', icon: 'git' },
          { name: 'GitHub', icon: 'github' },
        ],
      },
    },
  },
  experience: {
    subtitle: 'Experience',
    title: 'Work Experience',
    items: [
      {
        company: 'Humanforce',
        role: 'Software Engineer',
        period: '2024 - Present',
        description:
          'Hi! I am a software engineer based in Colombia, specialize in full stack development with Nodejs and Flutter.',
        skills: ['react', 'typescript', 'nodejs', 'postgresql'],
      },
      {
        company: 'The University of Queensland',
        role: 'Software Engineer',
        period: '2022 - 2024',
        description:
          'Developed and maintained web applications for academic research projects.',
        skills: ['react', 'typescript', 'nodejs'],
      },
      {
        company: 'YouPay',
        role: 'Software Developer',
        period: '2022 - 2022',
        description:
          'Built payment integration features and improved checkout experience.',
        skills: ['nodejs', 'typescript', 'mongodb'],
      },
      {
        company: 'M3 Digital',
        role: 'Web Developer',
        period: '2021 - 2022',
        description:
          'Created responsive websites and web applications for various clients.',
        skills: ['react', 'nodejs'],
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
