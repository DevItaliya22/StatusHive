import { NextResponse } from "next/server";
import { getDomainResponse } from "@/lib/domain/domain";
import { z } from "zod";

const subdomainSchema = z.string()
    .min(3, "Subdomain must be at least 3 characters long")
    .regex(/^[a-zA-Z]+$/, "Subdomain can only contain alphabets");

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const subdomain = searchParams.get("subdomain");
    
    if (!subdomain) {
        return NextResponse.json({ error: "Subdomain is required" }, { status: 400 });
    }
    
    const validation = subdomainSchema.safeParse(subdomain);
    if (!validation.success) {
        return NextResponse.json({ error: validation.error.errors }, { status: 400 });
    }
    
    const domain = `${subdomain}.statushive.devitaliya.me`;
    const domainResponse = await getDomainResponse(domain);
    
    if (domainResponse.error) {
        return NextResponse.json({ available: true });
    }
    
    return NextResponse.json({ available: false });
}