'use server';


import { AppError, handleApiError } from '@/lib/errors';
import bcrypt from 'bcrypt';
import * as usersRepository from '../UsersRepository';
import { ERROR_CODE } from '@/lib/interface';
import { generateAccessToken } from '@/utils/server';
import { validateRequest } from '@/lib/errors';
import Creatcookies from '@/lib/cookies';
import { IAuthFormValidate, SchemaZodAut } from '@/lib/validations';

export default async function loginAction(body: IAuthFormValidate) {
  try {
    await validateRequest(SchemaZodAut, body);

    const checkEmail = await usersRepository.getEmail(body.email);
    if (!checkEmail) {
      throw new AppError(ERROR_CODE.FORBIDDEN.code, 'Emial Invalid Credentials');
    }
    const verifyPassword = await bcrypt.compare(
      body.password,
      checkEmail.password,
    );
    if (!verifyPassword) {
      throw new AppError(ERROR_CODE.FORBIDDEN.code, 'Invalid Credentials');
    }
    const payload = {
      id: checkEmail.id,
      email: checkEmail.email,
    };
    const tokenJwt = await generateAccessToken(payload);

    await Creatcookies({ token: tokenJwt });

    return { ...payload, token: tokenJwt };
  } catch (error) {
    return handleApiError(error as Error);
  }

  //   revalidatePath('/dashboard');
}
