import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkSession } from './lib/api/serverApi';

const protectedRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
const accessToken = request.cookies.get('accessToken')?.value;
const refreshToken = request.cookies.get('refreshToken')?.value;
const { pathname } = request.nextUrl;

const isProtectedRoute = protectedRoutes.some(
(route) => pathname === route || pathname.startsWith(`${route}/`)
);
const isAuthRoute = authRoutes.includes(pathname);

    if (isProtectedRoute) {
        if (!accessToken && !refreshToken) {
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
if (!accessToken && refreshToken) {
const isRefreshed = await checkSession();
if (!isRefreshed) {
return NextResponse.redirect(new URL('/sign-in', request.url));
}
return NextResponse.next();
}

}

if (isAuthRoute && (accessToken || refreshToken)) {
return NextResponse.redirect(new URL('/profile', request.url));
}

return NextResponse.next();
}

export const config = {
matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};