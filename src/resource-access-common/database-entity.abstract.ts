import { Moment } from 'moment';

export abstract class AbstractDatabaseEntity {
  public id: number;
  public lastModifiedAt: Moment;
  public createdAt: Moment;
}
