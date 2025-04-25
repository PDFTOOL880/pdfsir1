import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the path starts with /dashboard
  if (path.startsWith('/dashboard')) {
    const token = await getToken({ req: request });
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Continue with i18n middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};