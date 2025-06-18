'use server';

import { getAuthenticatedIdCookies } from '@/lib/cookies';
import { AppError, handleApiError, validateRequest } from '@/lib/errors';
import * as settingRepository from './settingRepository';
import { ERROR_CODE } from '@/lib/interface';
import { IsettingFormValidate, SchemaZodSetting } from '@/lib/validations';

export default async function settingServiceActionCreat(
  body: IsettingFormValidate,
) {
  const verify = await getAuthenticatedIdCookies();
  if (!verify) return null;
  try {
    // console.log(body);
    await validateRequest(SchemaZodSetting, body);

    // check user berdasarkan id ada tidak
    const checkMember = await settingRepository.getUsersById(body.userId ?? '');

    if (!checkMember) {
      throw new AppError(ERROR_CODE.NOT_FOUND.code, 'emial not found');
    }

    //check member sudah terdaftar atau belum di project
    const checkMemberProject = await settingRepository.getByIdMemeber(
      body.userId ?? '',
      body.projectId ?? '',
    );

    if (checkMemberProject) {
      throw new AppError(
        ERROR_CODE.NOT_FOUND.code,
        'User is already a member of this project',
      );
    }

    // check projeck ada atau tidak
    const checkProject = await settingRepository.getByIdproject(
      body.projectId ?? '',
    );
    if (!checkProject) {
      throw new AppError(ERROR_CODE.NOT_FOUND.code, 'project not found');
    }

    // chek apakah projeck di miliki owner tidak
    if (checkProject.ownerId !== verify) {
      throw new AppError(
        ERROR_CODE.UNAUTHORIZED.code,
        'Only project owner can add members',
      );
    }
    const payload = {
      project: body.projectId ?? '',
      user: body.userId ?? '',
    };
    const result = await settingRepository.postData(payload);
    return result;
  } catch (error) {
    return handleApiError(error as Error);
  }
}
