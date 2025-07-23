import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(`Root Middleware - Path: ${pathname}`);

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/cadastro'],
};
