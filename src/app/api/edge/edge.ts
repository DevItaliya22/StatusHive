import { NextRequest, NextResponse } from "next/server";
export const runtime = 'edge';
export const preferredRegion = ["kix1"];
export const dynamic = 'force-dynamic';

// WIP : Add security , only authorized users can access this route
export async function POST(req: NextRequest) {

  const response = await fetch('https://devitaliya.me');
  const data = await response.text(); 

  return NextResponse.json({ data });
}

// import { type NextRequest, NextResponse } from 'next/server';
// import { RequestSchema, ResponseSchema } from '@/lib/schema';

// export async function POST(request: NextRequest) {
//   try {
//     const rawData: unknown = await request.json();
//     const { method, url, headers, body } = RequestSchema.parse(rawData);

//     const requestHeaders = new Headers();
//     if (headers && typeof headers === 'object') {
//       Object.entries(headers).forEach(([key, value]) => {
//         if (key && value) {
//           requestHeaders.append(key.trim(), value.trim());
//         }
//       });
//     }
  
//     const requestOptions: RequestInit = {
//       method,
//       headers: requestHeaders,
//     };

//     if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
//       requestOptions.body = body;
//     }

//     const startTime = Date.now();

//     const response = await fetch(url, requestOptions);

//     const endTime = Date.now();
//     const durationMs = endTime - startTime;
//     const responseBody = await response.text();

//     const vercelRegion = request.headers.get('X-Vercel-Location') ?? 'unknown';

//     const responseData = ResponseSchema.parse({
//       status: response.status,
//       durationMs: durationMs, 
//       statusText: response.statusText,
//       headers: Object.fromEntries(response.headers),
//       body: responseBody,
//     });

//     return NextResponse.json({res: responseData, vercelRegion});

//   } catch (error) {
//     console.error('Error executing request:', error);
//     return NextResponse.json({ error: 'Failed to execute request' }, { status: 500 });
//   }
// }