import type { HomePageTranslations } from './types';

const es: HomePageTranslations = {
  hero: {
    name: 'Daniel Martinez.',
    description:
      '¡Hola! Soy un Ingeniero de Software de nivel medio, especializado en desarrollo full stack con Node.js y Flutter. Doy vida a las ideas a través de soluciones limpias y escalables.',
    contactButton: 'Contáctame',
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
};

export default es;
