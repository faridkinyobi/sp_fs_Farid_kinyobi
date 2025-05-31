'use server';

import { cookies } from 'next/headers';

export async function setAuthCookies(token: string, role: string) {
  const cookieStore = await cookies();

  cookieStore.set('auth', token, {
    path: '/',
    httpOnly: true,
  });

  cookieStore.set('role', role, {
    path: '/',
    httpOnly: true,
  });
}
export async function getAuthCookies() {
  const cookieStore = await cookies();
  return cookieStore.get('auth')?.value || '';
}
export async function deletCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('auth');
  cookieStore.delete('role');
}
