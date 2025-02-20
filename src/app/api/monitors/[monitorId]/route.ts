import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import prisma from "@/lib/db/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ monitorId: string }>}
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json({ Message: "No user found with this email" });
    }
    const monitorId = parseInt((await params).monitorId);

    if (isNaN(monitorId)) {
      return new NextResponse("Invalid Monitor ID", { status: 400 });
    }

    // Get monitor with user check
    const monitor = await prisma.monitor.findFirst({
      where: {
        id: monitorId,
        userId: user.id,
      },
    });

    if (!monitor) {
      return new NextResponse("Monitor not found", { status: 404 });
    }

    return NextResponse.json(monitor);
  } catch (error) {
    console.error("[MONITOR_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ monitorId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json({ Message: "No user found with this email" });
    }
    const monitorId = parseInt((await params).monitorId);

    if (isNaN(monitorId)) {
      return new NextResponse("Invalid Monitor ID", { status: 400 });
    }

    const json = await request.json();

    const monitor = await prisma.monitor.findFirst({
      where: {
        id: monitorId,
        userId: user.id,
      },
    });

    if (!monitor) {
      return new NextResponse("Monitor not found", { status: 404 });
    }

    // WIP : NO DONE YET
    const updatedMonitor = {};

    // const updatedMonitor = await prisma.monitor.update({
    //   where: {
    //     id: monitorId,
    //   },
    //   data: {
    //     active: json.active,
    //     httpMethod: json.httpMethod,
    //     url: json.url,
    //     headers: json.headers,
    //     body: json.body,
    //     frequency: json.frequency,
    //     regions: json.regions,
    //   },
    // })

    return NextResponse.json(updatedMonitor);
  } catch (error) {
    console.error("[MONITOR_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ monitorId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json({ Message: "No user found with this email" });
    }

    const monitorId = parseInt((await params).monitorId);

    if (isNaN(monitorId)) {
      return new NextResponse("Invalid Monitor ID", { status: 400 });
    }

    const monitor = await prisma.monitor.findFirst({
      where: {
        id: monitorId,
        userId: user.id,
      },
    });

    if (!monitor) {
      return new NextResponse("Monitor not found", { status: 404 });
    }

    await prisma.monitor.delete({
      where: {
        id: monitorId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[MONITOR_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
