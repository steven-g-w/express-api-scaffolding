import { EntityNotFoundError } from '../api-common/errors/entity-not-found-error';
import { Request, Response, NextFunction, Application } from 'express';
import { ValidationError } from '../api-common/errors/validation-error';

const handleEntityNotFoundError = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof EntityNotFoundError) {
    return res.status(404).send();
  }
  next(error);
};

const handleValidationError = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({ errors: error.errors });
  }
  next(error);
};

const handleOtherError = (error: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).send(error);
};

export const registerErrorHandlers = (app: Application) => {
  app
    .use(handleEntityNotFoundError)
    .use(handleValidationError)
    .use(handleOtherError);
};
