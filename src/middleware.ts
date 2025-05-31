import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }
 
  const token = request.cookies.get('auth')?.value;
  const role = request.cookies.get('role')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (role?.toLowerCase() === 'Admin' && !pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard/artikel', request.url));
  }

  if (role?.toLowerCase() === 'User' && !pathname.startsWith('/users')) {
    return NextResponse.redirect(new URL('/users', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/user/:path*'],
};
