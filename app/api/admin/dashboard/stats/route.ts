import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // ดึงจำนวนผู้บริหารทั้งหมด
    const executiveCount = await prisma.executive_member.count();
    
    // ดึงจำนวนข่าวทั้งหมด
    const newsCount = await prisma.arda_news.count();
    
    // ดึงจำนวนข่าวที่เป็น Draft
    const draftCount = await prisma.arda_news.count({
      where: { status: 0 }
    });

    // ดึงรวมยอดการเข้าชมข่าว
    const aggregateViews = await prisma.arda_news.aggregate({
      _sum: {
        view_count: true
      }
    });

    // ดึงข่าวล่าสุด 5 รายการ
    const recentNews = await prisma.arda_news.findMany({
      take: 5,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        title: true,
        category: true,
        status: true,
        view_count: true,
        created_at: true
      }
    });

    // ดึงรายชื่อผู้บริหารล่าสุดที่เพิ่งเพิ่ม (หรือสุ่มมาโชว์ 5 คน)
    const recentExecutives = await prisma.executive_member.findMany({
      take: 5,
      orderBy: { id: 'desc' },
      select: {
          id: true,
          first_name: true,
          last_name: true,
          position_th: true,
          image: true
      }
    });

    return NextResponse.json({
      stats: {
        executives: executiveCount,
        news: newsCount,
        drafts: draftCount,
        totalViews: aggregateViews._sum.view_count || 0
      },
      recentNews,
      recentExecutives
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
