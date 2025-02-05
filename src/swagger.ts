import { OpenAPIV3 } from 'openapi-types';
import { Application } from 'express';

export const setupSwagger = (app: Application, swaggerDocument: OpenAPIV3.Document) => {
  const paths: OpenAPIV3.PathsObject = {};

  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      const route = middleware.route;
      const path = route.path;
      const method = Object.keys(route.methods)[0];

      if (!paths[path]) {
        paths[path] = {};
      }
    }
  });

  swaggerDocument.paths = paths;
};