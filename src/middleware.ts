import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PRIVATE_PATHS = ['/dashboard', '/product'];
const PUBLIC_PATHS = ['/login', '/register', '/'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedPrivateRoute = PRIVATE_PATHS.includes(pathname);
  const publicRoute = PUBLIC_PATHS.includes(pathname);

  // ssr
  const token = request.cookies.get('auth')?.value;

  if (protectedPrivateRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (publicRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/dashboard/:path*',
    '/project/:path*',
  ],
};
