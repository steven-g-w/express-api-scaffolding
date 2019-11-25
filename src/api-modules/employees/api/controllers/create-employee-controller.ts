import { Request } from 'express';
import { body } from 'express-validator';
import { controller, httpPost, BaseHttpController, requestBody, request } from 'inversify-express-utils';
import { GetEmployeeController } from './get-employee-controller';
import { CreateEmployeeDto } from '../../../../data-contract/employee/create-employee-dto';
import { CREATE_EMPLOYEE_MAPPER, ICreateEmployeeMapper } from '../mappers/create-employee-mapper';
import { inject } from 'inversify';
import { EMPLOYEE_DTO_MAPPER, EmployeeDtoMapper } from '../mappers/employee-dto-mapper';
import { EMPLOYEE_WRITER } from '../../resource-access/employee-writer';
import { IEntityWriter } from '../../../../resource-access-common/entity-writer.interface';
import { Employee } from '../../domain/entities/employee';
import { transformExpressValidator } from '../../../../api-common/validations/transform-express-validator';
import { EMPLOYEE_VALIDATOR, EmployeeValidator } from '../../domain/validators/employee-validator';

@controller('/employees')
export class CreateEmployeeController extends BaseHttpController {
  constructor(@inject(CREATE_EMPLOYEE_MAPPER) private inputMapper: ICreateEmployeeMapper,
    @inject(EMPLOYEE_WRITER) private writer: IEntityWriter<Employee>,
    @inject(EMPLOYEE_DTO_MAPPER) private outputMapper: EmployeeDtoMapper,
    @inject(EMPLOYEE_VALIDATOR) private validator: EmployeeValidator
  ) {
    super();
  }

  @httpPost('/', transformExpressValidator(
    body('name')
      .exists({ checkFalsy: true }).withMessage('this field is required').bail()
      .isLength({ min: 4, max: 16 }).withMessage('must be 4 to 16 chars long')
  ))
  public async create(@requestBody() dto: CreateEmployeeDto, @request() req: Request) {
    const entity = await this.inputMapper.map(dto);

    await this.validator.validate(entity);

    const created = await this.writer.write(entity);
    const output = await this.outputMapper.map(created);
    const url = GetEmployeeController.getUrl(req, output.id);
    return this.created(url, output);
  }
}
