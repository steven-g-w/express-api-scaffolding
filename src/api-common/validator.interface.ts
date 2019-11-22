export interface IEntityValidator<T> {
  validate(input: T): Promise<void>;
}
