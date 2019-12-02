import 'reflect-metadata';
import * as bodyParser from 'body-parser';

import { InversifyExpressServer } from 'inversify-express-utils';

import { Container } from 'inversify';

import './api-modules/employees/loader';
import createMiddleware from 'swagger-express-middleware';
import { registerDomainServices, registerResourceAccessServices } from './api/modularity';
import { registerErrorHandlers } from './api/error-handler';

export const buildServer = (container: Container) => {
  const server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    console.log('start register swagger middleware')
    createMiddleware('swagger.yaml', app, function (err, middleware) {
      // refer page https://www.npmjs.com/package/swagger-express-middleware#installation-and-use
      app.use(
        middleware.metadata(),
        middleware.CORS(),
        middleware.files(),
        middleware.parseRequest(),
        middleware.validateRequest(),
        middleware.mock()
      );
      console.log('end register swagger middleware')
    });
    console.log('proceed to constroller registration')
  });

  server.setErrorConfig(registerErrorHandlers);

  return server.build();
};

// load everything needed to the Container
const ctn = new Container();

registerDomainServices(ctn);
registerResourceAccessServices(ctn);

// start the server
const serverInstance = buildServer(ctn);

export default serverInstance;
