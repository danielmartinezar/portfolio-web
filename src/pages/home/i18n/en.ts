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
