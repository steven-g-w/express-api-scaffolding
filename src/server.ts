import 'reflect-metadata';
import * as bodyParser from 'body-parser';


import { Container } from 'inversify';
import express from 'express';
import createMiddleware from 'swagger-express-middleware';

import { registerDomainServices, registerResourceAccessServices, registerControllers } from './api/modularity';
import { registerErrorHandlers } from './api/error-handler';

// export const buildServer = (container: Container) => {
//   const server = new InversifyExpressServer(container);

//   server.setConfig((app) => {
//     app.use(bodyParser.urlencoded({ extended: true }));
//     app.use(bodyParser.json());
//   });

//   server.setErrorConfig(registerErrorHandlers);

//   return server.build();
// };

// load everything needed to the Container
const ctn = new Container();

registerDomainServices(ctn);
registerResourceAccessServices(ctn);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



createMiddleware('swagger.yaml', app, function(err, middleware) {

  app.use(
      middleware.metadata(),
      middleware.CORS(),
      middleware.files(),
      middleware.parseRequest(),
      middleware.validateRequest(),
      middleware.mock()
  );

  registerControllers(ctn, app);
  registerErrorHandlers(app);

  app.listen(3000, function() {
      console.log('The PetStore sample is now running at http://localhost:8000');
  });
});