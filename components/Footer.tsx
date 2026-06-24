import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#bdcdff] text-gray-900 font-sans mt-auto border-t border-[#a8bcff]">
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-10">
        
        {/* Top Section: Logo & Name */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="bg-white p-1.5 px-3 rounded flex items-center gap-2 shadow-sm">
            {/* Logo Circular */}
            <div className="w-9 h-9 bg-[#001f7a] text-white rounded-full flex items-center justify-center font-bold font-serif text-sm border-2 border-white shadow-inner">สวก</div>
            {/* ARDA Text Logo */}
            <div className="text-[#002060] font-bold text-xl tracking-tighter flex items-center">
              สวก.<span className="text-[#5194d9] font-medium text-base border-l-[1.5px] border-gray-300 pl-1.5 ml-1.5 bg-[#002060] px-1 rounded-sm tracking-widest">ARDA</span>
            </div>
          </div>
          <h2 className="text-base md:text-xl font-medium text-gray-800 tracking-tight">Agricultural Research Development Agency (Public Organization)</h2>
        </div>

        {/* Bottom Section: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 lg:gap-0">
          
          {/* Left Column: Address & Contact */}
          <div className="flex flex-col gap-5 text-[15px] leading-relaxed">
            <p>2003/61 Paholyothin Rd., Ladyao, Chatujak Bangkok, Thailand 10900.</p>
            
            <div className="flex flex-col gap-1">
              <p>Tel : 0-2579-7435 , 0-2579-9832</p>
              <p>Fax : 0-2579-7235</p>
            </div>
            
            <p>support@arda.or.th</p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-1">
              {/* Facebook */}
              <a href="#" className="w-[46px] h-[46px] bg-[#0866ff] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm">
                <svg xmlns="http://www.w3.org/2010/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
              </a>
              {/* LINE */}
              <a href="#" className="w-[46px] h-[46px] bg-[#00c300] rounded-[14px] flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm">
                <svg xmlns="http://www.w3.org/2010/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.935 8.904 9.384 9.613.364.078.868.239.995.549.114.28.074.717.034 1.011-.044.32-.206 1.258-.25 1.503-.071.393-.324 1.583 1.378.864 1.701-.719 9.17-5.405 11.458-8.91C23.593 13.565 24 11.96 24 10.304zm-15.148 2.6c-.234 0-.424-.19-.424-.424v-4.148c0-.234.19-.424.424-.424.234 0 .424.19.424.424v3.724h2.469c.234 0 .424.19.424.424 0 .234-.19.424-.424.424H8.852zm7.649 0h-3.79c-.234 0-.424-.19-.424-.424V8.332c0-.234.19-.424.424-.424s.424.19.424.424v3.748h2.942c.234 0 .424.19.424.424 0 .234-.19.424-.424.424zm3.033 0h-.857c-.234 0-.424-.19-.424-.424v-2.31l-2.484 2.658c-.066.07-.156.108-.247.108h-.838c-.234 0-.424-.19-.424-.424V8.332c0-.234.19-.424.424-.424h.856c.234 0 .424.19.424.424v2.285l2.457-2.628c.068-.073.16-.112.254-.112h.858c.234 0 .424.19.424.424v4.148c0 .234-.19.424-.424.424zm-6.236-4.148c0-.234.19-.424.424-.424h.858c.234 0 .424.19.424.424v4.148c0 .234-.19.424-.424.424h-.858c-.234 0-.424-.19-.424-.424v-4.148z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-[52px] h-[36px] bg-[#ff0000] rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm ml-1">
                <svg xmlns="http://www.w3.org/2010/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>
          </div>

          {/* Right Column: Quick Links */}
          <div className="flex flex-col gap-1.5 md:pl-32 lg:pl-56 text-[14px]">
            <h3 className="font-bold text-gray-900 mb-1">Quick Links</h3>
            <Link href="/about" className="hover:text-blue-700 transition-colors">About ARDA</Link>
            <Link href="/organization" className="hover:text-blue-700 transition-colors">ARDA organization</Link>
            <Link href="/executive-directory" className="hover:text-blue-700 transition-colors">Executive Directory</Link>
            <Link href="/iso" className="hover:text-blue-700 transition-colors">ISO</Link>
            <Link href="/grants" className="hover:text-blue-700 transition-colors">ARDA Research Framework</Link>
            <Link href="/scholarship" className="hover:text-blue-700 transition-colors">SCHOLARSHIP</Link>
            <Link href="/contact" className="hover:text-blue-700 transition-colors">Contact us</Link>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
