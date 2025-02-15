import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db/prisma";

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
    const { webhookUrl, monitorId } = data;

    const webhook = await prisma.monitor.update({
      where: {
        id: monitorId
      },
      data : {
        discordWebhook : webhookUrl,
        discordNotificationOn : true
      }
    })

    return NextResponse.json({ message: "Webhook added" , webhook });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}
