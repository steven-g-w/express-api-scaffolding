import { IMock, Mock, It } from 'typemoq';
import { IEntityWriter } from '../../src/resource-access-common/entity-writer.interface';
import { Employee } from '../../src/api-modules/employees/domain/entities/employee';
import { IEntityReader } from '../../src/resource-access-common/entity-reader.interface';
import { EmployeeReader } from '../../src/api-modules/employees/resource-access/employee-reader';

export class EmployeeReaderMock {
  private static mockService: IMock<IEntityReader<Employee>>;

  public static get mock(): IMock<IEntityReader<Employee>> {
    return EmployeeReaderMock.mockService;
  }

  public static reset() {
    EmployeeReaderMock.mockService = Mock.ofType<IEntityReader<Employee>>(EmployeeReader);
  }

  public static readReturns(entity: Employee) {
    this.mockService.setup(service => service.read(It.isAny())).returns(() => Promise.resolve(entity));
  }
}
