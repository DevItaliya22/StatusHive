// import { NextRequest, NextResponse } from "next/server";
// import { getSubdomain } from "./lib/domain/domain";
// import { env } from "./lib/env/env";
// import { getToken } from "next-auth/jwt";

// const protectedRoutes : string[] = ["/dashboard"];

// function isProtectedRoute(protectedRoutes: string[], url: URL) {
//   return protectedRoutes.some((route) => url.pathname.startsWith(route));
// }

// export const config = {
//   matcher: ['/dashboard', '/'],
// };

// export default async function middleware(req: NextRequest) {
//   const session = await getToken({ req, secret: env.NEXTAUTH_SECRET });

//   console.log("Middleware called");

//   const url = req.nextUrl;
//   const hostname = req.headers.get("host")!;
//   const pathname = url.pathname;

//   // This will only invoke when user is on the landing page
//   if(hostname === `app.${env.BASE_DOMAIN}`){
//     const session = await getToken({ req, secret: env.NEXTAUTH_SECRET });
//     console.log("URL PATHNAME : ",url.pathname);
//     console.log(session);
//     console.log(req.url)

//     if(!session && pathname !== "/auth/signin"){
//       console.log("Couldnt find session - Redirecting to signin");
//       return NextResponse.redirect(new URL("/auth/signin", req.url));
//     }else if(session && url.pathname === "/auth/signin"){
//       console.log("User is already logged in - Redirecting to dashboard");
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//     return NextResponse.rewrite(
//       new URL(`/app${pathname === "/" ? "" : pathname}`, req.url),
//     );
//   }

//   if(hostname === env.BASE_DOMAIN){
//     console.log("Main website - Redirecting / landing page only");
//     return NextResponse.next();
//   }

//   return NextResponse.rewrite(new URL(`/${hostname}${pathname}`, req.url));

//   // const subdomain = getSubdomain(hostname, env.BASE_DOMAIN);
//   // console.log(subdomain);

//   // console.log("pathname", pathname);
//   // //  if we remove this , then dev.localhost:3000 will point to landing page , this ensures that it points to the subdomain page where the info is 
//   // if (subdomain) {
//   //   return NextResponse.rewrite(
//   //     new URL(`/${subdomain}${pathname}`, req.url)
//   //   );
//   // }

//   // return NextResponse.next();
// }

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

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

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);


  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;
  console.log("Hostname",hostname);
  console.log("path",path); 

  console.log("searchParams",searchParams);

  

  // rewrites for app pages
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    const session = await getToken({ req });
    if (!session && path !== "/auth/signin") {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    } else if (session && path == "/auth/signin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite root application to `/home` folder
  if (
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    console.log("Main website - Redirecting / landing page only");
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
