import type { HomePageTranslations } from "./types";

const en: HomePageTranslations = {
  hero: {
    name: "DANIEL MARTINEZ",
    slogan: "Where creativity meets engineering",
    description:
      "Software Engineer, specialized in end-to-end development. I bring ideas to life through clean and scalable solutions.",
    contactButton: "Lets talk",
    followMe: "Find me on",
    imageAlt: "Daniel Martinez",
  },
  services: {
    subtitle: "Services",
    title: "What I Am Providing",
    items: [
      {
        title: "Flutter Mobile Development",
        description:
          "I build cross-platform mobile applications using Flutter, delivering native performance with a single codebase for iOS and Android.",
      },
      {
        title: "Full Stack Development",
        description:
          "End-to-end web development with Node.js, React, and modern frameworks. From database design to responsive UIs.",
      },
      {
        title: "Cloud Solutions",
        description:
          "Cloud architecture and deployment using AWS, GCP, or Azure. Scalable infrastructure with CI/CD pipelines.",
      },
      {
        title: "API Development",
        description:
          "RESTful and GraphQL API design with Node.js. Secure, documented, and optimized for performance.",
      },
    ],
  },
  skills: {
    subtitle: "My Skills",
    title: "Technologies I Work With",
    categories: {
      backend: {
        label: "Backend",
        items: [
          { name: "Node.js", icon: "nodejs" },
          { name: "TypeScript", icon: "typescript" },
          { name: "NestJS", icon: "nestjs" },
          { name: "Spring Boot", icon: "springboot" },
        ],
      },
      frontend: {
        label: "Frontend",
        items: [
          { name: "React", icon: "react" },
          { name: "TypeScript", icon: "typescript" },
        ],
      },
      database: {
        label: "Database",
        items: [
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "MongoDB", icon: "mongodb" },
        ],
      },
      mobile: {
        label: "Mobile",
        items: [{ name: "Flutter", icon: "flutter" }],
      },
      devops: {
        label: "DevOps",
        items: [
          { name: "Git", icon: "git" },
          { name: "GitHub", icon: "github" },
        ],
      },
    },
  },
  experience: {
    subtitle: "My Journey",
    title: "Companies I've Worked With",
    showMore: "Show more",
    showLess: "Show less",
    items: {
      mosaiq: {
        role: "Full Stack Engineer",
        description:
          "AI-powered SaaS platform for brand building that helps businesses create and document their brand identity professionally. Building conversational AI agents using LangGraph that guide users through structured questions to generate high-quality branding documents.",
      },
      "dappsco-fifco": {
        role: "Mid-level Backend Engineer",
        description:
          "Costa Rican food & beverage leader with a gamified learning app that engages users through quizzes, point collection, and reward redemption. Building scalable backend services with Node.js, Strapi, and PostgreSQL. Deploying on Google Cloud (Cloud Run, Cloud Build, Cloud Storage).",
      },
      brentunited: {
        role: "Frontend Engineer",
        description:
          "Leading company in architectural finishes with 6 years of experience specializing in Alucobond, Louvers, signs, gates, and metal structures. Designed and developed the corporate website using React, TypeScript, and Vite, deployed on Vercel.",
      },
      refundo: {
        role: "Backend Engineer",
        description:
          "All-in-one banking platform for tax preparers offering competitive bank products and growth tools. Built a Server-Driven UI (SDUI) API with NestJS that serves dynamic UIs and hydrated data for a Flutter mobile app, following best practices and clean architecture.",
      },
      "dappsco-realay": {
        role: "Mid-level Backend Engineer",
        description:
          "Real estate startup providing an app-based platform to simplify property management and communication between agents and clients. Built modular RESTful APIs using NestJS, TypeORM, PostgreSQL, and Supabase. Deployed scalable solutions with AWS (ECS, S3, Lambda) and Docker.",
      },
      "software-sushi-babel-street": {
        role: "Frontend Engineer",
        description:
          "AI-powered intelligence platform for threat detection and risk management. Developed responsive user interfaces using Next.js, React, Redux, and Material UI. Built scalable frontend architecture and optimized application performance.",
      },
      ucover: {
        role: "Frontend Engineer",
        description:
          "Innovative mobile platform that transforms local discovery, connecting users with cultural and recreational experiences. Developed user-friendly interfaces using React and Ant Design. Integrated Wompi as payment gateway.",
      },
      overnights: {
        role: "Full Stack Engineer",
        description:
          "Vacation rental startup with a no-fee web and mobile app for direct host-guest booking. Developed full-stack features using MongoDB, Express, React, Node.js. Integrated Stripe for payments and deployed on Google Cloud Platform and DigitalOcean.",
      },
    },
  },
  contact: {
    subtitle: "Lets Talk",
    title: "Ways to contact me",
    description:
      "I'm always happy to hear from you. If you have any questions, doubts, or simply want to connect, feel free to reach out. I'm here to help and will gladly answer anything you need.",
    items: [
      {
        icon: "email",
        value: "danimartinezar1205@gmail.com",
      },
      {
        icon: "phone",
        value: "+57 3024689083",
      },
      {
        icon: "location",
        value: "Barranquilla, Colombia",
      },
    ],
  },
};

export default en;
