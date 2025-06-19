'use server';
import React from 'react';
import { getAuthenticatedIdCookies } from '@/lib/cookies';
import { AppError, handleApiError, validateRequest } from '@/lib/errors';
import { IprojectFormValidate, SchemaZodProject } from '@/lib/validations';
import * as projectRepository from './projectRepository';
import { ERROR_CODE } from '@/lib/interface';
// Creat
export async function ProjectServiceActionCreat(body: IprojectFormValidate) {
  try {
    const ownerId = await getAuthenticatedIdCookies();
    if (!ownerId) return null;

    if (!ownerId) {
      throw new AppError(ERROR_CODE.NOT_FOUND.code, 'owner not found');
    }
    if (typeof body !== 'string') {
      const productPayload: IprojectFormValidate = {
        ...body,
        owner: ownerId,
      };
      await validateRequest(SchemaZodProject, { ...body, owner: ownerId });

      const result = await projectRepository.postData(productPayload);

      return result;
    }
  } catch (error) {
    return handleApiError(error as Error);
  }
}
// Read
export default async function ProjectServiceActionGet() {
  try {
    const userId = await getAuthenticatedIdCookies();
    if (!userId) return null;

    const result = await projectRepository.findAll(userId);

    const resultSummaries = result.map((items) => ({
      id: items.id,
      name: items.name,
      owner: items.owner.email,
      count: items._count.Membership,
      desc: items.Task.find((desc) => desc),
      createdAt: items.createdAt,
    }));

    return resultSummaries;
  } catch (error) {
    return handleApiError(error as Error);
  }
}

// Update
export async function ProjectServiceActionUpdate(
  body: IprojectFormValidate,
  id: string,
) {
  const ownerId = await getAuthenticatedIdCookies();
  if (!ownerId) return null;

  try {
    const productPayload: IprojectFormValidate = {
      ...body,
      owner: ownerId,
    };
    await validateRequest(SchemaZodProject, { ...body, owner: ownerId });

    const checkTask = await projectRepository.getById(id);

    if (!checkTask) {
      throw new AppError(ERROR_CODE.NOT_FOUND.code, 'projeck not found');
    }
    const result = await projectRepository.update(id, productPayload);
    return result;
  } catch (error) {
    return handleApiError(error as Error);
  }
}
// Delet
export async function ProjectServiceActionDelet(id: string) {
  try {
    const verify = await getAuthenticatedIdCookies();
    if (!verify) {
      throw new AppError(ERROR_CODE.UNAUTHORIZED.code, 'Unauthorized user');
    }
    const checkproject = await projectRepository.getById(id);
    if (!checkproject) {
      throw new AppError(ERROR_CODE.NOT_FOUND.code, 'projeck not found');
    }
    console.log(verify);
    if (verify !== checkproject?.ownerId) {
      throw new AppError(
        ERROR_CODE.UNAUTHORIZED.code,
        'Only the owner can delet project',
      );
    }

    const result = await projectRepository.delet(id);

    return result;
  } catch (error) {
    return handleApiError(error as Error);
  }
}
