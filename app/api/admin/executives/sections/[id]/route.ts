import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT /api/admin/executives/sections/[id]
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name_th, name_en, rank } = body;

    const section = await prisma.executive_section.update({
      where: { id: Number(id) },
      data: { name_th, name_en: name_en || null, rank: rank ?? 0 },
    });

    return NextResponse.json({ section });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/executives/sections/[id]
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.executive_section.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
