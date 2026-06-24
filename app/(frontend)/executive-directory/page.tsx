import type { Metadata } from 'next';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Executive Directory | Arda Project',
};

// ─── Component: Executive Card ──────────────────────
const ExecNode = ({
  name,
  role,
  tel,
  email,
  image
}: {
  name: string,
  role: string,
  tel: string,
  email: string,
  image?: string | null
}) => (
  <div className="flex items-center gap-4 bg-white p-3 md:p-4 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-[290px] md:w-[330px] max-w-full z-10 mx-auto">
    <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden border-[3px] border-[#5194d9] shrink-0 shadow-inner bg-gray-50">
      <Image
        src={image || "/executive_portrait.png"}
        alt={name}
        fill
        className="object-cover object-top"
      />
    </div>
    <div className="flex flex-col text-left">
      <p className="text-[#00176b] font-bold text-[14px] md:text-[15px] leading-tight">{name}</p>
      <p className="text-gray-400 text-[10px] md:text-[11px] leading-snug mt-1 max-w-[190px]">{role}</p>
      <p className="text-gray-500 text-[10px] md:text-[11px] leading-tight mt-1.5 font-medium">tel : {tel || "-"}</p>
      <p className="text-gray-500 text-[10px] md:text-[11px] leading-tight font-medium">email : {email || "-"}</p>
    </div>
  </div>
);

// ─── Component: Connecting Lines ───────────────────
const VLine = ({ h = "h-8" }: { h?: string }) => (
  <div className={`w-[2px] ${h} bg-[#beddf5] mx-auto`}></div>
);

// ─── Data Helper: Group by Rows ──────────────────
function groupByRows(members: any[]) {
  const rowsMap: { [key: number]: any[] } = {};
  const sorted = [...members].sort((a, b) => {
    if (a.row_order !== b.row_order) return (a.row_order || 0) - (b.row_order || 0);
    return (a.col_order || 0) - (b.col_order || 0);
  });

  sorted.forEach(m => {
    const row = m.row_order || 0;
    if (!rowsMap[row]) rowsMap[row] = [];
    rowsMap[row].push(m);
  });

  // Sort row keys and return values
  return Object.keys(rowsMap).sort((a, b) => parseInt(a) - parseInt(b)).map(k => rowsMap[parseInt(k)]);
}

// ─── Main Page (Server Component) ─────────────────
export default async function ExecutiveDirectoryPage() {
  let sections: any = [];
  try {
    // Direct Prisma Fetch (Faster & No URL issues on Server Side)
    sections = await prisma.executive_section.findMany({
      orderBy: { rank: 'asc' },
      include: {
        members: {
          where: { status: 1 }, // Only published
          orderBy: [{ row_order: 'asc' }, { col_order: 'asc' }]
        }
      }
    });
  } catch (error) {
    console.error("Failed to load directory data via Prisma:", error);
  }

  return (
    <div className="w-full bg-[#fcfdfd] text-gray-900 font-sans pb-24 overflow-x-hidden pt-px">

      {/* Top Banner */}
      <div className="max-w-[1400px] mx-auto pt-10 px-4 md:px-0">
        <div
          className="bg-[#2b6cb0] text-white py-4 pl-6 md:pl-16 pr-12 md:pr-24 shadow-md inline-block max-w-[90%] md:max-w-2xl"
          style={{ clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 50%, calc(100% - 30px) 100%, 0 100%)' }}
        >
          <h1 className="text-[24px] md:text-[34px] font-extrabold uppercase tracking-wider">EXECUTIVE DIRECTORY</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 flex flex-col items-center">

        {sections.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 italic">ไม่พบข้อมูลรายชื่อผู้บริหาร</p>
          </div>
        )}

        {sections.map((section: any, sIdx: number) => {
          const rows = groupByRows(section.members);

          return (
            <div key={section.id} className="w-full flex flex-col items-center">
              {/* Section Title */}
              <div className="text-center w-full px-4">
                <div className="inline-flex items-center gap-6">
                  <div className="h-px bg-blue-200 w-12 md:w-20"></div>
                  <h2 className="text-[26px] md:text-[38px] font-black text-[#00176b] tracking-tight uppercase px-8 py-3 bg-blue-50/50 rounded-2xl border border-blue-100 shadow-sm min-w-[200px]">
                    {section.name_en || "Section Name"}
                  </h2>
                  <div className="h-px bg-blue-200 w-12 md:w-20"></div>
                </div>
              </div>

              {/* Members in Rows */}
              <div className="space-y-0 w-full relative">
                {rows.map((row, rIdx) => (
                  <div key={rIdx} className="flex flex-col items-center bg-transparent">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-16 justify-center relative items-center py-4 w-full">
                      {/* Horizontal Connector for row with 2 people */}
                      {row.length > 1 && (
                        <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-[2px] bg-[#beddf5] -z-10 -translate-y-1/2"></div>
                      )}

                      {row.map((m, mIdx) => (
                        <div key={m.id} className="flex flex-col items-center">
                          <ExecNode
                            name={`${m.title} ${m.first_name} ${m.last_name}`}
                            role={m.position_en}
                            tel={m.phone}
                            email={m.email}
                            image={m.image}
                          />
                        </div>
                      ))}
                    </div>

                    {(rIdx < rows.length - 1 || (sIdx < sections.length - 1 && sections[sIdx + 1].members.length > 0)) && (
                      <VLine h="h-10" />
                    )}
                  </div>
                ))}
              </div>

              {/* Gap between sections if not at the end */}
              {sIdx < sections.length - 1 && <div className="h-0" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
