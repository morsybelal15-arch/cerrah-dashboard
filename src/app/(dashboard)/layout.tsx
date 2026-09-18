"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, UserPlus, ListChecks, User, FileText, CalendarDays, LogOut } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDoctor = pathname.includes('/doctor');

  const patientLinks = [
    { name: 'المجسم بتاعي', icon: User, path: '/patient' },
    { name: 'الروشتات', icon: FileText, path: '/patient/prescriptions' },
    { name: 'جلساتي', icon: CalendarDays, path: '/patient/sessions' },
  ];

  const doctorLinks = [
    { name: 'العملاء', icon: Users, path: '/doctor' },
    { name: 'تسجيل مريض جديد', icon: UserPlus, path: '/doctor/new-patient' },
    { name: 'إنشاء الأنظمة الغذائية', icon: ListChecks, path: '/doctor/diets' },
  ];

  const links = isDoctor ? doctorLinks : patientLinks;

  return (
    <div className="flex h-screen bg-[#030604] overflow-hidden selection:bg-[#8DC63F] selection:text-black">
      <aside className="w-[280px] bg-black/40 border-l border-white/5 flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          <div className="p-8 border-b border-white/5 mb-6">
            <Link href="/" className="text-2xl font-black tracking-widest text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8DC63F]"></span>CERRAH
            </Link>
          </div>
          <nav className="flex flex-col gap-2 px-4">
            {links.map((link, i) => {
              const isActive = pathname === link.path || pathname.startsWith(`${link.path}/`);
              return (
                <Link key={i} href={link.path} 
                  className={`flex items-center gap-4 px-5 py-4 rounded-xl font-bold transition-all duration-300 ${isActive ? 'bg-[#8DC63F]/10 text-[#8DC63F] border border-[#8DC63F]/20' : 'text-green-100/60 hover:text-white hover:bg-white/5'}`}>
                  <link.icon size={20} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-6 border-t border-white/5">
          {isDoctor ? (
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="w-10 h-10 rounded-full bg-[#8DC63F] text-black font-black flex items-center justify-center">د</div>
              <div>
                <h4 className="font-extrabold text-white text-sm">د. مصطفى</h4>
                <p className="text-[10px] text-[#8DC63F] font-bold">مدير العيادة</p>
              </div>
            </div>
          ) : null}
          <button className="flex items-center gap-3 text-red-400 hover:text-red-300 font-bold px-4 transition-colors w-full">
            <LogOut size={18} className="rotate-180" /> تسجيل الخروج
          </button>
        </div>
      </aside>
      <main className="flex-1 h-full overflow-y-auto p-4 md:p-10 relative">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#8DC63F]/5 to-transparent pointer-events-none z-0"></div>
        <div className="relative z-10 w-full max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}