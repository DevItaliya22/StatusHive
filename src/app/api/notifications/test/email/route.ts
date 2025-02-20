import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { env } from "@/lib/env/env";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db/prisma";
import redis from "@/lib/db/redis";

const resend = new Resend(env.RESEND_API_KEY);

const requestSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = requestSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json({ success: false, error: "Invalid email format" });
    }

    const key = `${user.id}-email`;
    const limit = 3;
    const window = 60;
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, window);
    if (count > limit) {
      return NextResponse.json({ success: false, error: `Rate limit exceeded. Try again in ${await redis.ttl(key)} seconds.` });
    }

    const response = await resend.emails.send({
      from: "noreply@email.devitaliya.me",
      to: [validatedData.data.email],
      subject: "🚀 Test Email",
      html: "<h1>Hello from Statushive</h1><p>This is a test message from Statushive, ensuring this email is working...</p>",
    });

    return NextResponse.json({ success: true, messageId: response });
  } catch (e) {
    return NextResponse.json({ success: false, error: (e as Error).message });
  }
}
