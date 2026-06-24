import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About ARDA | Arda Project',
};

export default function AboutPage() {
  return (
    <div className="w-full bg-white text-gray-900 font-sans pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-10 flex flex-col gap-12">

        {/* === SECTION 1: ABOUT ARDA === */}
        <section>
          <div className="inline-block bg-[#001f7a] text-white font-bold text-3xl px-12 py-3 rounded-full mb-8 shadow-sm tracking-wide">
            ABOUT ARDA
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Text Content */}
            <div className="md:col-span-8 flex flex-col gap-4 text-[15px] leading-relaxed text-justify md:text-left">
              <p>
                The Agricultural Research Development Agency (Public Organization), ARDA is a public government
                organization under the supervision of the Minister of Agriculture and Cooperatives. ARDA was established under
                the royal decree for the Agricultural Research Development Agency (Public Organization) effective from 15 March
                2003. 6 objectives of the establishment of the Agricultural Research Development Agency (Public Organization),
                as follows:
              </p>
              <div className="space-y-2 mt-2">
                <p>1. Promote, support, and develop an agricultural research.</p>
                <p>2. Promote, support, and develop agricultural research personnel.</p>
                <p>3. Provide knowledge, research, development, and dissemination of information in the field of agriculture.</p>
                <p>4. Academic cooperation with educational institutions or other public and private institutions in the production and development of research and agricultural researchers both in the country and abroad.</p>
                <p>5. To be a center for providing information on agriculture obtained from studies, research, and development, as well as connect with educational institutions and other relevant agencies both at the national and international.</p>
                <p>6. Promote academic affairs to disseminate knowledge in various forms, such as publishing documents, preparation of audio-visual media, seminars, workshops exhibitions, or any other actions related to the dissemination of knowledge in agriculture.</p>
              </div>
            </div>

            {/* Right Images */}
            <div className="md:col-span-4 flex flex-col gap-6 items-center md:items-end">
              <div className="w-full relative h-[220px] rounded-sm overflow-hidden shadow-md">
                <Image src="/arda_building.jfif" alt="ARDA Building" fill className="object-cover" />
              </div>
              <div className="w-[80%] relative h-[160px]">
                <Image src="/ribbon_cutting.png" alt="Establishment Ceremony" fill className="object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* === SECTION 2: MISSIONS === */}
        <section className="mt-4">
          <div className="bg-[#dcf4cc] inline-flex flex-col py-6 px-8 md:px-12 md:pr-48 mb-8 shadow-sm rounded-sm">
            <h2 className="text-[#001f7a] font-bold text-3xl mb-4 tracking-wide">MISSIONS</h2>
            <ul className="list-disc list-inside space-y-1.5 text-[15px] font-medium text-gray-800">
              <li>To promote, support and develop an agricultural research.</li>
              <li>To develop and increase the number of professional agricultural researchers.</li>
              <li>To develop and increase the efficiency of the agricultural research data linkage system that can be utilized.</li>
            </ul>
          </div>
        </section>

        <hr className="border-gray-800 border-t-2" />

        {/* === SECTION 3: VISION === */}
        <section className="flex flex-col items-center justify-center py-6">
          <div
            className="bg-[#a8faa3] w-full max-w-4xl py-10 px-8 text-center"
            style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)' }} // Inverted trapezoid
          >
            <h2 className="text-green-900 font-extrabold text-3xl mb-8 tracking-widest">VISION</h2>
            <p className="font-bold text-green-950 text-base md:text-lg">
              &quot;ARDA is a Leader of agriculture Research Management for Sustainable Strength in Agriculture&quot;
            </p>
          </div>
        </section>

        <hr className="border-gray-800 border-t-2" />

        {/* === SECTION 4: CORE VALUE === */}
        <section className="py-6">
          <h2 className="text-center text-[#001f7a] font-extrabold text-3xl mb-12 uppercase tracking-wide">
            CORE VALUE: PROUD TO BE ARDA
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Acronym List */}
            <div className="flex flex-col gap-6 pl-0 md:pl-12">
              <div className="flex items-center gap-6">
                <span className="shrink-0 w-12 h-14 bg-[#bdcdff] text-[#001f7a] text-3xl font-bold flex items-center justify-center shadow-sm">P</span>
                <span className="text-[#001f7a] font-bold text-xl md:text-2xl">Positive Thinking</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="shrink-0 w-12 h-14 bg-[#bdcdff] text-[#001f7a] text-3xl font-bold flex items-center justify-center shadow-sm">A</span>
                <span className="text-[#001f7a] font-bold text-xl md:text-2xl">Active Approach</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="shrink-0 w-12 h-14 bg-[#bdcdff] text-[#001f7a] text-3xl font-bold flex items-center justify-center shadow-sm">R</span>
                <span className="text-[#001f7a] font-bold text-xl md:text-2xl">Reliable Services</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="shrink-0 w-12 h-14 bg-[#bdcdff] text-[#001f7a] text-3xl font-bold flex items-center justify-center shadow-sm">D</span>
                <span className="text-[#001f7a] font-bold text-xl md:text-2xl">Determination for Good</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="shrink-0 w-12 h-14 bg-[#bdcdff] text-[#001f7a] text-3xl font-bold flex items-center justify-center shadow-sm">A</span>
                <span className="text-[#001f7a] font-bold text-xl md:text-2xl">Achieve with Unity</span>
              </div>
            </div>

            {/* Tech Image */}
            <div className="relative w-full h-[320px] rounded-sm overflow-hidden shadow-lg border-2 border-[#bdcdff]/30">
              <Image src="/agri_tech.webp" alt="Agriculture Technology" fill className="object-cover" />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

