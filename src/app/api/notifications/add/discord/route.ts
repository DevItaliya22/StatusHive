import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db/prisma";
import { z } from "zod";

const schema = z.object({
  webhookUrl: z.string(),
  monitorId: z.array(z.union([z.number(), z.string()])).transform((ids) =>
    ids.map((id) => Number(id))
  ),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if(!session || !session.user?.email){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
        where : {
            email : session.user.email
        }
    })
    if(!user){
        return NextResponse.json({ error: "Unauthorized" },{ status: 401 });
    }
    const data = await req.json();
    const { webhookUrl, monitorId } = schema.parse(data);
    console.log(webhookUrl, monitorId);
    const webhook = await prisma.monitor.updateMany({
      where: {
        id: {
          in: monitorId
        }
      },
      data : {
        discordWebhook : webhookUrl,
        discordNotificationOn : true,
        emailNotificationOn : false,
        slackNotificationOn : false
      }
    })

    return NextResponse.json({ message: "Webhook added" , webhook , success : true});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}
