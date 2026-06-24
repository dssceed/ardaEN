"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // เช็คว่าเป็นหน้าหลัก (Home) หรือไม่ เพื่อปรับความสูงของรูป
  const isHome = pathname === '/';

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAboutOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex flex-col w-full font-sans shadow-sm">
      {/* 1. Top Bar (Blue) */}
      <div className="bg-[#002060] py-3 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-white">
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded">
          {/* Logo Placeholder */}
          <div className="text-[#002060] font-bold text-2xl tracking-tighter flex items-center">
            สวก.<span className="text-gray-500 font-light text-xl border-l-[1.5px] border-gray-400 pl-1 ml-1">ARDA</span>
          </div>
        </div>
        <div className="text-center md:text-right mt-3 md:mt-0">
          <h1 className="text-base md:text-lg font-bold tracking-wide">Agricultural Research Development Agency</h1>
          <p className="text-sm md:text-base font-medium">(Public Organization)</p>
        </div>
      </div>

      {/* 2. Hero Banner (Dynamic Height) */}
      <div
        className="relative w-full overflow-hidden transition-[height] duration-500 ease-in-out"
        style={{ height: isHome ? '420px' : '120px' }}
      >
        <Image
          src="/hero_banner.png"
          alt="ARDA Hero Banner"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Text Overlay only on Home page */}
        {isHome && (
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex flex-col justify-center items-start p-8 md:p-16">
            <h2 className="text-white text-3xl md:text-5xl font-bold max-w-4xl leading-tight drop-shadow-xl">
              &quot;ARDA is a Leader of agriculture Research<br />
              Management for Sustainable Strength in Agriculture&quot;
            </h2>
          </div>
        )}
      </div>

      {/* 3. Navigation Bar (Green) */}
      <div className="bg-[#d2f2b9] border-b border-[#a9ce8a]">
        <nav className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <ul className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-8 text-sm md:text-base text-gray-900 font-medium m-0 p-0 list-none">
            <li>
              <Link href="/" className="inline-block py-4 hover:text-[#002060] transition-colors uppercase tracking-wide">HOME</Link>
            </li>
            <li className="relative cursor-pointer" ref={dropdownRef}>
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="inline-flex items-center gap-1 py-4 text-black font-extrabold hover:text-[#002060] transition-colors uppercase tracking-wide bg-transparent border-none cursor-pointer outline-none"
              >
                ABOUT US
                <svg
                  xmlns="http://www.w3.org/2010/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`mt-0.5 transition-transform duration-200 ${isAboutOpen ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {/* Dropdown Menu */}
              <ul className={`absolute top-full left-1/2 -translate-x-1/2 w-48 bg-[#d2f2b9] transition-all duration-200 z-50 shadow-lg border border-[#a9ce8a] flex flex-col m-0 p-0 list-none text-center py-2 ${isAboutOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <li><Link href="/about" onClick={() => setIsAboutOpen(false)} className="block px-4 py-2.5 hover:bg-[#bde89a] hover:text-[#002060] transition-colors font-normal">About ARDA</Link></li>
                <li><Link href="/executive-directory" onClick={() => setIsAboutOpen(false)} className="block px-4 py-2.5 hover:bg-[#bde89a] hover:text-[#002060] transition-colors font-normal">Executive Directory</Link></li>
                <li><Link href="/organization" onClick={() => setIsAboutOpen(false)} className="block px-4 py-2.5 hover:bg-[#bde89a] hover:text-[#002060] transition-colors font-normal">ARDA organization</Link></li>
                <li><Link href="/iso" onClick={() => setIsAboutOpen(false)} className="block px-4 py-2.5 hover:bg-[#bde89a] hover:text-[#002060] transition-colors font-normal">ISO</Link></li>
              </ul>
            </li>
            <li>
              <Link href="/news" className="inline-block py-4 hover:text-[#002060] transition-colors uppercase tracking-wide">NEWS</Link>
            </li>
            <li>
              <Link href="/grants" className="inline-block py-4 hover:text-[#002060] transition-colors uppercase tracking-wide">RESEARCH GRANTS</Link>
            </li>
            <li>
              <Link href="/scholarship" className="inline-block py-4 hover:text-[#002060] transition-colors uppercase tracking-wide">SCHOLARSHIP</Link>
            </li>
            <li>
              <Link href="/contact" className="inline-block py-4 hover:text-[#002060] transition-colors text-base tracking-wide">Contact us</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
