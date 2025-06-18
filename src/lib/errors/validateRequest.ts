import z, { ZodSchema } from 'zod';
import { AppError } from './handler-error';
import { ERROR_CODE } from '../interface';
import { joiClearMessage } from '../../utils/server';

export const validateRequest = async (
  schema: ZodSchema<any>,
  input: any = 'body',
) => {
  const result = await schema.safeParseAsync(input);
  const message = joiClearMessage(result.error?.errors);
  if (!result.success) {
    throw new AppError(ERROR_CODE.BAD_REQUEST.code, message);
  }
  return result;
};
