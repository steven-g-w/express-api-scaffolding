import { AbstractDatabaseEntity } from './database-entity.abstract';

export interface IEntityWriter<T extends AbstractDatabaseEntity> {
  write(entity: T): Promise<T>;
}
