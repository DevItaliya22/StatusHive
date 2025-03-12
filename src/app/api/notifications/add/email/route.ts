import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db/prisma";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  monitorId: z.array(z.union([z.number(), z.string()])).transform((ids) =>
    ids.map((id) => Number(id))
  ),
});

export async function POST(req: NextRequest) {
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
    const { email , monitorId } = schema.parse(data);
    
    const emailNotification = await prisma.monitor.updateMany(
      {
        where : {
          id : {
            in : monitorId
          }
        },
        data : {
          emailNotification : email,
          emailNotificationOn : true,
          discordNotificationOn : false,
          slackNotificationOn : false
        }
      }
    )

    return NextResponse.json({ message: "Email added" , emailNotification , success : true});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}
