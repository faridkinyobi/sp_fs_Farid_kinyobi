import { NextResponse } from 'next/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { handlePrismaError } from '../../utils/server/handlerPrismaError';
import {
  ERROR_CODE,
  type ErrorCode,
  type ApiResponse,
} from '../interface/index';
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';
export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly httpStatus: number;

  constructor(errorCode: ErrorCode, customMessage?: string) {
    const { message, code, httpStatus } = ERROR_CODE[errorCode];
    super(customMessage ?? message);
    this.code = code;
    this.httpStatus = httpStatus;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const response = (
  code?: ErrorCode | number,
  message?: string,
  httpStatus?: number,
): ApiResponse<null> => {
  return {
    status: 'error' as const,
    error: {
      code: (code as ErrorCode) || ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: message || 'Something went wrong try again later',
      httpStatus: httpStatus || ERROR_CODE.INTERNAL_SERVER_ERROR.httpStatus,
    },
  };
};
export const handleApiError = (err: Error): ApiResponse<null> => {
  if (err instanceof AppError) {
    return response(err.code, err.message, err.httpStatus);
  }

  // prisma handle error
  if (err instanceof PrismaClientKnownRequestError) {
    const errorMessage: string = `${err.code} - ${handlePrismaError(err)}`;
    return response(
      ERROR_CODE.BAD_REQUEST.code,
      errorMessage,
      ERROR_CODE.BAD_REQUEST.httpStatus,
    );
  }

  // json validate
  if (
    err instanceof SyntaxError &&
    'status' in err &&
    err.status === 400 &&
    'body' in err
  ) {
    return response(
      ERROR_CODE.BAD_REQUEST.code,
      'Invalid JSON payload passed.',
      ERROR_CODE.BAD_REQUEST.httpStatus,
    );
  }

  // jwt error / token expired / belum aktif / invalid.
  if (err instanceof TokenExpiredError || err instanceof NotBeforeError) {
    return response(
      ERROR_CODE.UNAUTHORIZED.code,
      err.message,
      ERROR_CODE.UNAUTHORIZED.httpStatus,
    );
  }

  if (err instanceof JsonWebTokenError) {
    return response(
      ERROR_CODE.UNAUTHORIZED.code,
      'Authentication invalid',
      ERROR_CODE.UNAUTHORIZED.httpStatus,
    );
  }

  return response(
    ERROR_CODE.INTERNAL_SERVER_ERROR.code,
    'Internal Server Error',
    500,
  );
};
