import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Contact Us | Arda Project',
};

export default function ContactPage() {
  return (
    <div className="w-full bg-white text-gray-900 font-sans pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mt-14 flex flex-col gap-10">

        <h1 className="text-[34px] md:text-[42px] font-bold tracking-tight mb-2">Contact us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start">

          {/* Left Column: Contact Details */}
          <div className="flex flex-col">

            {/* Logo Group */}
            <div className="bg-white flex items-center gap-3 w-fit mb-8">
              <div className="w-[60px] h-[60px] bg-white border-[1.5px] border-blue-900 rounded-full flex flex-col items-center justify-center text-[#00176b] font-bold p-1 shadow-sm relative">
                <span className="text-[17px] leading-none tracking-tighter z-10">สวก</span>
                <div className="absolute inset-x-0 bottom-2 flex justify-center">
                  <div className="w-8 h-[1px] bg-blue-900 absolute top-0"></div>
                </div>
              </div>
              <div className="text-[#002060] font-bold text-3xl tracking-tighter flex items-center pb-2">
                สวก.<span className="text-[#5194d9] font-medium text-2xl border-l-[2.5px] border-gray-300 pl-2.5 ml-2.5 bg-[#002060] px-1.5 pt-0.5 rounded-sm tracking-widest leading-none">ARDA</span>
              </div>
            </div>

            <h2 className="text-[20px] md:text-[23px] font-bold leading-snug mb-10">
              Agricultural Research Development Agency<br />(Public Organization)
            </h2>

            <div className="flex flex-col gap-6 text-[15px] md:text-[16px] font-medium text-gray-800">
              <p>2003/61 Paholyothin Rd., Ladyao, Chatujak Bangkok, Thailand 10900.</p>

              <div className="flex flex-col gap-4">
                <p>Tel : 0-2579-7435 , 0-2579-9832</p>
                <p>Fax : 0-2579-7235</p>
              </div>

              <p>support@arda.or.th</p>

              <p>Monday - Friday&nbsp;&nbsp;&nbsp;08:30 - 16:30</p>
            </div>

          </div>

          {/* Right Column: Building Image */}
          <div className="w-full flex justify-center md:justify-end mt-4 md:mt-24">
            <div className="relative w-[100%] max-w-[460px] aspect-[4/2.6] shadow-md border-2 border-white">
              <Image src="/arda_building.jfif" alt="ARDA Building" fill className="object-cover" />
            </div>
          </div>

        </div>

        {/* Map Section */}
        <div className="w-full mt-6 shadow-md border border-gray-200 bg-gray-50 p-2 rounded-sm">
          <iframe
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: '2px' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=2003/61%20Paholyothin%20Rd.,%20Ladyao,%20Chatujak%20Bangkok,%20Thailand%2010900+(ARDA)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
          >
          </iframe>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mt-6">
          {/* Facebook */}
          <a href="#" className="w-[60px] h-[60px] bg-[#0866ff] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" /></svg>
          </a>
          {/* LINE */}
          <a href="#" className="w-[60px] h-[60px] bg-[#00c300] rounded-[18px] flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="currentColor"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.935 8.904 9.384 9.613.364.078.868.239.995.549.114.28.074.717.034 1.011-.044.32-.206 1.258-.25 1.503-.071.393-.324 1.583 1.378.864 1.701-.719 9.17-5.405 11.458-8.91C23.593 13.565 24 11.96 24 10.304zm-15.148 2.6c-.234 0-.424-.19-.424-.424v-4.148c0-.234.19-.424.424-.424.234 0 .424.19.424.424v3.724h2.469c.234 0 .424.19.424.424 0 .234-.19.424-.424.424H8.852zm7.649 0h-3.79c-.234 0-.424-.19-.424-.424V8.332c0-.234.19-.424.424-.424s.424.19.424.424v3.748h2.942c.234 0 .424.19.424.424 0 .234-.19.424-.424.424zm3.033 0h-.857c-.234 0-.424-.19-.424-.424v-2.31l-2.484 2.658c-.066.07-.156.108-.247.108h-.838c-.234 0-.424-.19-.424-.424V8.332c0-.234.19-.424.424-.424h.856c.234 0 .424.19.424.424v2.285l2.457-2.628c.068-.073.16-.112.254-.112h.858c.234 0 .424.19.424.424v4.148c0 .234-.19.424-.424.424zm-6.236-4.148c0-.234.19-.424.424-.424h.858c.234 0 .424.19.424.424v4.148c0 .234-.19.424-.424.424h-.858c-.234 0-.424-.19-.424-.424v-4.148z" /></svg>
          </a>
          {/* YouTube */}
          <a href="#" className="w-[66px] h-[48px] bg-[#ff0000] rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
          </a>
        </div>

      </div>
    </div>
  );
}
