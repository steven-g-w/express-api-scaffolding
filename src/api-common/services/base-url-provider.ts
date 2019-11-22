import { Request } from 'express';

export class BaseUrlProvider {
  public static getBaseUrl(request: Request): string {
    return `${request.protocol}://${request.get('host')}`;
  }
}
