import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'ARDA Organization | Arda Project',
};

// Reusable component for the hexagonal/polygon nodes
const OrgNode = ({ children }: { children: React.ReactNode }) => (
  <div className="filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)] w-full h-full transition-transform hover:-translate-y-1 duration-300">
    <div
      className="bg-white w-full h-full min-h-[110px] flex items-center justify-center px-8 md:px-10 py-5 text-center"
      style={{ clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 15px 100%, 0 50%)' }}
    >
      <span className="text-black font-extrabold text-[13px] md:text-[14px] leading-relaxed tracking-tight">
        {children}
      </span>
    </div>
  </div>
);

export default function OrganizationPage() {
  return (
    <div className="w-full bg-[#f0fbf0] min-h-[85vh] py-16 px-4 md:px-8 font-sans flex flex-col items-center">

      {/* Title */}
      <div className="bg-[#00176b] text-white px-10 md:px-20 py-4 rounded-xl shadow-[0_10px_20px_rgba(0,23,107,0.2)] mb-14">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-widest uppercase">ARDA ORGANIZATION</h1>
      </div>

      {/* Main Top Node */}
      <div className="bg-white px-8 md:px-16 py-6 shadow-xl mb-20 flex items-center gap-6 justify-center max-w-2xl w-full">
        {/* Logo Circular Placeholder */}
        <div className="shrink-0 w-[70px] h-[70px] bg-white border-[1.5px] border-blue-900 rounded-full flex flex-col items-center justify-center text-[#00176b] shadow-sm relative">
          <span className="text-xl font-bold leading-none tracking-tighter">สวก</span>6
          <div className="absolute inset-x-0 bottom-1 flex justify-center">
            <div className="w-10 h-[1px] bg-blue-900 absolute top-0"></div>
          </div>
        </div>
        <div className="text-center font-extrabold text-black text-[15px] md:text-lg tracking-tight">
          Agricultural Research Development Agency<br />(Public Organization)
        </div>
      </div>

      {/* Organizational Grid Container */}
      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-8 md:gap-14">

        {/* Row 1: 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <OrgNode>Office of Research Promotion<br />(PR)</OrgNode>
          <OrgNode>Office of Research Utilization<br />and<br />Business Development (RUD)</OrgNode>
          <OrgNode>Office of Researches<br />Capabilities Enhancement<br />(RCE)</OrgNode>
          <OrgNode>Center of Agricultural Research<br />Innovation and Technology Data Service<br />(ARDA-CADS)</OrgNode>
        </div>

        {/* Row 2: 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <OrgNode>Office of General Administration<br />(GR)</OrgNode>
          <OrgNode>Office of Policy and Strategy<br />(PS)</OrgNode>
          <OrgNode>Office of Corporate<br />Communications and International<br />Relations (CIR)</OrgNode>
          <OrgNode>Office of Legal<br />(LG)</OrgNode>
        </div>

        {/* Row 3: 2 columns centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 md:w-3/4 lg:w-1/2 mx-auto">
          <OrgNode>Office of Internal Audit<br />(IA)</OrgNode>
          <OrgNode>Office of the Executive and<br />Human Resource Management<br />(EHR)</OrgNode>
        </div>

      </div>

    </div>
  );
}
