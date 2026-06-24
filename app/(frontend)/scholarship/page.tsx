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
      
      {/* SECTION 1: Research Distribution Map */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 py-14 flex flex-col items-center">
          <h2 className="text-2xl md:text-[32px] font-bold text-[#2e7d32] text-center mb-10 leading-snug">
            ผลงานวิจัยของ สวก. และการขยายผลงานวิจัย<br/>กระจายตามพื้นที่ทั่วประเทศ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-4 w-full items-center">
            {/* Left: Map */}
            <div className="md:col-span-5 relative w-full h-[380px] md:h-[480px]">
              <Image src="/thailand_map.png" alt="Thailand Map Distribution" fill className="object-contain" />
            </div>

            {/* Right: Data */}
            <div className="md:col-span-7 flex flex-col gap-6 pl-0 md:pl-16">
              <h3 className="text-xl md:text-[22px] font-bold text-[#1a237e] leading-snug">
                ผลงานวิจัยที่กระจายตามพื้นที่ทั่วประเทศ<br/>รวม 118 โครงการ แบ่งตามภูมิภาค ดังนี้
              </h3>
              
              <ul className="flex flex-col gap-3.5 text-[17px] md:text-[19px] font-bold mt-2">
                <li><span className="text-[#1a237e]">1. ภาคเหนือ</span> <span className="text-[#d32f2f]">จำนวน 30 โครงการ</span></li>
                <li><span className="text-[#1a237e]">2. ภาคกลาง</span> <span className="text-[#d32f2f]">จำนวน 29 โครงการ</span></li>
                <li><span className="text-[#1a237e]">3. ภาคตะวันตก</span> <span className="text-[#d32f2f]">จำนวน 10 โครงการ</span></li>
                <li><span className="text-[#1a237e]">4. ภาคตะวันออก</span> <span className="text-[#d32f2f]">จำนวน 7 โครงการ</span></li>
                <li><span className="text-[#1a237e]">5. ภาคตะวันออกเฉียงเหนือ</span> <span className="text-[#d32f2f]">จำนวน 23 โครงการ</span></li>
                <li><span className="text-[#1a237e]">6. ภาคใต้</span> <span className="text-[#d32f2f]">จำนวน 19 โครงการ</span></li>
              </ul>

              <p className="text-[#c62828] font-bold text-[19px] md:text-[22px] mt-6">
                พร้อมผลักดันผลงานวิจัยและขยายผลสำเร็จในเชิงพื้นที่ (Area Base)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Promotion & Support (Split into 2 parts per requested) */}
      <section className="mt-16 max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <div className="bg-white py-5 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 rounded-t-xl z-10 relative relative">
          <h2 className="text-[22px] md:text-[28px] font-bold text-[#004d40]">
            การส่งเสริม สนับสนุน และพัฒนาการบุคลากรด้านการวิจัยการเกษตร
          </h2>
          <div className="shrink-0 w-[55px] h-[55px] bg-white border border-blue-900 rounded-full flex flex-col items-center justify-center text-[#1a237e] shadow-sm mt-4 md:mt-0 relative overflow-hidden">
            <span className="text-lg font-bold leading-none tracking-tighter z-10">สวก</span>
            <div className="absolute inset-x-0 bottom-1 flex justify-center">
             <div className="w-8 h-[1px] bg-blue-900 absolute top-0"></div>
            </div>
          </div>
        </div>

        {/* 2.1 TEXT/DIAGRAMS SECTION (ข้อความอยู่ด้านบน) */}
        <div className="bg-[#b2dfdb] p-5 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-5 shadow-md rounded-b-xl">
          
          {/* Card 1: ทุนการศึกษา */}
          <div className="bg-white px-6 py-8 rounded-lg shadow-sm flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <IconEducation />
              <div className="bg-[#ffca28] text-[#1a237e] font-bold px-5 py-2 rounded-full text-[15px] shadow-sm">
                ทุนการศึกษา
              </div>
            </div>
            <div className="flex flex-col gap-5 text-[15px] font-medium text-center mt-2">
              <div>
                <p>ทุน สวก. ตรี-โท-เอก</p>
                <p className="text-gray-500 text-xs mt-0.5">(ทุนเรียนเต็มเวลา)</p>
              </div>
              <hr className="border-gray-200" />
              <div>
                <p>ทุนปริญญาเอก 80 พรรษา</p>
                <p className="text-gray-500 text-xs mt-0.5">(ทุนเรียนไม่เต็มเวลา เน้นทำวิจัย)</p>
              </div>
              <hr className="border-gray-200" />
              <div>
                <p>ทุนปริญญาเอก 70 ปี</p>
                <p className="text-gray-500 text-xs mt-0.5">(ทุนเรียนเต็มเวลา)</p>
              </div>
              <hr className="border-gray-200" />
              <div className="text-[13px] leading-relaxed">
                โครงการทุนปริญญาตรีเฉลิมพระเกียรติ "สืบสาน ร.9 เพื่อเกษตรกรรุ่นใหม่" เฉลิมพระเกียรติเนื่องในโอกาสมหา<br/>มงคลพระราชพิธีบรมราชาภิเษก
              </div>
            </div>
          </div>

          {/* Card 2: ทุนระยะสั้น */}
          <div className="bg-white px-6 py-8 rounded-lg shadow-sm flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <IconGlobe />
              <div className="bg-[#66bb6a] text-white font-bold px-5 py-2 rounded-full text-[15px] shadow-sm">
                ทุนระยะสั้น
              </div>
            </div>
            <div className="flex flex-col gap-6 text-[15px] font-medium text-center mt-4">
              <p>ทุนโครงการพัฒนา<br/>ทีมบุคลากรวิจัย</p>
              <hr className="border-gray-200" />
              <p>ทุนนำเสนอผลงานวิจัย<br/>ณ ต่างประเทศ</p>
              <hr className="border-gray-200" />
              <p>ทุนฝึกอบรมหรือปฏิบัติ<br/>การวิจัย ณ ต่างประเทศ</p>
            </div>
          </div>

          {/* Card 3: โครงการฝึกอบรม */}
          <div className="bg-white px-6 py-8 rounded-lg shadow-sm flex flex-col gap-6">
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <IconTraining />
              <div className="bg-[#00838f] text-white font-bold px-5 py-2 rounded-xl text-[14px] shadow-sm">
                โครงการฝึกอบรม
              </div>
            </div>
            <div className="flex flex-col gap-5 text-[15px] font-medium mt-1">
              <p className="text-center text-[13.5px] px-2 leading-relaxed">
                จัดทำหลักสูตรฝึกอบรม เพื่อเพิ่มพูนความรู้ให้แก่<br/>บุคลากรด้านการวิจัยเกษตร<br/>อย่างครบวงจร
              </p>
              <hr className="border-gray-200" />
              <div className="flex items-start gap-4 mt-2">
                <span className="text-[40px] leading-none text-[#52b1b9] font-light">1.</span>
                <p className="pt-1 text-[14px] leading-snug">ทุนโครงการฝึกอบรม ร่วมกับกระทรวงเกษตร และสหกรณ์</p>
              </div>
              <div className="flex items-start gap-4 mt-2">
                <span className="text-[40px] leading-none text-[#52b1b9] font-light">2.</span>
                <p className="pt-1 text-[14px] leading-snug">หลักสูตรฝึกอบรม ด้านการวิจัยอย่าง ครบวงจร</p>
              </div>
            </div>
          </div>

        </div>

        {/* 2.2 PICTURES SECTION (รูประดับด้านล่าง) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden shadow-md border hover:shadow-lg transition-shadow">
            <Image src="/scholarship_photo1.png" alt="Exhibition Booth" fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden shadow-md border hover:shadow-lg transition-shadow">
            <Image src="/scholarship_photo2.png" alt="Seminar Meeting" fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden shadow-md border hover:shadow-lg transition-shadow">
            <Image src="/scholarship_photo3.png" alt="Group Photo" fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>

      </section>

    </div>
  );
}
