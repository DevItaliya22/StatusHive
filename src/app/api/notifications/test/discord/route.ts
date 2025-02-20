import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db/prisma";
import redis from "@/lib/db/redis";

const requestSchema = z.object({
  webhookUrl: z.string().url(),
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
      return NextResponse.json({ success: false, error: "Invalid request body" });
    }

    const key = `${user.id}-discord-test`;
    const limit = 3;
    const window = 60;
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, window);
    if (count > limit) {
      return NextResponse.json({ success: false, error: `Rate limit exceeded. Try again in ${await redis.ttl(key)} seconds.` });
    }

    const payload = {
      content: "Test message from Statushive",
      embeds: [
        {
          title: "🔔 Webhook Test",
          description: "This is a test message from Statushive, ensuring this webhook URL is working.",
          color: 16776960,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await axios.post(validatedData.data.webhookUrl, payload);

    return NextResponse.json({ success: true, message: "Sent to Discord" });
  } catch (e) {
    return NextResponse.json({ success: false, error: (e as Error).message });
  }
}
