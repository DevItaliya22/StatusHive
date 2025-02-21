import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.BASE_DOMAIN}`);

  if (hostname === "app.localhost:3000") {
    const cookieStore = await cookies();
    cookieStore.set("next-auth.session-token",process.env.LOCAL_SESSION_TOKEN! || "NOT-FOUND" ,{
      domain : "app.localhost",
      path : "/",
    })
  }
  
  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;
  // console.log("Hostname", hostname);
  // console.log("path", path);
  // console.log("searchParams", searchParams);

  // rewrites for app pages
  if (hostname == `app.${process.env.BASE_DOMAIN}`) {
    const session = await getToken({ req });
    console.log(session, "from app.localhost:3000")
    if (!session && path !== "/auth/signin") {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    } else if (session && path == "/auth/signin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite root application to `/landing` folder
  if (
    hostname === process.env.BASE_DOMAIN
  ) {
    console.log("Main website - Redirecting / landing page only");
    return NextResponse.rewrite(
      new URL(`/landing${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};