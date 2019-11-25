import 'reflect-metadata';
import * as bodyParser from 'body-parser';

import { InversifyExpressServer } from 'inversify-express-utils';

import { Container } from 'inversify';

import './api-modules/employees/loader';
import { registerDomainServices, registerResourceAccessServices } from './api/modularity';
import { registerErrorHandlers } from './api/error-handler';

export const buildServer = (container: Container) => {
  const server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
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
