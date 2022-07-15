import { EntityTarget, InsertResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export function basicUpdate<Entity>(repesitory: Repository<Entity>, entityTarget: EntityTarget<Entity>, uuid: string, updateSet: QueryDeepPartialEntity<Entity>): Promise<Entity | void> {
  return repesitory.createQueryBuilder()
      .update(entityTarget)
      .set(updateSet)
      .where("id = :id", { id: uuid })
      .returning('*')
      .execute()
      .then((result: InsertResult) => {
        return result.raw[0]
      })
}

export function basicCreate<Entity>(repesitory: Repository<Entity>, entityTarget: EntityTarget<Entity>, createSet: QueryDeepPartialEntity<Entity>): Promise<Entity | void> {
  return repesitory.createQueryBuilder()
    .insert()
    .into(entityTarget)
    .values([
      createSet
    ])
    .returning('*')
    .execute()
    .then((result: InsertResult) => {
      return result.raw[0]
    })
}