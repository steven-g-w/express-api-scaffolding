import moment from 'moment';
import { IMapper } from '../../../../api-common/mapper.interface';
import { Employee } from '../../domain/entities/employee';
import { injectable } from 'inversify';
import { EmployeeDto } from '../../../../data-contract/employee/employee-dto';

export const EMPLOYEE_DTO_MAPPER = 'EmployeeDtoMapper';

export interface IEmployeeDtoMapper extends IMapper<Employee, EmployeeDto> {

}

@injectable()
export class EmployeeDtoMapper implements IEmployeeDtoMapper {
  public map(input: Employee): Promise<EmployeeDto> {
    const output = new EmployeeDto();
    output.id = input.id;
    output.name = input.name;
    output.lastModifiedAt = moment(input.lastModifiedAt);
    output.createdAt = moment(input.createdAt);
    return Promise.resolve(output);
  }
}
