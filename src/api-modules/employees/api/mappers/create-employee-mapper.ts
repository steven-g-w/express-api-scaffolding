import moment from 'moment';
import { IMapper } from '../../../../api-common/mapper.interface';
import { CreateEmployeeDto } from '../../../../data-contract/employee/create-employee-dto';
import { Employee } from '../../domain/entities/employee';
import { injectable } from 'inversify';

export const CREATE_EMPLOYEE_MAPPER = 'CreateEmployeeMapper';

export interface ICreateEmployeeMapper extends IMapper<CreateEmployeeDto, Employee> {

}

@injectable()
export class CreateEmployeeMapper implements ICreateEmployeeMapper {
  public map(input: CreateEmployeeDto): Promise<Employee> {
    const output = new Employee();
    const timeStamp = moment();
    output.name = input.name;
    output.lastModifiedAt = timeStamp;
    output.createdAt = timeStamp;
    return Promise.resolve(output);
  }
}
