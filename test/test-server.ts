import 'reflect-metadata';
import { Container } from 'inversify';
import { registerDomainServices } from '../src/api/modularity';
import { buildServer } from '../src/app';
import { IEntityWriter } from '../src/resource-access-common/entity-writer.interfaces';
import { Employee } from '../src/api-modules/employees/domain/entities/employee';
import { EMPLOYEE_WRITER } from '../src/api-modules/employees/resource-access/employee-writer';
import { EmployeeWriterMock } from './mock/employee-writer.mock';

// load everything needed to the Container
const ctn = new Container();

registerDomainServices(ctn);

EmployeeWriterMock.reset();
ctn.bind<IEntityWriter<Employee>>(EMPLOYEE_WRITER).toConstantValue(EmployeeWriterMock.mock.object);

// start the server
const testServer = buildServer(ctn);

export default testServer;
