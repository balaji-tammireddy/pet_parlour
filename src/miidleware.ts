import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  const isDashboardRoute = /^\/[a-f\d]{24}(\/.*)?$/i.test(path);

  const isAuthPage = path === "/signin" || path === "/register";

  let decodedUser: any = null;
  if (token) {
    try {
      decodedUser = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      decodedUser = null;
    }
  }

  if (isDashboardRoute) {
    if (!decodedUser) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  if (isAuthPage && decodedUser) {
    return NextResponse.redirect(new URL(`/${decodedUser.id}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
