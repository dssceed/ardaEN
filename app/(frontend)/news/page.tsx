import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight, Search } from "lucide-react";
import React from 'react';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "News & Update | ข่าวประชาสัมพันธ์ ARDA",
  description: "อัปเดตข่าวสาร กิจกรรม และประกาศจาก ARDA",
};

export default async function NewsPage() {
  const newsList = await prisma.arda_news.findMany({
    where: { status: 1 },
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="w-full max-w-7xl px-4 md:px-8 py-12">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#002060] mb-6">News & Updates</h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          ติดตามข่าวสารล่าสุด กิจกรรม และความเคลื่อนไหวต่างๆ ของสำนักงานพัฒนาการวิจัยการเกษตร (องค์การมหาชน)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsList.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-400 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            ยังไม่มีข่าวสารในขณะนี้
          </div>
        ) : (
          newsList.map((news) => (
            <Link
              key={news.id}
              href={`/news/${news.slug}`}
              className="group bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-50 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {news.thumbnail ? (
                  <Image
                    src={news.thumbnail}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                    <svg className="w-16 h-16 text-blue-100" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                  </div>
                )}
                {/* Category Badge on Image */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur-sm px-5 py-2 rounded-full text-[#1868a8] text-sm font-bold shadow-sm inline-block border border-white/20">
                    {news.category || "ประชาสัมพันธ์"}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={18} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-400">
                    {new Date(news.created_at).toLocaleDateString("th-TH", {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1868a8] transition-colors line-clamp-2 mb-6 leading-snug">
                  {news.title}
                </h3>
                <div className="mt-auto flex items-center gap-2 text-[#2b64f6] font-bold">
                  <span>อ่านเพิ่มเติม</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
