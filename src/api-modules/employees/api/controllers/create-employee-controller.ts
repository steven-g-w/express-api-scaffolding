import { Request, NextFunction, Response } from 'express';
import { controller, httpPost, BaseHttpController, requestBody, request } from 'inversify-express-utils';
import { body, validationResult, ValidationChain } from 'express-validator';
import { GetEmployeeController } from './get-employee-controller';
import { CreateEmployeeDto } from '../../../../data-contract/employee/create-employee-dto';
import { CREATE_EMPLOYEE_MAPPER, ICreateEmployeeMapper } from '../mappers/create-employee-mapper';
import { inject } from 'inversify';
import { EMPLOYEE_DTO_MAPPER, EmployeeDtoMapper } from '../mappers/employee-dto-mapper';
import { EMPLOYEE_WRITER } from '../../resource-access/employee-writer';
import { IEntityWriter } from '../../../../resource-access-common/entity-writer.interfaces';
import { Employee } from '../../domain/entities/employee';

const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errs: { [key: string]: any } = {};

    errors.array().forEach(error =>
      errs[error.param] = errs[error.param] ? `${errs[error.param]}, ${error.msg}` : error.msg);

    return res.status(400).json({ errors: errs });
  };
};

@controller('/employees')
export class CreateEmployeeController extends BaseHttpController {
  constructor(@inject(CREATE_EMPLOYEE_MAPPER) private inputMapper: ICreateEmployeeMapper,
    @inject(EMPLOYEE_WRITER) private writer: IEntityWriter<Employee>,
    @inject(EMPLOYEE_DTO_MAPPER) private outputMapper: EmployeeDtoMapper
  ) {
    super();
  }

  @httpPost('/', validate([
    body('name')
      .exists({ checkFalsy: true }).withMessage('this field is required').bail()
      .isLength({ min: 4, max: 10 }).withMessage('must be 4 to 10 chars long')
  ]))
  public async create(@requestBody() dto: CreateEmployeeDto, @request() req: Request) {
    const entity = await this.inputMapper.map(dto);
    const created = await this.writer.write(entity);
    const output = await this.outputMapper.map(created);
    const url = GetEmployeeController.getUrl(req, output.id);
    return this.created(url, output);
  }
}
