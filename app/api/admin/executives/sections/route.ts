import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/executives/sections
export async function GET() {
  try {
    const sections = await prisma.executive_section.findMany({
      orderBy: { rank: 'asc' },
    });
    return NextResponse.json({ sections });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// POST /api/admin/executives/sections - สร้าง section ใหม่
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name_th, name_en, rank } = body;

    if (!name_th) {
      return NextResponse.json({ message: 'name_th is required' }, { status: 400 });
    }

    const section = await prisma.executive_section.create({
      data: { name_th, name_en: name_en || null, rank: rank ?? 0 },
    });

    return NextResponse.json({ section }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
