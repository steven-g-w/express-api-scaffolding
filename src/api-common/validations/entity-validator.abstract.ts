import { IEntityValidator } from './entity-validator.interface';
import { ValidationError } from '../errors/validation-error';
import { injectable } from 'inversify';

@injectable()
export abstract class AbstractEntityValidator<T> implements IEntityValidator<T> {

  public abstract getValidationError(input: T): Promise<{ [key: string]: any }>;

  public async validate(input: T): Promise<void> {
    const errors = await this.getValidationError(input);

    if (errors && Object.getOwnPropertyNames(errors).length) {
      throw new ValidationError(errors);
    }
  }
}
