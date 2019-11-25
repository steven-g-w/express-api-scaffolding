import { Employee } from '../domain/entities/employee';
import { IEntityWriter } from '../../../resource-access-common/entity-writer.interface';
import { injectable } from 'inversify';

export const EMPLOYEE_WRITER = 'EmployeeWriter';

@injectable()
export class EmployeeWriter implements IEntityWriter<Employee> {
  public write(entity: Employee): Promise<Employee> {
    entity.id = 137;
    console.log('mock db operation: write employee to database');
    return Promise.resolve(entity);
  }
}
