export type ApiErrorType = {
  field: string;
  message: string;
};

export class ApiError extends Error {
  status: number;
  errors: ApiErrorType[];

  constructor(status: number, message: string, errors: ApiErrorType[] = []) {
    super(message);
    this.errors = errors;
    this.status = status;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'You are not unauthorized');
  }

  static BadRequest(message: string, errors: ApiErrorType[]) {
    return new ApiError(400, message, errors);
  }

  static NotFound(message: string, errors: ApiErrorType[]) {
    return new ApiError(404, message, errors);
  }
}
