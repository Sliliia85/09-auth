import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { checkSession } from './lib/api/serverApi';

const protectedRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.includes(pathname);

  // Захищені маршрути
  if (isProtectedRoute) {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    if (!accessToken && refreshToken) {
      const sessionResponse = await checkSession();

      if (!sessionResponse || sessionResponse.status !== 200) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }

      const response = NextResponse.next();

      const setCookie = sessionResponse.headers['set-cookie'] as string | string[] | undefined;
      if (setCookie) {
        const cookiesArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        cookiesArray.forEach((cookieStr) => {
          const parts = cookieStr.split(';').map(p => p.trim());
          const [nameValue, ...options] = parts;
          const separatorIndex = nameValue.indexOf('=');
          if (separatorIndex <= 0) return;

          const name = nameValue.substring(0, separatorIndex);
          const value = nameValue.substring(separatorIndex + 1);

          const cookieOptions: {
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
} = {};

options.forEach(opt => {
  const [key, val] = opt.split('=');
  switch (key.toLowerCase()) {
    case 'path':
      cookieOptions.path = val || '/';
      break;
    case 'httponly':
      cookieOptions.httpOnly = true;
      break;
    case 'secure':
      cookieOptions.secure = true;
      break;
    case 'samesite':
      cookieOptions.sameSite = (val?.toLowerCase() as 'strict' | 'lax' | 'none') || 'lax';
      break;
  }
});
          response.cookies.set(name, value, cookieOptions);
        });
      }

      return response;
    }
  }

  // Auth маршрути для залогіненого користувача
  if (isAuthRoute && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Всі інші випадки
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};