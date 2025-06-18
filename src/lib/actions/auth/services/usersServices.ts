'use server';

import { handleApiError } from '@/lib/errors';
import * as usersRepository from '../UsersRepository';
import { getAuthenticatedIdCookies } from '@/lib/cookies';

export default async function UsersActionServicesGet() {
  const userId = await getAuthenticatedIdCookies();
  if (!userId) return null;
  try {
    const result = await usersRepository.findAll();
    const resultSummaries = result.map((items) => ({
      id: items.id,
      email: items.email,
    }));
    return resultSummaries;
  } catch (error) {
    return handleApiError(error as Error);
  }
}
