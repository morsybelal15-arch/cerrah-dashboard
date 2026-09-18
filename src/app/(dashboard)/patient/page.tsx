"use client";
import React from 'react';
import { useClinic } from '@/context/ClinicContext';
import CerrahAvatar from '@/components/CerrahAvatar';
import { User, Activity, AlertCircle } from 'lucide-react';

export default function PatientAvatarPage() {
  const { patients } = useClinic();
  
  // محاكاة تسجيل الدخول: جلب بيانات أول مريض في النظام
  const myData = patients[0]; 

  if (!myData) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-[fadeIn_0.3s_ease-out]">
        <AlertCircle size={48} className="text-[#8DC63F] mb-4 opacity-50" />
        <h2 className="text-xl font-black text-white mb-2">لا توجد بيانات متاحة</h2>
        <p className="text-white/50 font-bold text-sm">لم يتم العثور على ملفك الطبي. يرجى مراجعة إدارة العيادة.</p>
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      
      {/* الترحيب بالمريض */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-black/40 p-6 rounded-[24px] border border-white/5">
        <div>
          <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
            مرحباً بك، {myData.name} 👋
          </h1>
          <p className="text-green-100/70 font-bold text-sm">هذا هو مجسمك الحالي بناءً على آخر قياسات تم تسجيلها في العيادة.</p>
        </div>
        <div className="bg-[#8DC63F]/10 border border-[#8DC63F]/20 px-5 py-3 rounded-xl flex items-center gap-3">
          <Activity size={24} className="text-[#8DC63F]" />
          <div>
            <p className="text-[10px] font-bold text-green-100/50 mb-0.5">الوزن الحالي المسجل</p>
            <p className="text-lg font-black text-white">{myData.avatarProps?.weight || '--'} كجم</p>
          </div>
        </div>
      </div>

      {/* عرض المجسم (للمشاهدة فقط) */}
      <div className="glass-card p-6 md:p-8 rounded-[32px] border border-[#8DC63F]/10 relative overflow-hidden flex flex-col items-center">
        
        {/* شريط الإشعار */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 bg-black/60 backdrop-blur-md px-6 py-2.5 rounded-full border border-[#8DC63F]/20 text-xs font-bold text-white flex items-center gap-2 shadow-lg w-max">
          <User size={16} className="text-[#8DC63F]" />
          وضع العرض (يتم تحديث المجسم حصرياً بواسطة الطبيب)
        </div>

        {/* مساحة الـ Canvas */}
        <div className="w-full max-w-4xl h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent rounded-[24px] overflow-hidden">
          <CerrahAvatar {...myData.avatarProps} />
        </div>

      </div>
    </div>
  );
}