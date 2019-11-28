// import { Request } from 'express';
// import { controller, httpGet, BaseHttpController, requestParam } from 'inversify-express-utils';
// import { BaseUrlProvider } from '../../../../api-common/services/base-url-provider';
// import { inject } from 'inversify';
// import { EMPLOYEE_READER } from '../../resource-access/employee-reader';
// import { IEntityReader } from '../../../../resource-access-common/entity-reader.interface';
// import { Employee } from '../../domain/entities/employee';
// import { EmployeeDtoMapper, EMPLOYEE_DTO_MAPPER } from '../mappers/employee-dto-mapper';

// @controller('/employees')
// export class GetEmployeeController extends BaseHttpController {
//   public static getUrl(request: Request, id: number): string {
//     return `${BaseUrlProvider.getBaseUrl(request)}/employees/${id}`;
//   }

//   constructor(@inject(EMPLOYEE_READER) private reader: IEntityReader<Employee>,
//     @inject(EMPLOYEE_DTO_MAPPER) private outputMapper: EmployeeDtoMapper
//   ) {
//     super();
//   }

//   @httpGet('/:id')
//   public async get(@requestParam('id') id: number) {
//     const entity = await this.reader.read(id);
//     return await this.outputMapper.map(entity);
//   }
// }
