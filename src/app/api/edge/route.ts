import { NextRequest } from "next/server";

export const runtime = 'edge';
export const preferredRegion = ["arn1"];
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const locationHeader = req.headers.get('X-Vercel-Location');

  console.log('Request handled by edge location:', locationHeader);

  const response = await fetch('https://devitaliya.me');
  const data = await response.text(); // Convert response to string

  return new Response(JSON.stringify({ 
    data, 
    locationHeader: locationHeader || "No location header",
  }), {
    status: response.status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
