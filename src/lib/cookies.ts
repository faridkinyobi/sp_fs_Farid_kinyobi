'use server';

import { cookies } from 'next/headers';

import { AppError, handleApiError } from './errors';
import { verifyAccessToken } from '@/utils/server';
import { ERROR_CODE } from './interface';
import { config } from '@/config';
import { redirect } from 'next/navigation';
type Props = {
  token: string;
};

export default async function Creatcookies({ token }: Props) {
  const cookieStore = await cookies();
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

  cookieStore.set('auth', token, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getAuthCookies() {
  const cookieStore = await cookies();
  return cookieStore.get('auth')?.value || '';
}
export async function deletCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('auth');
}

export async function getAuthenticatedIdCookies(): Promise<string> {
  try {
    const token = await getAuthCookies();

    if (!token) {
      redirect('/login');
    }
    const verifyId = (await verifyAccessToken(token)) as {
      id: string;
      email: string;
    };
    return verifyId.id;
  } catch (error) {
    handleApiError(error as Error);
    throw error;
  }
}
