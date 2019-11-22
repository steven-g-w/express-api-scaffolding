import { Request } from 'express';
import { controller, httpGet, BaseHttpController, requestParam } from 'inversify-express-utils';
import { BaseUrlProvider } from '../../../../api-common/services/base-url-provider';

@controller('/employees')
export class GetEmployeeController extends BaseHttpController {
  public static getUrl(request: Request, id: number): string {
    return `${BaseUrlProvider.getBaseUrl(request)}/employees/${id}`;
  }

  @httpGet('/:id')
  public get(@requestParam('id') id: number) {
    return id;
  }

  @httpGet('/:id/addresses/:addressId')
  public getAddress(@requestParam('id') id: number, @requestParam('addressId') addressId: string) {
    return [id, addressId];
  }
}
