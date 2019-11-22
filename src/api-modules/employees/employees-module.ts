import { Container } from 'inversify';
import { ICreateEmployeeMapper, CREATE_EMPLOYEE_MAPPER, CreateEmployeeMapper } from '../../api-modules/employees/api/mappers/create-employee-mapper';
import { IEmployeeDtoMapper, EmployeeDtoMapper, EMPLOYEE_DTO_MAPPER } from './api/mappers/employee-dto-mapper';
import { Employee } from './domain/entities/employee';
import { IEntityWriter } from '../../resource-access-common/entity-writer.interfaces';
import { EmployeeWriter, EMPLOYEE_WRITER } from './resource-access/employee-writer';
import { IModule } from '../../api-common/module.interface';

export class EmployeesModule implements IModule {
  public registerDomainServices(container: Container) {
    container.bind<ICreateEmployeeMapper>(CREATE_EMPLOYEE_MAPPER).to(CreateEmployeeMapper);
    container.bind<IEmployeeDtoMapper>(EMPLOYEE_DTO_MAPPER).to(EmployeeDtoMapper);
  }

  public registerResourceAccessServices(container: Container) {
    container.bind<IEntityWriter<Employee>>(EMPLOYEE_WRITER).to(EmployeeWriter);
  }
}
