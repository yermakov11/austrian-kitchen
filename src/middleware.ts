import { getToken, GetTokenParams} from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  let params: GetTokenParams = {
      req: request,
      secret: process.env.AUTH_SECRET ?? "secret"
  }

  if(process.env.NODE_ENV === "production"){
      params = {
        ...params,
        cookieName: "__Secure-authjs.session-token"
      }
  }


  const token = await getToken(params)

  const protectedRoutes = ["/ingredients"];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

