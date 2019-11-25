import { Employee } from '../domain/entities/employee';
import { IEntityReader } from '../../../resource-access-common/entity-reader.interface';
import { injectable } from 'inversify';
import moment from 'moment';

export const EMPLOYEE_READER = 'EmployeeReader';

@injectable()
export class EmployeeReader implements IEntityReader<Employee> {
  public read(id: number): Promise<Employee> {
    console.log('mock db operation: read employee from database');
    const entity = new Employee();
    entity.id = id;
    entity.name = `${id}-name`;
    entity.lastModifiedAt = moment();
    entity.createdAt = moment();

    return Promise.resolve(entity);
  }
}
