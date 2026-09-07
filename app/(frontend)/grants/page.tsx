import type { Metadata } from 'next';
import Image from 'next/image';

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

        {/* Research Impact Image */}
        <div className="w-full rounded-lg overflow-hidden shadow-sm">
          <Image
            src="/main/research_impact.png"
            alt="Research Impact"
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="w-full h-auto"
          />
        </div>

      </div>
    </div>
  );
}
