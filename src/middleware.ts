import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { notFound } from 'next/navigation';
const PRIVATE_PATHS = ['/dashboard', '/product'];
const PUBLIC_PATHS = ['/login', '/register', '/'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedPrivateRoute = PRIVATE_PATHS.includes(pathname);
  const publicRoute = PRIVATE_PATHS.includes(pathname);

  // ssr
  const token = request.cookies.get('auth')?.value;

  if (protectedPrivateRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (publicRoute && token && !pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/project/:path*'],
};
