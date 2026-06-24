import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/executives - ดึงข้อมูลทั้งหมด (sections + members)
export async function GET() {
  try {
    const sections = await prisma.executive_section.findMany({
      orderBy: { rank: 'asc' },
      include: {
        members: {
          orderBy: [{ row_order: 'asc' }, { col_order: 'asc' }],
        },
      },
    });
    return NextResponse.json({ sections });
  } catch (error) {
    console.error('GET executives error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
