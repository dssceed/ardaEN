import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Scholarship | Arda Project',
};

// SVG Icons
const IconEducation = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
    <path d="M22 10v6M2 10l-10-5-10 5 10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const IconGlobe = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    <path d="M2 12h20"/>
  </svg>
);

const IconTraining = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <path d="M8 21h8M12 17v4"/>
    <circle cx="12" cy="9" r="2"/>
  </svg>
);

export default function ScholarshipPage() {
  return (
    <div className="w-full bg-[#f8f9fa] text-gray-900 font-sans pb-20">

      {/* Hero Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-10">
        <Image
          src="/main/scholar.jpg"
          alt="Scholarship"
          width={1366}
          height={768}
          priority
          sizes="(max-width: 896px) 100vw, 896px"
          className="w-full h-auto rounded-lg shadow-sm"
        />
      </div>

      

    </div>
  );
}
