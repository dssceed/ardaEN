import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/news - List all news
export async function GET() {
  try {
    const news = await prisma.arda_news.findMany({
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json({ news });
  } catch (error) {
    console.error('GET news error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// POST /api/admin/news - Create new news
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, content, thumbnail, category, status } = body;

    if (!title) {
      return NextResponse.json({ message: 'Title is required' }, { status: 400 });
    }

    const news = await prisma.arda_news.create({
      data: {
        title,
        slug: slug || null,
        content: content || '',
        thumbnail: thumbnail || null,
        category: category || null,
        status: status !== undefined ? Number(status) : 1,
      },
    });

    return NextResponse.json({ message: 'News created', news }, { status: 201 });
  } catch (error) {
    console.error('POST news error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
