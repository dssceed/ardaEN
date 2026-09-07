import type { Metadata } from 'next';
import Image from 'next/image';
import PartnershipSlider from '@/components/PartnershipSlider';
import GrantSlider from '@/components/GrantSlider';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import React from 'react';
import { Calendar, ChevronRight } from '@/components/Icons';
export const dynamic = 'force-dynamic';


export const metadata: Metadata = {
  title: 'Arda Home | หน้าหลัก',
  description: 'ยินดีต้อนรับสู่เว็บไซต์ Arda เรารองรับ SEO อย่างเต็มรูปแบบด้วยระบบ Server-Side Rendering',
  keywords: ['Arda', 'Next.js', 'SEO', 'Server Side'],
  openGraph: {
    title: 'Arda Home | หน้าหลัก',
    description: 'ยินดีต้อนรับสู่เว็บไซต์ Arda รองรับการแสดงผลทุกแพลตฟอร์ม',
  }
};

export default async function Home() {
  // Fetch latest 3 news
  const latestNews = await prisma.arda_news.findMany({
    where: { status: 1 }, // Published
    orderBy: { created_at: 'desc' },
    take: 3
  });

  const categories = [
    { title: "Executive News", color: "bg-[#b8c5ff]" },
    { title: "Public Relation News", color: "bg-[#b8c5ff]" },
    { title: "ARDA movement", color: "bg-[#b8c5ff]" }
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <section className="w-full max-w-7xl px-4 md:px-8 py-10 md:py-16">
        <div className="bg-[#f0f2e3] w-full flex flex-col md:flex-row items-center p-6 md:p-8 lg:p-12 gap-6 lg:gap-10">
          <div className="w-full md:w-[45%] shrink-0">
            <Image
              src="/arda_building.jfif"
              alt="ARDA Building"
              width={800}
              height={500}
              className="w-full object-cover"
              priority
            />
          </div>
          <div className="w-full md:w-[55%] flex flex-col justify-center text-center md:text-left text-black font-medium text-[16px] md:text-[18px] lg:text-[22px] leading-snug space-y-2">
            <p>
              <span className="font-semibold">The Agricultural Research Development Agency<br className="hidden xl:block" />
                (Public Organization), ARDA</span> is a public government<br className="hidden xl:block" />
              organization under the supervision of the Minister of<br className="hidden xl:block" />
              Agriculture and Cooperatives. ARDA was established<br className="hidden xl:block" />
              under the royal decree for the Agricultural Research<br className="hidden xl:block" />
              Development Agency (Public Organization) effective<br className="hidden xl:block" />
              from 15 March 2003.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Latest News & Highlights */}
      <section className="w-full max-w-6xl px-4 md:px-8 py-10 md:py-16 flex flex-col items-center">
        {/* Header Pill */}
        <div className="bg-[#1868a8] text-white px-8 md:px-14 py-3 rounded-full text-[20px] md:text-[24px] font-bold mb-10 text-center shadow-md">
          Latest News & Highlights
        </div>

        {/* News Grid */}
        <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-6 lg:gap-10">

          {latestNews.length === 0 ? (
            <div className="p-20 text-center text-gray-400 italic font-medium w-full bg-gray-50 rounded-2xl border border-gray-100">ยังไม่มีข่าวสารในขณะนี้</div>
          ) : (
            latestNews.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.slug}`}
                className="flex-1 min-w-[280px] flex flex-col group cursor-pointer bg-white rounded-[32px] overflow-hidden shadow-lg border border-gray-50 transition-all hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Image Section */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  {news.thumbnail ? (
                    <Image
                      src={news.thumbnail}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                      <svg className="w-16 h-16 text-blue-100" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                      </svg>
                    </div>
                  )}
                  {/* Category Pill Overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/95 backdrop-blur-sm px-5 py-2 rounded-full text-[#1868a8] text-sm font-bold shadow-sm inline-block">
                      {news.category || "ประชาสัมพันธ์"}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={18} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-400">
                      {new Date(news.created_at).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg md:text-xl text-gray-900 group-hover:text-[#1868a8] transition-colors line-clamp-2 leading-snug mb-6">
                    {news.title}
                  </h3>

                  <div className="mt-auto flex items-center gap-2 text-[#2b64f6] font-bold">
                    <span>อ่านเพิ่มเติม</span>
                    <ChevronRight size={18} />
                  </div>
                </div>
              </Link>
            ))
          )}

        </div>

        {/* Bottom Button */}
        <Link
          href="/news"
          className="mt-12 bg-[#d7fad5] px-14 py-3 rounded-[12px] font-bold text-lg md:text-xl text-black hover:bg-green-200 transition-colors shadow-sm inline-block"
        >
          View All News
        </Link>
      </section>

      {/* Section 3: Research grants & Opportunities */}
      {/* (Rest of the code remains the same as before...) */}
      <section className="w-full flex flex-col items-center pt-8 md:pt-16">
        <h2 className="text-[28px] md:text-[40px] font-bold text-black text-center mb-10 md:mb-14 font-sans tracking-wide">
          Research Grants & Opportunities
        </h2>

        {/* Part 3.1: Grant Slider (auto-slide) */}
        <GrantSlider />

        {/* Part 3.2: ARDA CADS Banner Placeholder */}
        <div className="w-full max-w-4xl px-4 mt-8 mb-20 relative">
          <Image
            src="/arda_cads.png"
            alt="ARDA CADS"
            width={800}
            height={500}
            className="w-full object-cover"
            priority
          />
          {/* <div className="w-full border-[6px] border-black rounded-[60px] md:rounded-[120px] bg-[#fdfded] relative p-8 md:p-14 flex flex-col items-center text-center shadow-sm min-h-[300px] justify-center overflow-hidden">
            <h3 className="text-4xl md:text-6xl font-extrabold text-[#388e3c] tracking-wider mb-4 drop-shadow-sm z-10">
              ARDA CADS
            </h3>
            <p className="text-xl md:text-2xl font-bold text-black leading-snug mb-6 z-10 mt-2 text-center drop-shadow-sm font-sans">
              ศูนย์บริการข้อมูล<br/>
              นวัตกรรม<br/>
              วิจัย และเทคโนโลยี<br/>
              ทางการเกษตร
            </p>
            <button className="bg-[#ffe14f] text-black font-extrabold text-[22px] px-10 py-3 rounded-[12px] shadow-sm hover:bg-yellow-400 active:translate-y-1 transition-all z-10 mt-4">
              CLICK HERE
            </button>
            <div className="absolute inset-x-0 bottom-6 flex justify-between items-end px-10 opacity-30 pointer-events-none">
              <div className="w-24 h-24 bg-pink-400/50 rounded-full flex items-center justify-center font-bold text-xs">Brain Icon</div>
              <div className="w-24 h-24 bg-green-500/50 text-white flex items-center justify-center font-bold text-xs rounded">Farmer Icon</div>
            </div>
          </div> */}
        </div>

        {/* Part 3.3: Research Funding Overview */}
        <div className="w-full relative flex flex-col items-center py-16 px-4 bg-gray-200 mt-4 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
            style={{ backgroundImage: "url('/agri_tech.webp')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/70"></div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
            <h2 className="text-[28px] md:text-[36px] font-bold text-black md:drop-shadow-sm mb-1 text-center font-sans tracking-wide">
              Research Funding Overview
            </h2>
            <p className="text-[20px] md:text-[24px] font-bold text-black mb-12 drop-shadow-sm">
              FY 2022-2025
            </p>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 px-4 md:px-0">
              <div className="bg-[#0b1b86] border-[4px] border-white rounded-[10px] flex flex-col items-center justify-center p-6 text-white text-center min-h-[170px] shadow-lg">
                <div className="text-[40px] md:text-[46px] font-bold mb-2">949</div>
                <div className="text-[14px] md:text-[16px] font-semibold font-sans">Research Projects<br />Supported Nationwide</div>
              </div>
              <div className="bg-[#d31111] border-[4px] border-white rounded-[10px] flex flex-col items-center justify-center p-6 text-white text-center min-h-[170px] shadow-lg">
                <div className="text-[40px] md:text-[46px] font-bold mb-2">3,150</div>
                <div className="text-[14px] md:text-[16px] font-semibold font-sans">Million THB in Total<br />Research Investment</div>
              </div>
              <div className="bg-[#30a935] border-[4px] border-white rounded-[10px] flex flex-col items-center justify-center p-6 text-white text-center min-h-[170px] shadow-lg">
                <div className="text-[40px] md:text-[46px] font-bold mb-2">9,295</div>
                <div className="text-[14px] md:text-[16px] font-semibold font-sans">Million THB in Total<br />Impact Value</div>
              </div>
              <div className="bg-[#dfba00] border-[4px] border-white rounded-[10px] flex flex-col items-center justify-center p-6 text-white text-center min-h-[170px] shadow-lg">
                <div className="text-[40px] md:text-[46px] font-bold mb-2">2.95x</div>
                <div className="text-[14px] md:text-[16px] font-semibold font-sans">Return on Investment<br />(ROI)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Event Calendar */}
      <section className="w-full max-w-5xl px-4 md:px-8 py-10 md:py-16 flex flex-col items-center">
        <div className="bg-[#0b1768] text-white px-12 md:px-20 py-3 md:py-4 rounded-full text-[22px] md:text-[28px] font-bold mb-10 text-center shadow-md whitespace-nowrap">
          Event Calendar
        </div>

        <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative" style={{ minHeight: '600px' }}>
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FBangkok&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&src=ZW4udGgjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%230B8043"
            style={{ borderWidth: 0 }}
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            className="absolute inset-0 w-full h-full"
            title="ARDA Event Calendar"
          ></iframe>
        </div>
      </section>

      {/* Section 5: Contact for Partnership (Slider) */}
      <PartnershipSlider />
    </div>
  );
}
