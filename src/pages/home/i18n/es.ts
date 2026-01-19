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
    subtitle: 'Mis Habilidades',
    title: 'Tecnologías Con Las Que Trabajo',
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
        label: 'Base de Datos',
        items: [
          { name: 'PostgreSQL', icon: 'postgresql' },
          { name: 'MongoDB', icon: 'mongodb' },
        ],
      },
      mobile: {
        label: 'Móvil',
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
    subtitle: 'Experiencia',
    title: 'Experiencia Laboral',
    items: [
      {
        company: 'Humanforce',
        role: 'Ingeniero de Software',
        period: '2024 - Presente',
        description:
          '¡Hola! Soy un ingeniero de software en Colombia, especializado en desarrollo full stack con Nodejs y Flutter.',
        skills: ['react', 'typescript', 'nodejs', 'postgresql'],
      },
      {
        company: 'The University of Queensland',
        role: 'Ingeniero de Software',
        period: '2022 - 2024',
        description:
          'Desarrollé y mantuve aplicaciones web para proyectos de investigación académica.',
        skills: ['react', 'typescript', 'nodejs'],
      },
      {
        company: 'YouPay',
        role: 'Desarrollador de Software',
        period: '2022 - 2022',
        description:
          'Construí funcionalidades de integración de pagos y mejoré la experiencia de checkout.',
        skills: ['nodejs', 'typescript', 'mongodb'],
      },
      {
        company: 'M3 Digital',
        role: 'Desarrollador Web',
        period: '2021 - 2022',
        description:
          'Creé sitios web responsivos y aplicaciones web para diversos clientes.',
        skills: ['react', 'nodejs'],
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
