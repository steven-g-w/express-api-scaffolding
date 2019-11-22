export class ValidationError extends Error {
  constructor(public errors: any) {
    super();
  }
}
