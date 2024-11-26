import { NextRequest } from "next/server";
import { authRoutes, privateRoutes } from "./lib/utils";

export function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const isLoggedIn = request.cookies.get("jwt");
  const isPrivateRoute = privateRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  /**
   * If user is logged in and is trying to access a public route, Redirect them to the /dashboard
   */
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isAuthRoute) {
    if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));
    else return;
  }
  /**
   *  If user is not logged in and is trying to access a protected route, Redirect them to the /auth/login
   */
  if (!isLoggedIn && isPrivateRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
