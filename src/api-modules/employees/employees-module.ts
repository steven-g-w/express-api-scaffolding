import { Container } from 'inversify';
import { ICreateEmployeeMapper, CREATE_EMPLOYEE_MAPPER, CreateEmployeeMapper } from '../../api-modules/employees/api/mappers/create-employee-mapper';
import { IEmployeeDtoMapper, EmployeeDtoMapper, EMPLOYEE_DTO_MAPPER } from './api/mappers/employee-dto-mapper';
import { Employee } from './domain/entities/employee';
import { IEntityWriter } from '../../resource-access-common/entity-writer.interface';
import { EmployeeWriter, EMPLOYEE_WRITER } from './resource-access/employee-writer';
import { IModule } from '../../api-common/module.interface';
import { IEntityReader } from '../../resource-access-common/entity-reader.interface';
import { EmployeeReader, EMPLOYEE_READER } from './resource-access/employee-reader';
import { IEntityValidator } from '../../api-common/validations/entity-validator.interface';
import { EmployeeValidator, EMPLOYEE_VALIDATOR } from './domain/validators/employee-validator';

export class EmployeesModule implements IModule {
  public registerDomainServices(container: Container) {
    container.bind<ICreateEmployeeMapper>(CREATE_EMPLOYEE_MAPPER).to(CreateEmployeeMapper);
    container.bind<IEmployeeDtoMapper>(EMPLOYEE_DTO_MAPPER).to(EmployeeDtoMapper);
    container.bind<IEntityValidator<Employee>>(EMPLOYEE_VALIDATOR).to(EmployeeValidator);
  }

  public registerResourceAccessServices(container: Container) {
    container.bind<IEntityWriter<Employee>>(EMPLOYEE_WRITER).to(EmployeeWriter);
    container.bind<IEntityReader<Employee>>(EMPLOYEE_READER).to(EmployeeReader);
  }
}
