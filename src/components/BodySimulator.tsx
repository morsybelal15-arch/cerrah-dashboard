"use client";
import React, { useState } from 'react';
import { X, Activity, User, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import CerrahAvatar from './CerrahAvatar';

export default function BodySimulator({ bmiResult, showAvatarModal, setShowAvatarModal }: any) {
  // === نظام معالج الخطوات (Wizard) ===
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [avatarProps, setAvatarProps] = useState({
    gender: 'female' as 'male' | 'female',
    weight: 75,
    height: 170,
    skinTone: '#e8b89c',
    bellyRound: 0, bellyLower: 0, bellyUpper: 0,
    loveHandles: 0, doubleChin: 0, chestSag: 0,
    armsFat: 0, armsSag: 0, thighsFat: 0, calvesFat: 0, glutesFat: 0,
    hasStretchMarks: false, hasCellulite: false
  });

  const skinTones = ['#fcdbc4', '#e8b89c', '#d39972', '#a06540', '#63371f'];

  // عناوين المراحل
  const stepTitles = [
    { title: "تحديد الجنس", desc: "اختر نوع المجسم" },
    { title: "القياسات الأساسية", desc: "الوزن والطول الفعلي" },
    { title: "لون البشرة", desc: "اختر الدرجة الأقرب لك" },
    { title: "نحت الجذع والبطن", desc: "تخصيص نسب الدهون" },
    { title: "الأطراف والجلد", desc: "تفاصيل الذراعين والقدمين" }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(prev => prev + 1);
    else setShowAvatarModal(false); // حفظ وإنهاء
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  return (
    <>
      {/* ================= زرار فتح المحاكي في الصفحة ================= */}
      <div className="glass-card rounded-[24px] flex-1 flex flex-col p-4 relative overflow-hidden group border border-[#8DC63F]/20">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        <div className="flex-1 bg-black/40 rounded-xl relative overflow-hidden flex items-center justify-center min-h-[250px]">
           <div className="absolute inset-0 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
             <CerrahAvatar {...avatarProps} />
           </div>
        </div>
        <div className="relative z-20 mt-4">
          <button 
            onClick={() => { setShowAvatarModal(true); setCurrentStep(1); }}
            className="w-full bg-[#0a1a0a] hover:bg-[#8DC63F] text-[#8DC63F] hover:text-black border border-[#8DC63F]/30 py-3.5 rounded-xl font-black text-sm flex items-center justify-between px-5 transition-all duration-300 shadow-lg"
          >
            <span>إنشاء وتخصيص المجسم الخاص بك</span>
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>

      {/* ================= نافذة المحاكي (Modal) - نظام المراحل ================= */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 sm:bg-black/90 sm:p-4 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
          
          <div className="w-full h-[100dvh] sm:h-[90vh] max-w-6xl bg-[#050505] sm:rounded-[32px] sm:border border-white/10 flex flex-col overflow-hidden shadow-2xl relative">
            
            {/* 1. الهيدر وشريط التقدم */}
            <div className="shrink-0 bg-[#0a0a0a] z-10">
              <div className="h-[65px] sm:h-[76px] px-4 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#8DC63F]/10 flex items-center justify-center border border-[#8DC63F]/20 shrink-0">
                    <Activity size={18} className="text-[#8DC63F]" />
                  </div>
                  <div>
                    <h2 className="text-white font-black text-sm sm:text-base leading-tight">معمل الأجسام المتقدم</h2>
                    <p className="text-[#8DC63F] text-[9px] sm:text-[10px] font-black tracking-widest uppercase mt-0.5">CERRAH BODY SCULPTING</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAvatarModal(false)}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 rounded-full flex items-center justify-center transition-colors border border-white/5 shrink-0"
                >
                  <X size={18} />
                </button>
              </div>
              
              {/* شريط التقدم (Progress Bar) */}
              <div className="h-1.5 w-full bg-white/5 relative">
                <div 
                  className="absolute top-0 right-0 h-full bg-[#8DC63F] transition-all duration-500 ease-out" 
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 2. منطقة المحتوى (مقسمة لـ 3D و أسئلة) */}
            <div className="flex-1 flex flex-col lg:flex-row min-h-0 w-full overflow-hidden">
              
              {/* أ. المحاكي 3D (40% من الموبايل) */}
              <div className="w-full h-[40%] lg:h-full lg:flex-1 shrink-0 relative bg-gradient-to-b from-black/80 to-black/20 border-b lg:border-b-0 lg:border-r border-white/5 overflow-hidden">
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 bg-black/80 border border-[#8DC63F]/30 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-md">
                  <span className="text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-wider">Live Preview</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] animate-pulse"></span>
                </div>
                <CerrahAvatar {...avatarProps} />
              </div>

              {/* ب. منطقة الأسئلة والمراحل (60% من الموبايل) */}
              <div className="w-full h-[60%] lg:h-full lg:w-[420px] shrink-0 flex flex-col bg-[#0a0a0a] relative">
                
                {/* عنوان المرحلة الحالية */}
                <div className="shrink-0 p-5 border-b border-white/5 text-center">
                  <span className="text-[#8DC63F] text-[10px] font-black tracking-wider uppercase mb-1 block">الخطوة {currentStep} من {totalSteps}</span>
                  <h3 className="text-xl font-black text-white">{stepTitles[currentStep - 1].title}</h3>
                  <p className="text-white/40 text-xs font-bold mt-1">{stepTitles[currentStep - 1].desc}</p>
                </div>

                {/* محتوى المرحلة (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-5 min-h-0 custom-scrollbar flex flex-col">
                  
                  {currentStep === 1 && (
                    <div className="flex-1 flex flex-col justify-center gap-4 animate-[fadeIn_0.3s_ease-out]">
                      <button onClick={() => setAvatarProps({...avatarProps, gender: 'male'})} className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${avatarProps.gender === 'male' ? 'bg-[#8DC63F]/10 border-[#8DC63F] text-[#8DC63F] scale-105 shadow-[0_0_20px_rgba(141,198,63,0.15)]' : 'bg-black/40 border-white/5 text-white/50 hover:border-white/20 hover:scale-105'}`}>
                        <User size={40} />
                        <span className="font-black text-lg">ذكر (Male)</span>
                      </button>
                      <button onClick={() => setAvatarProps({...avatarProps, gender: 'female'})} className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${avatarProps.gender === 'female' ? 'bg-[#8DC63F]/10 border-[#8DC63F] text-[#8DC63F] scale-105 shadow-[0_0_20px_rgba(141,198,63,0.15)]' : 'bg-black/40 border-white/5 text-white/50 hover:border-white/20 hover:scale-105'}`}>
                        <User size={40} />
                        <span className="font-black text-lg">أنثى (Female)</span>
                      </button>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="flex-1 flex flex-col justify-center gap-6 animate-[fadeIn_0.3s_ease-out]">
                      <div>
                        <label className="block text-sm font-bold text-white/70 mb-3 text-center">الوزن الحالي (كجم)</label>
                        <input type="number" value={avatarProps.weight} onChange={(e) => setAvatarProps({...avatarProps, weight: Number(e.target.value)})} className="w-full bg-black/40 border-2 border-white/10 rounded-2xl p-4 text-white text-center font-black text-xl outline-none focus:border-[#8DC63F]/50 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-white/70 mb-3 text-center">الطول الفعلي (سم)</label>
                        <input type="number" value={avatarProps.height} onChange={(e) => setAvatarProps({...avatarProps, height: Number(e.target.value)})} className="w-full bg-black/40 border-2 border-white/10 rounded-2xl p-4 text-white text-center font-black text-xl outline-none focus:border-[#8DC63F]/50 transition-colors" />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="flex-1 flex flex-col justify-center animate-[fadeIn_0.3s_ease-out]">
                      <div className="grid grid-cols-2 gap-4">
                        {skinTones.map((color) => (
                          <button 
                            key={color} 
                            onClick={() => setAvatarProps({...avatarProps, skinTone: color})}
                            className={`h-24 rounded-2xl border-2 transition-all duration-300 relative ${avatarProps.skinTone === color ? 'border-[#8DC63F] scale-105 shadow-[0_0_20px_rgba(141,198,63,0.3)]' : 'border-transparent hover:scale-105'}`}
                            style={{ backgroundColor: color }}
                          >
                            {avatarProps.skinTone === color && <CheckCircle2 className="absolute top-2 right-2 text-[#8DC63F] bg-black/50 rounded-full" size={20} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-5 my-auto animate-[fadeIn_0.3s_ease-out]">
                      {[
                        { label: 'استدارة البطن الكلية', key: 'bellyRound' },
                        { label: 'الترهل السفلي للبطن', key: 'bellyLower' },
                        { label: 'الدهون العلوية للبطن', key: 'bellyUpper' },
                        { label: 'دهون الأجناب (Love Handles)', key: 'loveHandles' },
                        { label: 'ترهل منطقة الصدر', key: 'chestSag' },
                      ].map((item) => (
                        <div key={item.key} className="bg-black/30 p-4 rounded-2xl border border-white/5">
                          <div className="flex justify-between text-[11px] sm:text-xs font-bold text-white mb-3">
                            <span>{item.label}</span>
                            <span className="text-[#8DC63F]">{Math.round((avatarProps as any)[item.key] * 100)}%</span>
                          </div>
                          <input 
                            type="range" min="0" max="1" step="0.05" 
                            value={(avatarProps as any)[item.key]} 
                            onChange={(e) => setAvatarProps({...avatarProps, [item.key]: Number(e.target.value)})}
                            className="w-full accent-[#8DC63F] h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" 
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-5 my-auto animate-[fadeIn_0.3s_ease-out]">
                      {[
                        { label: 'الدهون في الذراعين', key: 'armsFat' },
                        { label: 'ترهل الذراعين', key: 'armsSag' },
                        { label: 'الدهون في الفخذين', key: 'thighsFat' },
                        { label: 'الدهون في الأرداف', key: 'glutesFat' },
                        { label: 'الذقن المزدوج (اللغد)', key: 'doubleChin' },
                      ].map((item) => (
                        <div key={item.key} className="bg-black/30 p-4 rounded-2xl border border-white/5">
                          <div className="flex justify-between text-[11px] sm:text-xs font-bold text-white mb-3">
                            <span>{item.label}</span>
                            <span className="text-[#8DC63F]">{Math.round((avatarProps as any)[item.key] * 100)}%</span>
                          </div>
                          <input 
                            type="range" min="0" max="1" step="0.05" 
                            value={(avatarProps as any)[item.key]} 
                            onChange={(e) => setAvatarProps({...avatarProps, [item.key]: Number(e.target.value)})}
                            className="w-full accent-[#8DC63F] h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" 
                          />
                        </div>
                      ))}
                      <div className="pt-2">
                        <label className="flex items-center gap-3 bg-[#8DC63F]/5 p-4 rounded-2xl border border-[#8DC63F]/20 cursor-pointer transition-colors">
                          <input type="checkbox" checked={avatarProps.hasCellulite} onChange={(e) => setAvatarProps({...avatarProps, hasCellulite: e.target.checked})} className="accent-[#8DC63F] w-5 h-5 rounded" />
                          <span className="text-sm font-bold text-white">إظهار السيلوليت (Cellulite) في الجلد</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. أزرار التنقل (Footer ثابت لا يختفي) */}
                <div className="shrink-0 p-4 border-t border-white/10 bg-[#0a0a0a] z-10 flex gap-3">
                  {currentStep > 1 && (
                    <button 
                      onClick={handlePrev}
                      className="w-1/3 bg-white/5 hover:bg-white/10 text-white border border-white/10 py-3.5 sm:py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <ChevronRight size={18} /> السابق
                    </button>
                  )}
                  <button 
                    onClick={handleNext}
                    className="flex-1 bg-[#8DC63F] hover:bg-[#7ab036] text-black border border-[#8DC63F]/30 py-3.5 sm:py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(141,198,63,0.15)] group"
                  >
                    {currentStep < totalSteps ? (
                      <>التالي <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /></>
                    ) : (
                      <>حفظ المجسم وإنهاء <CheckCircle2 size={18} /></>
                    )}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}