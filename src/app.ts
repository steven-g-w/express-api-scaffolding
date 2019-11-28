import 'reflect-metadata';
import * as bodyParser from 'body-parser';


import { Container } from 'inversify';
import express from 'express';

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

registerControllers(ctn, app);
registerErrorHandlers(app);

// start the server
// const serverInstance = buildServer(ctn);

export default app;
