import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ARDA Research Framework | Arda Project',
};

export default function GrantsPage() {
  return (
    <div className="w-full bg-white text-black font-sans pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-12 flex flex-col gap-10">
        
        {/* Header with lines */}
        <div className="flex items-center w-full mb-2">
          <hr className="flex-1 border-t-[1.5px] border-black" />
          <h1 className="px-6 text-2xl md:text-3xl font-bold tracking-tight">ARDA Research Framework</h1>
          <hr className="flex-1 border-t-[1.5px] border-black" />
        </div>

        {/* 3 Horizontal Framework Blocks */}
        <div className="flex flex-col gap-6">
          {/* RU Block */}
          <div className="w-full bg-[#e3ffe4] min-h-[160px] md:min-h-[220px] flex items-center px-12 md:px-32">
            <span className="font-bold text-lg md:text-xl">RU</span>
          </div>
          
          {/* SF Block */}
          <div className="w-full bg-[#fff466] min-h-[160px] md:min-h-[220px] flex items-center px-12 md:px-32">
            <span className="font-bold text-lg md:text-xl">SF</span>
          </div>
          
          {/* Targeted Fund Block */}
          <div className="w-full bg-[#ffccce] min-h-[160px] md:min-h-[220px] flex items-center px-12 md:px-[110px]">
            <span className="font-bold text-lg md:text-xl text-center leading-tight">Targeted<br/>Fund</span>
          </div>
        </div>

        {/* Example Section */}
        <div className="mt-8 px-2">
          <h2 className="text-2xl md:text-[26px] font-bold mb-6">Example</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl">
            {/* Example Block 1 */}
            <div className="bg-[#e4aaff] aspect-[4/4.5] flex flex-col justify-end p-6">
              <span className="text-xl md:text-[22px] tracking-tight text-gray-900">Research name</span>
            </div>
            {/* Example Block 2 */}
            <div className="bg-[#e4aaff] aspect-[4/4.5] flex flex-col justify-end p-6">
              <span className="text-xl md:text-[22px] tracking-tight text-gray-900">Research name</span>
            </div>
            {/* Example Block 3 */}
            <div className="bg-[#e4aaff] aspect-[4/4.5] flex flex-col justify-end p-6">
              <span className="text-xl md:text-[22px] tracking-tight text-gray-900">Research name</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
