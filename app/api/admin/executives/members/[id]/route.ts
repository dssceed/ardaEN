import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT /api/admin/executives/members/[id]
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      section_id, title, first_name, last_name,
      position_th, position_en, phone, email, image,
      col_order, row_order, status,
    } = body;

    const member = await prisma.executive_member.update({
      where: { id: Number(id) },
      data: {
        section_id: section_id ? Number(section_id) : undefined,
        title: title ?? null,
        first_name,
        last_name,
        position_th: position_th ?? null,
        position_en: position_en ?? null,
        phone: phone ?? null,
        email: email ?? null,
        image: image ?? null,
        col_order: col_order ?? 0,
        row_order: row_order ?? 0,
        status: status ?? 1,
      },
    });

    return NextResponse.json({ member });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/executives/members/[id]
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.executive_member.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
