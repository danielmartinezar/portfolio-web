import type { HomePageTranslations } from './types';

const es: HomePageTranslations = {
  hero: {
    name: 'DANIEL MARTINEZ',
    slogan: 'Donde la creatividad se encuentra con la ingeniería',
    description:
      'Ingeniero de Software, especializado en desarrollo de principio a fin. Doy vida a las ideas a través de soluciones limpias y escalables.',
    contactButton: 'Contáctame',
    followMe: 'Encuéntrame en',
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
    subtitle: 'Mi Trayectoria',
    title: 'Compañías Donde He Trabajado',
    showMore: 'Ver más',
    showLess: 'Ver menos',
    items: {
      'mosaiq': {
        role: 'Ingeniero Full Stack',
        description:
          'Plataforma SaaS impulsada por IA para construcción de marca que ayuda a empresas a crear y documentar su identidad de marca profesionalmente. Construyendo agentes conversacionales de IA usando LangGraph que guían a usuarios a través de preguntas estructuradas para generar documentos de branding de alta calidad.',
      },
      'dappsco-fifco': {
        role: 'Ingeniero Backend Mid-level',
        description:
          'Líder costarricense de alimentos y bebidas con una app gamificada de aprendizaje que involucra usuarios mediante quizzes, colección de puntos y canje de recompensas. Construyendo servicios backend escalables con Node.js, Strapi y PostgreSQL. Desplegando en Google Cloud (Cloud Run, Cloud Build, Cloud Storage).',
      },
      'brentunited': {
        role: 'Ingeniero Frontend',
        description:
          'Empresa líder en acabados arquitectónicos con 6 años de experiencia especializada en Alucobond, Louvers, rótulos, portones y estructuras metálicas. Diseñé y desarrollé el sitio web corporativo usando React, TypeScript y Vite, desplegado en Vercel.',
      },
      'refundo': {
        role: 'Ingeniero Backend',
        description:
          'Plataforma bancaria todo-en-uno para preparadores de impuestos que ofrece productos bancarios competitivos y herramientas de crecimiento. Construí una API Server-Driven UI (SDUI) con NestJS que sirve interfaces dinámicas y datos hidratados para una app móvil Flutter, siguiendo mejores prácticas y arquitectura limpia.',
      },
      'dappsco-realay': {
        role: 'Ingeniero Backend Mid-level',
        description:
          'Startup inmobiliaria que proporciona una plataforma basada en app para simplificar la gestión de propiedades y comunicación entre agentes y clientes. Construí APIs RESTful modulares usando NestJS, TypeORM, PostgreSQL y Supabase. Desplegué soluciones escalables con AWS (ECS, S3, Lambda) y Docker.',
      },
      'software-sushi-babel-street': {
        role: 'Ingeniero Frontend',
        description:
          'Plataforma de inteligencia impulsada por IA para detección de amenazas y gestión de riesgos. Desarrollé interfaces de usuario responsivas usando Next.js, React, Redux y Material UI. Construí arquitectura frontend escalable y optimicé el rendimiento de la aplicación.',
      },
      'ucover': {
        role: 'Ingeniero Frontend',
        description:
          'Plataforma móvil innovadora que transforma el descubrimiento local, conectando usuarios con experiencias culturales y recreativas. Desarrollé interfaces amigables usando React y Ant Design. Integré Wompi como pasarela de pagos.',
      },
      'overnights': {
        role: 'Ingeniero Full Stack',
        description:
          'Startup de alquileres vacacionales con app web y móvil sin comisiones para reservas directas entre anfitriones y huéspedes. Desarrollé funcionalidades full-stack usando MongoDB, Express, React, Node.js. Integré Stripe para pagos y desplegué en Google Cloud Platform y DigitalOcean.',
      },
    },
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
