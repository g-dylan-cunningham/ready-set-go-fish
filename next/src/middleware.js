import { NextResponse } from 'next/server'
import { headers } from 'next/headers';

export function middleware(request) {
  // const headersList = headers()
  // headersList.forEach((key, value) => console.log(`${key} ==> ${value}`))
  // const referer = headersList.get('authorization')
  // console.log('midllware"', request.nextUrl.pathname, referer)
  // if (request.nextUrl.pathname.startsWith('/admin')) {
  //   // console.log("startsWith('/admin')")
  //   const cookieStore = cookies();
  //   const cartelCookie = cookieStore.get('cartel-jwt');
  //   const isValidToken = cartelCookie?.value === 'token';
  //   if (!isValidToken) { // cookies().get('cartel-jwt') !== 'token'
  //     console.log("invalid TOKEN")
  //     return NextResponse.rewrite(new URL('/', request.url)) // shows '/' but keeps current url
  //   }
  //   return NextResponse.next();
  // }
}