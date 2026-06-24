"use client";

import React, { useEffect, useState } from 'react';
import {
  Users,
  Newspaper,
  Eye,
  FileText,
  TrendingUp,
  Calendar,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';
export const dynamic = 'force-dynamic';

interface DashboardStats {
  stats: {
    executives: number;
    news: number;
    drafts: number;
    totalViews: number;
  };
  recentNews: any[];
  recentExecutives: any[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard/stats')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'รายชื่อผู้บริหาร',
      value: data?.stats.executives || 0,
      icon: <Users className="text-blue-600" size={24} />,
      bgColor: 'bg-blue-50',
      description: 'ทั้งหมดในทุก Section'
    },
    {
      label: 'ข่าวประชาสัมพันธ์',
      value: data?.stats.news || 0,
      icon: <Newspaper className="text-emerald-600" size={24} />,
      bgColor: 'bg-emerald-50',
      description: 'ข่าวที่เผยแพร่อยู่บนเว็บ'
    },
    {
      label: 'ข่าวดึงร่าง (Draft)',
      value: data?.stats.drafts || 0,
      icon: <FileText className="text-amber-600" size={24} />,
      bgColor: 'bg-amber-50',
      description: 'ยังไม่ได้เผยแพร่'
    },
    {
      label: 'ยอดการเข้าชมรวม',
      value: data?.stats.totalViews.toLocaleString() || 0,
      icon: <TrendingUp className="text-purple-600" size={24} />,
      bgColor: 'bg-purple-50',
      description: 'จำนวนคลิกดูข่าวทั้งหมด'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header section with welcome message */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1 font-medium">ยินดีต้อนรับกลับมา! นี่คือสรุปภาพรวมของข้อมูลในระบบวันนี้</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">Status</p>
          <p className="text-emerald-500 font-bold flex items-center gap-1.5 justify-end mt-1">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            System Online
          </p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className={`w-12 h-12 ${card.bgColor} rounded-2xl flex items-center justify-center mb-4`}>
              {card.icon}
            </div>
            <p className="text-gray-500 text-sm font-semibold">{card.label}</p>
            <h3 className="text-3xl font-black text-gray-900 mt-1">{card.value}</h3>
            <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-wider">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent News Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Newspaper size={20} className="text-blue-500" /> ข่าวประชาสัมพันธ์ล่าสุด
            </h3>
            <Link href="/admin/news" className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1">
              ดูทั้งหมด <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex-1">
            {data?.recentNews.length === 0 ? (
              <div className="p-10 text-center text-gray-400 text-sm italic">ยังไม่มีข้อมูลข่าวสาร</div>
            ) : (
              <div className="divide-y divide-gray-50">
                {data?.recentNews.map((news) => (
                  <div key={news.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${news.status === 1 ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate text-sm">{news.title}</h4>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-bold uppercase">{news.category}</span>
                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                          <Eye size={10} /> {news.view_count} views
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-300 font-medium">
                      {new Date(news.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Executives Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <UserCheck size={20} className="text-emerald-500" /> รายชื่อผู้บริหารล่าสุด
            </h3>
            <Link href="/admin/executives" className="text-emerald-600 text-xs font-bold hover:underline flex items-center gap-1">
              จัดการทั้งหมด <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex-1">
            {data?.recentExecutives.length === 0 ? (
              <div className="p-10 text-center text-gray-400 text-sm italic">ยังไม่มีข้อมูลผู้บริหาร</div>
            ) : (
              <div className="divide-y divide-gray-50">
                {data?.recentExecutives.map((ex) => (
                  <div key={ex.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-100 shrink-0">
                      {ex.image ? (
                        <img src={ex.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300"><Users size={16} /></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate text-sm">{ex.first_name} {ex.last_name}</h4>
                      <p className="text-[10px] text-gray-500 font-medium truncate">{ex.position_th}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
