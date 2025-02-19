import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/authOptions"
import prisma from "@/lib/db/prisma"
import { MonitorMethodsEnum } from "@prisma/client"

const createMonitorSchema = z.object({
    name: z.string().min(2),
    tags: z.string(),
    active: z.boolean(),
    httpMethod: z.enum(["GET", "POST"]),
    url: z.string().url(),
    headers: z.string(),
    body: z.string().optional(),
    frequency: z.string(),
    regions: z.array(z.string()),
    statusPage: z.string().optional(),
    notification: z.string().optional(),
})

export async function GET(req: NextRequest) {
    // GET ALL MONITORS OF USER 
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (!user) {
            return NextResponse.json({ Message: "No user found with this shitty email bit**" })
        }

        const monitors = await prisma.monitor.findMany({
            where : {
                userId : user.id
            }
        })
        return NextResponse.json({monitors},{status:200})
    }catch ( e){
        return NextResponse.json({error : e , message : "Error finding monitors"},{status:401})
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (!user) {
            return NextResponse.json({ Message: "No user found with this shitty email bit**" })
        }

        const json = await req.json();
        const body = createMonitorSchema.parse(json)

        const monitor = await prisma.monitor.create({
            data: {
                userId: user.id,
                url: body.url,
                method: body.httpMethod === "GET" ? MonitorMethodsEnum.GET : MonitorMethodsEnum.POST,
                active: body.active,
            },
        })

        return NextResponse.json(monitor)
    } catch (error) {
        console.error("[MONITORS_POST]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
} 