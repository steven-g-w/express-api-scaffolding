import { validationResult, ValidationChain } from 'express-validator';
import { NextFunction, Request, Response, RequestHandler } from 'express';

export const transformExpressValidator: (...validations: ValidationChain[]) => RequestHandler =
  (...validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      await Promise.all(validations.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      const errs: { [key: string]: any } = {};

      errors.array().forEach(error =>
        errs[error.param] = errs[error.param] ? `${errs[error.param]}, ${error.msg}` : error.msg);

      return res.status(400).json({ errors: errs });
    };
  };
