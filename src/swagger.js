import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'adoptme usuarios api',
      version: '1.0.0',
      description: 'Documentación de api para el modulo users',
    },
    servers: [
      { url: 'http://localhost:8080', description: 'Servidor local' }
    ],
  },
  apis: ['./src/routes/users.router.js'],
};

const specs = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
};