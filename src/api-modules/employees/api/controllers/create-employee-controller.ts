import { Request, Response, NextFunction, Router } from 'express';
import { body, ValidationChain } from 'express-validator';
// import { controller, httpPost, BaseHttpController, requestBody, request } from 'inversify-express-utils';
// import { GetEmployeeController } from './get-employee-controller';
import { CreateEmployeeDto } from '../../../../data-contract/employee/create-employee-dto';
import { CREATE_EMPLOYEE_MAPPER, ICreateEmployeeMapper } from '../mappers/create-employee-mapper';
import { inject, injectable } from 'inversify';
import { EMPLOYEE_DTO_MAPPER, EmployeeDtoMapper } from '../mappers/employee-dto-mapper';
import { EMPLOYEE_WRITER } from '../../resource-access/employee-writer';
import { IEntityWriter } from '../../../../resource-access-common/entity-writer.interface';
import { Employee } from '../../domain/entities/employee';
import { EMPLOYEE_VALIDATOR, EmployeeValidator } from '../../domain/validators/employee-validator';
import { EmployeeDto } from '../../../../data-contract/employee/employee-dto';

@injectable()
export class CreateEmployeeController {
  constructor(@inject(CREATE_EMPLOYEE_MAPPER) private inputMapper: ICreateEmployeeMapper,
    @inject(EMPLOYEE_WRITER) private writer: IEntityWriter<Employee>,
    @inject(EMPLOYEE_DTO_MAPPER) private outputMapper: EmployeeDtoMapper,
    @inject(EMPLOYEE_VALIDATOR) private validator: EmployeeValidator) {
  }

  public async invoke(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const output = await this.create(req.body);
      // const url = GetEmployeeController.getUrl(req, output.id);
      // temporarily removed for a fake value
      const url = 'GetEmployeeController.getUrl(req, output.id)';
      return res.status(201).header('location', url).send(output);
    } catch (err) {
      next(err);
    }
  }

  private async create(dto: CreateEmployeeDto): Promise<EmployeeDto> {
    const entity = await this.inputMapper.map(dto);
    await this.validator.validate(entity);
    const created = await this.writer.write(entity);
    return await this.outputMapper.map(created);
  }
}
