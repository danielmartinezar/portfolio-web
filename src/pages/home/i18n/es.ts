import type { HomePageTranslations } from './types';

const es: HomePageTranslations = {
  hero: {
    greeting: 'HEY SOY YO!',
    name: 'DANIEL MARTINEZ',
    description:
      'Ingeniero de Software especializado en desarrollo full stack con Node.js y Flutter. Doy vida a las ideas a través de soluciones limpias y escalables.',
    contactButton: 'Contáctame',
    followMe: 'Sígueme en',
    imageAlt: 'Daniel Martinez',
  },
  services: {
    subtitle: 'Servicios',
    title: 'Lo Que Ofrezco',
    items: [
      {
        title: 'Desarrollo Móvil con Flutter',
        description:
          'Construyo aplicaciones móviles multiplataforma usando Flutter, entregando rendimiento nativo con una sola base de código para iOS y Android.',
      },
      {
        title: 'Desarrollo Full Stack',
        description:
          'Desarrollo web de principio a fin con Node.js, React y frameworks modernos. Desde diseño de base de datos hasta interfaces responsivas.',
      },
      {
        title: 'Soluciones en la Nube',
        description:
          'Arquitectura y despliegue en la nube usando AWS, GCP o Azure. Infraestructura escalable con pipelines CI/CD.',
      },
      {
        title: 'Desarrollo de APIs',
        description:
          'Diseño de APIs RESTful y GraphQL con Node.js. Seguras, documentadas y optimizadas para rendimiento.',
      },
    ],
  },
  skills: {
    subtitle: 'Tecnologías Principales',
    title: 'Donde Soy Experto',
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
        title: 'Nube',
        description: 'AWS, GCP, Vercel',
      },
      {
        title: 'Base de Datos',
        description: 'MongoDb, PostgreSQL, MySQL',
      },
      {
        title: 'DevOps',
        description: 'CI/CD, GitHub, Git',
      },
      {
        title: 'Móvil',
        description: 'Flutter',
      },
    ],
  },
  experience: {
    subtitle: 'Experiencia',
    title: 'Experiencia Laboral',
    items: [
      {
        logo: '/images/experience/humanforce.png',
        company: 'Humanforce',
        role: 'Ingeniero de Software',
        period: 'Ene 2024 - Presente',
        achievements: [
          'Trabajé en aplicaciones web sirviendo a más de 600,000 usuarios con un stack moderno incluyendo backend Laravel (PHP) con endpoints GraphQL, frontend React SPA (TypeScript), microservicios Node.js (TypeScript) orientados a eventos, y backends AWS Lambda (TypeScript).',
          'Mejoré el registro de emails en intelliHR integrando AWS SES y un microservicio para rastrear rebotes, quejas y estado de entrega, permitiendo a los usuarios reintentar mensajes fallidos.',
          'Construí funcionalidades de gestión de usuarios para un sistema de gestión de infraestructura multi-tenant, permitiendo a los administradores crear usuarios, asignar empresas y definir permisos (TypeScript, Angular, Lambda, API Gateway, DynamoDB).',
          'Desarrollé APIs backend para la integración de la app móvil intelliHR-Thrive, agilizando el completado de formularios en la app y aumentando las tasas de completado de tareas.',
          'Automaticé la poda de tablas grandes de base de datos para reducir el crecimiento de datos y disminuir costos de almacenamiento a largo plazo.',
          'Configuré Sumo Logic en lambdas Node.js y .NET para estandarizar el formato de logs a través de las bases de código.',
          'Mejoré el rendimiento de descarga de datos de trabajos implementando un mecanismo de streaming, haciendo las descargas significativamente más rápidas y eficientes en memoria.',
          'Implementé pruebas completas a través del stack usando Playwright, PHPUnit, Jest y Cypress.',
          'Migré endpoints REST legacy a GraphQL.',
          'Lideré actualizaciones fluidas de versiones de PHP y Laravel.',
          'Configuré ESLint y Prettier en pipelines CI/CD para hacer cumplir estándares de código y calidad consistente a través de los equipos.',
        ],
      },
      {
        logo: '/images/experience/uq.png',
        company: 'The University of Queensland',
        role: 'Ingeniero de Software',
        period: 'Nov 2022 - Ene 2024',
        achievements: [],
      },
      {
        logo: '/images/experience/youpay.png',
        company: 'YouPay',
        role: 'Desarrollador de Software',
        period: 'Feb 2022 - Nov 2022',
        achievements: [],
      },
      {
        logo: '/images/experience/m3digital.png',
        company: 'M3 Digital',
        role: 'Desarrollador Web',
        period: 'Sep 2021 - Feb 2022',
        achievements: [],
      },
    ],
  },
  contact: {
    subtitle: 'Hablemos',
    title: 'Formas de contactarme',
    description:
      'Siempre estoy feliz de escucharte. Si tienes alguna pregunta, duda, o simplemente quieres conectar, no dudes en comunicarte. Estoy aquí para ayudar y responderé con gusto cualquier cosa que necesites.',
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

export default es;
