export class ApiError extends Error {
  status: number;
  errors: Record<string, unknown>;

  constructor(
    status: number,
    message: string,
    errors: Record<string, unknown> = {}
  ) {
    super(message);
    this.errors = errors;
    this.status = status;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'You are not unauthorized');
  }

  static BadRequest(message: string, errors: Record<string, unknown>) {
    return new ApiError(400, message, errors);
  }

  static NotFound(message: string, errors: Record<string, unknown>) {
    return new ApiError(404, message, errors);
  }
}
