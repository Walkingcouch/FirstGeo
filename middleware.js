import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    try {
      const authValue = basicAuth.split(' ')[1];
      // Decodes the base64 credentials
      const [user, pwd] = atob(authValue).split(':');

      const validUser = process.env.BASIC_AUTH_USER || 'admin';
      const validPass = process.env.BASIC_AUTH_PASS || 'SkyHigh2026';

      if (user === validUser && pwd === validPass) {
        return NextResponse.next();
      }
    } catch (e) {
      // If decoding fails, fall through to 401 prompt
    }
  }

  // Return authentication challenge
  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all paths except internal Next.js assets and static files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};