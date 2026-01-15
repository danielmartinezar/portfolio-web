import type { HomePageTranslations } from './types';

const en: HomePageTranslations = {
  hero: {
    name: 'Daniel Martinez.',
    description:
      "Hi! I'm a Mid-level Software Engineer, specialized in full stack development with Node.js and Flutter. I bring ideas to life through clean and scalable solutions.",
    contactButton: 'Lets talk',
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
};

export default en;
