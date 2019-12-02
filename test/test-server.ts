import 'reflect-metadata';
import { Container } from 'inversify';
import { registerDomainServices } from '../src/api/modularity';
import { buildServer } from '../src/app';
import { IEntityWriter } from '../src/resource-access-common/entity-writer.interface';
import { Employee } from '../src/api-modules/employees/domain/entities/employee';
import { EMPLOYEE_WRITER } from '../src/api-modules/employees/resource-access/employee-writer';
import { EmployeeWriterMock } from './mock/employee-writer.mock';
import { EmployeeReaderMock } from './mock/employee-reader.mock';
import { IEntityReader } from '../src/resource-access-common/entity-reader.interface';
import { EMPLOYEE_READER } from '../src/api-modules/employees/resource-access/employee-reader';

// load everything needed to the Container
const ctn = new Container();

registerDomainServices(ctn);

EmployeeWriterMock.reset();
EmployeeReaderMock.reset();

ctn.bind<IEntityWriter<Employee>>(EMPLOYEE_WRITER).toConstantValue(EmployeeWriterMock.mock.object);
ctn.bind<IEntityReader<Employee>>(EMPLOYEE_READER).toConstantValue(EmployeeReaderMock.mock.object);

// start the server
const testServer = buildServer(ctn);

export default testServer;
