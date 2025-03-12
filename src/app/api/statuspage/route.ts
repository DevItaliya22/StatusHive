import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { z } from "zod";

const createStatusPageSchema = z.object({
    subdomain: z.string().min(3),
    title: z.string(),
    description: z.string(),
    selectedMonitors: z.array(z.union([z.number(), z.string()])).transform((ids) =>
        ids.map((id) => Number(id))
    ),
})

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
        const body = createStatusPageSchema.parse(json)

        console.log(body)

        const statuspage = await prisma.statusPage.create({
            data: {
                subdomain: body.subdomain,
                title: body.title,
                description: body.description,
                monitors: {
                    connect: body.selectedMonitors.map((id) => ({ id }))
                },
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })
        console.log(statuspage)
        return NextResponse.json(statuspage)
    } catch (error) {
        console.error("[MONITORS_POST]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
} 