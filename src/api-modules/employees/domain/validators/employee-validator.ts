import { IEntityValidator } from '../../../../api-common/validator.interface';
import { Employee } from '../entities/employee';

export class EmployeeValidator implements IEntityValidator<Employee> {
  public validate(input: Employee): Promise<void> {


    return Promise.resolve();
  }
}
