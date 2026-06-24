import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

// สร้าง folder path สำหรับบันทึกไฟล์
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'executives');

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'ไม่พบไฟล์ที่อัปโหลด' }, { status: 400 });
    }

    // ตรวจสอบประเภทไฟล์
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: 'รองรับเฉพาะไฟล์ JPG, PNG, WEBP และ GIF เท่านั้น' },
        { status: 400 }
      );
    }

    // ตรวจสอบขนาด (5 MB max)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { message: 'ขนาดไฟล์ต้องไม่เกิน 5 MB' },
        { status: 400 }
      );
    }

    // สร้าง folder ถ้ายังไม่มี
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    // สร้างชื่อไฟล์ใหม่
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `${randomUUID()}.${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    // เขียนไฟล์
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);

    // Return public URL
    const url = `/uploads/executives/${filename}`;

    return NextResponse.json({ url }, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        message: 'Internal server error',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
