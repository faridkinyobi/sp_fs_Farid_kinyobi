'use server';

import { IregisterFormValidate, SchemaZodRegister } from '@/lib/validations';
import { handleApiError, validateRequest } from '@/lib/errors';
import bcrypt from 'bcrypt';
import * as usersRepository from '../UsersRepository';

export default async function registerAction(body: IregisterFormValidate) {
  try {
    await validateRequest(SchemaZodRegister, body);

    const hashPassword = await bcrypt.hash(body.password, 10);

    const newUser = { ...body, password: hashPassword };

    const createUser = await usersRepository.postData(newUser);

    const payload = {
      id: createUser.id,
      email: createUser.email,
    };
    return { success: true, data: payload };
  } catch (error) {
    return handleApiError(error as Error);
  }
}
