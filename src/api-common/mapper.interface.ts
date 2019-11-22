export interface IMapper<TInput, TOutput> {
  map(input: TInput): Promise<TOutput>;
}
