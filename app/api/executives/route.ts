import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const sections = await prisma.executive_section.findMany({
      orderBy: { rank: 'asc' },
      include: {
        members: {
          where: { status: 1 }, // Only published members
          orderBy: [{ row_order: 'asc' }, { col_order: 'asc' }],
        },
      },
    });
    return NextResponse.json({ sections });
  } catch (error) {
    console.error('Public executives API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
