// /app/api/addDomain/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';  
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { inputValue } = await req.json(); 

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const statusPage = await prisma.statusPage.create({
      data: {
        userId: user.id,
        subdomain: inputValue,
      },
    });

    return NextResponse.json(statusPage, { status: 200 });
  } catch (error) {
    console.error('Error adding domain:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
