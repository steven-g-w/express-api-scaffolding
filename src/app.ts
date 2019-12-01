import 'reflect-metadata';
import * as bodyParser from 'body-parser';


import { Container } from 'inversify';
import express, { Application, RequestHandler } from 'express';
import createMiddleware from 'swagger-express-middleware';

import { registerDomainServices, registerResourceAccessServices, registerControllers } from './api/modularity';
import { registerErrorHandlers } from './api/error-handler';
import { ValidationError } from './api-common/errors/validation-error';

export class ApplicationFactory {
  public static async buildApplication(): Promise<Application> {
    const ctn = new Container();

    registerDomainServices(ctn);
    registerResourceAccessServices(ctn);

    const app = express();
    // app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(bodyParser.json());

    console.log('resgistering swagger')
    await new Promise(resolve => createMiddleware('swagger.yaml', app, function (err, middleware) {
      app.use(
        middleware.metadata(),
        middleware.CORS(),
        middleware.parseRequest(),
        middleware.validateRequest(),
      );
        console.log('registered swagger')
      resolve();
    }));
    console.log('resgistering controller')

    registerControllers(ctn, app);
    registerErrorHandlers(app);

    return app;
  }
}
