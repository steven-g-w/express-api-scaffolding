import { Moment } from 'moment';

export class EmployeeDto {
  public id: number;
  public name: string;
  public lastModifiedAt: Moment;
  public createdAt: Moment;
}
