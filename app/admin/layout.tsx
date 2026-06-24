"use client";

// app/admin/layout.tsx
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { GooeyToaster } from 'goey-toast';
import 'goey-toast/styles.css';
import { LayoutDashboard, Users, LogOut, ExternalLink, Newspaper } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Basic client-side auth check
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else if (!isLoginPage) {
      router.push('/admin/login');
    }
    setLoading(false);
  }, [pathname, router, isLoginPage]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If on login page, don't show the sidebar
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
        {children}
      </div>
    );
  }

  // If not authenticated and not on login page, we are redirecting, so return null
  if (!isAuthenticated && !isLoginPage) {
    return null;
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'จัดการผู้บริหาร', path: '/admin/executives', icon: <Users size={18} /> },
    { name: 'จัดการข่าวสาร', path: '/admin/news', icon: <Newspaper size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-950">
      <GooeyToaster position="top-right" theme="light" preset="snappy" />

      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 p-6 flex flex-col fixed inset-y-0">
        <div className="mb-8 px-2">
          <h2 className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tight">ARDA Admin</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Management System</p>
        </div>

        {/* Top Action: Exit to Site */}
        <div className="mb-8 px-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-300 rounded-2xl transition-all border border-gray-100 dark:border-zinc-700 font-bold text-xs"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} className="text-blue-500" /> View Website
            </span>
            <span className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded uppercase">New Tab</span>
          </a>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 font-medium ${isActive
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 dark:shadow-none'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
                  }`}
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-zinc-800">
          <button
            onClick={() => {
              sessionStorage.removeItem('admin_authenticated');
              router.push('/admin/login');
            }}
            className="w-full p-3 flex items-center gap-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-bold text-sm"
          >
            <LogOut size={16} /> Logout System
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10">
        {children}
      </main>
    </div>
  );
}
