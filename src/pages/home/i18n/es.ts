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
