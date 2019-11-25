import { AbstractDatabaseEntity } from './database-entity.abstract';

export interface IEntityReader<T extends AbstractDatabaseEntity> {
  read(id: number): Promise<T>;
}
