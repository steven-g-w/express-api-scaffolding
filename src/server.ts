import 'reflect-metadata';
import * as bodyParser from 'body-parser';

import { InversifyExpressServer } from 'inversify-express-utils';

import { Container } from 'inversify';

import './api-modules/employees/loader';
import { EntityNotFoundError } from './api-common/errors/entity-not-found-error';
import { NextFunction, Request, Response } from 'express';
import { ValidationError } from './api-common/errors/validation-error';
import { registerDomainServices, registerResourceAccessServices } from './api/modularity';

// load everything needed to the Container
const container = new Container();

registerDomainServices(container);
registerResourceAccessServices(container);

// start the server
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

});

server.setErrorConfig(app => {
  app.use(function handleEntityNotFoundError(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof EntityNotFoundError) {
      return res.status(404).send();
    }
    next(error);
  });
  app.use(function handleValidationError(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof ValidationError) {
      return res.status(400).json(error.errors);
    }
    next(error);
  });
});

const serverInstance = server.build();
serverInstance.listen(3000);
