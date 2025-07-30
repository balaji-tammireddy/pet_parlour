import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  const isDashboardRoute = /^\/[a-f\d]{24}(\/.*)?$/i.test(path);
  const isAuthPage = path === "/signin" || path === "/register";

  let decodedUser: any = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload } = await jwtVerify(token, secret);
      decodedUser = payload;
    } catch (err) {
      console.log("JWT verification failed:", err);
    }
  }

  console.log("Middleware Debug:", {
    path,
    token: !!token,
    decodedUser,
    isAuthPage,
    isDashboardRoute,
  });

  if (isDashboardRoute && !decodedUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (isAuthPage && decodedUser?.id) {
    return NextResponse.redirect(new URL(`/${decodedUser.id}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
