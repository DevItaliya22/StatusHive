import { NextRequest } from "next/server";


export const runtime = 'edge'
export const preferredRegion = ["arn1"];
export const dynamic = 'force-dynamic';

  export async function GET(req:NextRequest) {
    const locationHeader = req.headers.get('X-Vercel-Location');
    
    // Log the location for debugging
    console.log('Request handled by edge location:', locationHeader);
  
    const response = await fetch('https://devitaliya.me');
  
    const data = await response.json();
  
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        "Location-Header": locationHeader || "No location header",
      },
    });
  }
  