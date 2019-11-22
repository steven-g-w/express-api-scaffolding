import { IMock, Mock, It } from 'typemoq';
import { IEntityWriter } from '../../src/resource-access-common/entity-writer.interfaces';
import { Employee } from '../../src/api-modules/employees/domain/entities/employee';
import { EmployeeWriter } from '../../src/api-modules/employees/resource-access/employee-writer';

export class EmployeeWriterMock {
  private static mockService: IMock<IEntityWriter<Employee>>;

  public static get mock(): IMock<IEntityWriter<Employee>> {
    return EmployeeWriterMock.mockService;
  }

  public static reset() {
    EmployeeWriterMock.mockService = Mock.ofType<IEntityWriter<Employee>>(EmployeeWriter);
    this.mockService.setup(service => service.write(It.isAny())).returns((entity: Employee) => Promise.resolve(entity));
  }

  public static createReturns(entity: Employee) {
    this.mockService.setup(service => service.write(It.isAny())).returns(() => Promise.resolve(entity));
  }
}
