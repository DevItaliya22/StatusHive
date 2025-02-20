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

    const key = `${user.id}-slack-test`;
    const limit = 3;
    const window = 60;
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, window);
    if (count > limit) {
      return NextResponse.json({ success: false, error: `Rate limit exceeded. Try again in ${await redis.ttl(key)} seconds.` });
    }

    const payload = {
      text: "🚀 Test message from Statushive",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*🔔 Webhook Test*\nThis is a test message from Statushive, ensuring this webhook URL is working.",
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `_Sent at: ${new Date().toISOString()}_`,
            },
          ],
        },
      ],
    };

    await axios.post(validatedData.data.webhookUrl, payload);

    return NextResponse.json({ success: true, message: "Sent to Slack" });
  } catch (e) {
    return NextResponse.json({ success: false, error: (e as Error).message });
  }
}
