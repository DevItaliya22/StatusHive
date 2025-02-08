import { NextRequest } from "next/server";

export const config = {
    runtime: 'edge', // Make this an edge function
  };
  
  export async function GET(req:NextRequest) {
    const locationHeader = req.headers.get('X-Vercel-Location');
    
    // Log the location for debugging
    console.log('Request handled by edge location:', locationHeader);
  
    const response = await fetch('https://devitaliya.me', {
      method: 'GET',
      headers: {
        'X-Vercel-Location': locationHeader || 'auto', // Send the location header
      },
    });
  
    const data = await response.json();
  
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  