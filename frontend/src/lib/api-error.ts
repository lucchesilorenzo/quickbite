import type {
  AuthenticationExceptionResponse,
  AuthorizationExceptionResponse,
  ModelNotFoundExceptionResponse,
  ValidationExceptionResponse,
} from "@/api/backend/models";

/**
 * Error payloads returned by the API.
 */
export type ApiErrorData =
  | ValidationExceptionResponse
  | AuthenticationExceptionResponse
  | AuthorizationExceptionResponse
  | ModelNotFoundExceptionResponse
  | { success: boolean; message: string };

/**
 * Error thrown by the API client for every failed request.
 */
export class ApiError<TData = ApiErrorData> extends Error {
  public constructor(
    message: string = "An error occurred while making the request.",
    public readonly status: number | null = null,
    public readonly data: TData | null = null,
  ) {
    super(message);

    this.name = "ApiError";
  }
}
