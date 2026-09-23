import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    try {
      const authValue = basicAuth.split(' ')[1];
      if (authValue) {
        // Safe decoding for Edge / Node runtimes
        const decoded = atob(authValue);
        const [user, pwd] = decoded.split(':');

        const validUser = process.env.BASIC_AUTH_USER || 'admin';
        const validPass = process.env.BASIC_AUTH_PASS || 'SkyHigh2026';

        if (user === validUser && pwd === validPass) {
          return NextResponse.next();
        }
      }
    } catch {
      // If decoding fails, fall through to prompt credentials again
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};