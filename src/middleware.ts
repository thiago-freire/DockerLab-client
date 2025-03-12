import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'
import data from './data.json';

export async function middleware(request: NextRequest) {
  
  const session = (await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  }));

  if (session) {

    console.log(session);

    const interestingItems = new Set(data);
    const isItemInSet = interestingItems.has(session.email!);

    console.log(isItemInSet);
    
    if(!isItemInSet && request.nextUrl.pathname !== "/home/visitante"){
      const response = NextResponse.redirect(new URL('/home/visitante', request.nextUrl));
      return response;
    } else if (request.nextUrl.pathname === "/") {
      const response = NextResponse.redirect(new URL('/home/viplab', request.nextUrl));
      return response;
    }
  } else {
    const response = NextResponse.redirect(new URL('/login', request.nextUrl));
    return response;
  }

  return NextResponse.next()
}

// Rotas que o middleware não deve rodar
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|login|signup).*)'],
}