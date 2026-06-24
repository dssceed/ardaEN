import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/admin/executives/members - สร้างสมาชิกใหม่
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      section_id, title, first_name, last_name,
      position_th, position_en, phone, email, image,
      col_order, row_order, status,
    } = body;

    if (!section_id || !first_name || !last_name) {
      return NextResponse.json({ message: 'section_id, first_name, last_name are required' }, { status: 400 });
    }

    const member = await prisma.executive_member.create({
      data: {
        section_id: Number(section_id),
        title: title || null,
        first_name,
        last_name,
        position_th: position_th || null,
        position_en: position_en || null,
        phone: phone || null,
        email: email || null,
        image: image || null,
        col_order: col_order ?? 0,
        row_order: row_order ?? 0,
        status: status ?? 1,
      },
    });

    return NextResponse.json({ member }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
