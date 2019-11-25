import { AbstractEntityValidator } from '../../../../api-common/validations/entity-validator.abstract';
import { Employee } from '../entities/employee';
import { injectable } from 'inversify';

export const EMPLOYEE_VALIDATOR = 'EmployeeValidator';

@injectable()
export class EmployeeValidator extends AbstractEntityValidator<Employee> {
  public getValidationError(input: Employee): Promise<{ [key: string]: any; }> {
    const errors: { [key: string]: any; } = {};

    // this is an example of entity validator
    if (input.name === 'magic-trigger') {
      errors.name = 'cannot be magic-trigger';
    }

    return Promise.resolve(errors);
  }
}
