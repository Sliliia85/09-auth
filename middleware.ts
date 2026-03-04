import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/', '/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    const { pathname } = request.nextUrl;

    if (!session && protectedRoutes.some(route => pathname === route || pathname.startsWith('/notes/'))) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    if (session && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], };