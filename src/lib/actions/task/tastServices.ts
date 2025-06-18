'use server';

import { getAuthenticatedIdCookies } from '@/lib/cookies';
import { AppError, handleApiError, validateRequest } from '@/lib/errors';
import { ItaskFormValidate, SchemaZodTask } from '@/lib/validations';
import * as taskRepository from './taskRepository';
import { ERROR_CODE } from '@/lib/interface';

// creat
export async function TaskServiceActionCreat(body: ItaskFormValidate) {
  const ownerId = await getAuthenticatedIdCookies();
  if (!ownerId) return null;
  try {
    await validateRequest(SchemaZodTask, body);

    // check projeck
    const checkProject = await taskRepository.getByIdproject(body.projectId);
    if (!checkProject) {
      throw new AppError(ERROR_CODE.NOT_FOUND.code, 'Project not found');
    }
    // check member owner
    const checkMember = await taskRepository.getMemberByOwner(
      ownerId,
      body.projectId,
    );

    if (!checkMember) {
      throw new AppError(ERROR_CODE.NOT_FOUND.code, 'member not found');
    }

    const taskInput = {
      title: body.title,
      description: body.description,
      projectId: body.projectId,
      assigneeId: ownerId,
    };
    const result = await taskRepository.postData(taskInput);

    return result;
  } catch (error) {
    return handleApiError(error as Error);
  }
}

// Read
export async function TaskServiceActionGet(id: string) {
  const verify = await getAuthenticatedIdCookies();
  if (!verify) return null;
  try {
    const checkTask = await taskRepository.getByIdproject(id);

    if (!checkTask) {
      throw new AppError(ERROR_CODE.NOT_FOUND.code, 'project not found');
    }
    const userId = await getAuthenticatedIdCookies();
    const result = await taskRepository.findAll(userId, id);

    return result;
  } catch (error) {
    return handleApiError(error as Error);
  }
}
// Update
export async function TaskServiceActionUpdate(body: string[], id: string) {
  const verify = await getAuthenticatedIdCookies();
  if (!verify) return null;
  try {
    const taskPayload = { ...body, id: id };

    await validateRequest(SchemaZodTask, taskPayload);
    const checkTask = await taskRepository.getById(taskPayload.id);

    if (!checkTask) {
      throw new AppError(ERROR_CODE.NOT_FOUND.code, 'Tasks cannot be moved');
    }

    const result = await taskRepository.update(id, taskPayload);

    return result;
  } catch (error) {
    return handleApiError(error as Error);
  }
}

// delet
export async function TaskServiceActionDelet(id: string) {
  const verify = await getAuthenticatedIdCookies();
  if (!verify) return null;
  try {
    const checkTask = await taskRepository.getById(id);

    if (!checkTask) {
      throw new AppError(ERROR_CODE.NOT_FOUND.code, 'project not found');
    }
    const result = await taskRepository.delet(id);

    console.log(result);
    // return result;
  } catch (error) {
    return handleApiError(error as Error);
  }
}
