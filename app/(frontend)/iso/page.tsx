import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'ISO Standard | Arda Project',
};

export default function IsoPage() {
  return (
    <div className="w-full bg-white text-[#222] font-sans pb-24">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 mt-12 flex flex-col gap-16">
        
        {/* Title */}
        <h1 className="text-4xl md:text-[44px] font-bold text-center tracking-wide mb-6">ISO</h1>

        {/* Block 1: ISO 9001 */}
        <section className="flex flex-col gap-6 text-[15px]">
          <h2 className="text-[#2b4c7e] font-bold text-[22px] md:text-2xl">
            สวก.ได้รับการรับรองระบบบริหารงานคุณภาพตามมาตรฐาน ISO
          </h2>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start mt-2">
            <div className="shrink-0 w-[130px] h-[130px] relative">
              <Image src="/masci_logo.png" alt="MASCI ISO 9001" fill className="object-contain object-top" />
            </div>
            <div className="flex flex-col gap-4 text-gray-700 pt-1">
              <h3 className="font-bold text-[#2b4c7e] text-[17px] md:text-lg">
                สวก.ได้รับการรับรองระบบบริหารงานคุณภาพตามมาตรฐาน มอก.9001-2559(ISO 9001:2015) 4 ขอบข่าย
              </h3>
              <ul className="space-y-1.5 ml-4" style={{ listStyleType: 'square' }}>
                <li>การสนับสนุนทุนวิจัยด้านการเกษตร</li>
                <li>การพัฒนาบุคลากรด้านการวิจัย</li>
                <li>การส่งเสริมการใช้ประโยชน์และบริหารจัดการทรัพย์สินทางปัญญา</li>
                <li>การจัดทำแผนปฏิบัติการและงบประมาณ</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-14 mt-8 px-4 md:px-16">
            <div className="relative w-full aspect-[1/1.4] shadow-[0_2px_15px_rgba(0,0,0,0.08)] bg-white">
              <Image src="/iso9001_cert_th.png" alt="ISO 9001 Certificate TH" fill className="object-contain p-2" />
            </div>
            <div className="relative w-full aspect-[1/1.4] shadow-[0_2px_15px_rgba(0,0,0,0.08)] bg-white">
              <Image src="/iso9001_cert_en.png" alt="ISO 9001 Certificate EN" fill className="object-contain p-2" />
            </div>
          </div>
        </section>

        {/* Block 2: ISO/IEC 27001 */}
        <section className="flex flex-col gap-10 mt-16">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
            <div className="shrink-0 w-[150px] h-[75px] relative">
              <Image src="/bsi_logo.png" alt="bsi ISO/IEC 27001" fill className="object-contain object-top" />
            </div>
            <h2 className="text-[#2b4c7e] font-bold text-lg md:text-[22px] uppercase flex items-center md:pt-4">
              INFORMATION SECURITY MANAGEMENT SYSTEM - ISO/IEC 27001:2022
            </h2>
          </div>

          <div className="flex justify-center mt-2 px-4">
            <div className="relative w-full max-w-[460px] aspect-[1/1.4] shadow-[0_2px_15px_rgba(0,0,0,0.08)] bg-white">
              <Image src="/iso27001_cert.png" alt="ISO 27001 Certificate" fill className="object-contain p-2" />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
