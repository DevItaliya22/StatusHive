import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db/prisma";

export async function GET(req: NextRequest) {
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

    const testedEmails = await prisma.testedEmail.findMany({
      where: {
        userId: user.id,
      },
      select: {
        email: true,
      },
    });
    console.log(testedEmails);
    return NextResponse.json({ success: true, testedEmails: testedEmails.map((email) => email.email) });
  } catch (e) {
    return NextResponse.json({ success: false, error: (e as Error).message });
  }
}
