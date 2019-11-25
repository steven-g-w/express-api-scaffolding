/**
 * The purpose of entity validator is to keep validation logic
 * close to the entity so it can be reused at different places
 */
export interface IEntityValidator<T> {
  validate(input: T): Promise<void>;
}
