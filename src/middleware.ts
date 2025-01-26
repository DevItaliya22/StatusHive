import { NextRequest, NextResponse } from "next/server";
import { getSubdomain } from "./lib/domain/domain";
import { env } from "./lib/env/env";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: env.NEXTAUTH_SECRET });

  // if(!session){
  //   return NextResponse.redirect(new URL("/auth/signin", req.url));
  // }
  
  console.log("Middleware called");

  const url = req.nextUrl;
  let hostname = req.headers.get("host")!;

  const subdomain = getSubdomain(hostname, env.BASE_DOMAIN);
  console.log(subdomain);
  if(subdomain){
    console.log("Subdomain found - Redirecting");
    return NextResponse.rewrite(new URL(`${subdomain}`, req.url));
  }

  if (!subdomain && hostname === env.BASE_DOMAIN) {
    console.log("Main website - Redirecting");
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/'],
};