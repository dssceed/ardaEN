import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/news/[id] - Get single news
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const news = await prisma.arda_news.findUnique({
      where: { id: parseInt(id) },
    });

    if (!news) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }

    return NextResponse.json({ news });
  } catch (error) {
    console.error('GET news detail error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// PUT /api/admin/news/[id] - Update news
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, slug, content, thumbnail, category, status } = body;

    const news = await prisma.arda_news.update({
      where: { id: parseInt(id) },
      data: {
        title,
        slug: slug || null,
        content: content || '',
        thumbnail: thumbnail || null,
        category: category || null,
        status: status !== undefined ? Number(status) : 1,
      },
    });

    return NextResponse.json({ message: 'News updated', news });
  } catch (error) {
    console.error('PUT news error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/news/[id] - Delete news
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.arda_news.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'News deleted' });
  } catch (error) {
    console.error('DELETE news error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
