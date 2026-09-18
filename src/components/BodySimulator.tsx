"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChevronLeft, ChevronRight, Sparkles, X, Dna, Sliders, ScanFace, ActivitySquare, User } from 'lucide-react';

// 1. استيراد واجهة الخصائص بوضوح
import type { AvatarProps } from './CerrahAvatar';

// 2. تمرير الخصائص لدالة dynamic واستخدام المسار النسبي
const Avatar3D = dynamic<AvatarProps>(() => import('./CerrahAvatar'), { 
  ssr: false, 
  loading: () => null 
});

interface BodySimulatorProps {
  bmiResult: number;
  showAvatarModal: boolean;
  setShowAvatarModal: (val: boolean) => void;
}


const BodySimulator = ({ bmiResult, showAvatarModal, setShowAvatarModal }: BodySimulatorProps) => {
  const [step, setStep] = useState(1);
  const [isBuilding, setIsBuilding] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  // البيانات الأساسية
  const [avatarGender, setAvatarGender] = useState<'male' | 'female'>('female');
  const [avatarSkinTone, setAvatarSkinTone] = useState('#e2b999');
  const [avatarWeight, setAvatarWeight] = useState(75);
  const [avatarHeight, setAvatarHeight] = useState(170);

  // Morph Targets
  const [morphs, setMorphs] = useState({
    bellyRound: 0, bellyLower: 0, bellyUpper: 0, loveHandles: 0,
    doubleChin: 0, chestSag: 0, armsFat: 0, armsSag: 0, 
    thighsFat: 0, calvesFat: 0, glutesFat: 0
  });

  // Textures
  const [hasStretchMarks, setHasStretchMarks] = useState(false);
  const [hasCellulite, setHasCellulite] = useState(false);

  useEffect(() => {
    if (showAvatarModal) { setStep(1); setIsBuilding(false); }
  }, [showAvatarModal]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAvatarModal(false);
  };

  const updateMorph = (key: keyof typeof morphs, value: number) => {
    setMorphs(prev => ({ ...prev, [key]: value }));
  };

  const startBuildingAvatar = () => {
    setIsBuilding(true);
    setLoadingText("جاري دمج القياسات وتشكيل الهيكل المخصص...");
    setTimeout(() => setLoadingText("تطبيق ملمس الجلد والأبعاد الواقعية..."), 1500);
    setTimeout(() => { setIsBuilding(false); setStep(4); }, 3500);
  };

  const renderSlider = (label: string, stateKey: keyof typeof morphs, desc: string) => (
    <div className="bg-black/20 border border-white/5 p-5 rounded-2xl mb-4 transition-all hover:border-[#8DC63F]/30">
      <div className="flex justify-between items-end mb-3">
        <div>
          <label className="text-white font-black text-sm block">{label}</label>
          <span className="text-[10px] text-green-100/50 font-bold">{desc}</span>
        </div>
        <span className="text-[#8DC63F] font-black text-sm">{morphs[stateKey]}%</span>
      </div>
      <input 
        type="range" min="0" max="100" value={morphs[stateKey]}
        onChange={(e) => updateMorph(stateKey, Number(e.target.value))}
        className="w-full accent-[#8DC63F] h-2 bg-black/60 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );

  return (
    <>
      <div className="glass-card rounded-3xl p-7 flex-1 flex flex-col relative overflow-hidden min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-0"></div>
        <div className="flex-1 flex justify-center items-center relative w-full h-full z-10">
          <Avatar3D 
            gender={avatarGender} weight={avatarWeight} height={avatarHeight} skinTone={avatarSkinTone}
            bellyRound={morphs.bellyRound / 100} bellyLower={morphs.bellyLower / 100} bellyUpper={morphs.bellyUpper / 100}
            loveHandles={morphs.loveHandles / 100} doubleChin={morphs.doubleChin / 100} chestSag={morphs.chestSag / 100}
            armsFat={morphs.armsFat / 100} armsSag={morphs.armsSag / 100} thighsFat={morphs.thighsFat / 100}
            calvesFat={morphs.calvesFat / 100} glutesFat={morphs.glutesFat / 100}
            hasStretchMarks={hasStretchMarks} hasCellulite={hasCellulite}
          />
        </div>
        <button onClick={(e) => { e.stopPropagation(); setShowAvatarModal(true); }} className="btn-glow btn-glow-gold w-full flex justify-between items-center px-6 py-4 rounded-[20px] text-sm font-extrabold shadow-lg z-20 mt-6 border-none">
          إنشاء وتخصيص المجسم الخاص بك <ChevronLeft size={20}/>
        </button>
      </div>

      {showAvatarModal && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-8 animate-[fadeIn_0.3s_ease-out]" onClick={handleClose}>
          <div className="w-full max-w-[1200px] h-[85vh] bg-[#050805] rounded-[30px] border border-white/10 shadow-2xl flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
            
            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-black/40 z-20 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8DC63F]/20 flex items-center justify-center text-[#8DC63F]"><Dna size={20}/></div>
                <div><h2 className="text-lg font-extrabold text-white">معمل بناء الأجسام المتقدم</h2><p className="text-[10px] text-green-100/50 font-bold uppercase tracking-widest">Cerrah Body Sculpting</p></div>
              </div>
              <button onClick={handleClose} className="text-white/40 hover:text-white bg-white/5 hover:bg-red-500/20 p-2.5 rounded-full transition-colors"><X size={20} /></button>
            </div>

            {isBuilding ? (
              <div className="flex-1 flex flex-col items-center justify-center p-10 bg-black/20">
                <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                  <div className="absolute inset-0 border-4 border-white/5 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-[#8DC63F] rounded-full border-t-transparent animate-spin"></div>
                  <Dna size={40} className="text-[#8DC63F] animate-pulse" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2 tracking-wide">جاري التكوين...</h3>
                <p className="text-[#8DC63F] font-bold animate-pulse text-lg">{loadingText}</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-black/20">
                
                {/* 👈 التبويبات العلوية (مؤشر بصري فقط - غير قابل للضغط) */}
                <div className="w-full lg:w-[420px] flex flex-col bg-[#030604] border-l border-white/5 h-full overflow-hidden shadow-2xl z-30">
                  <div className="flex p-3 gap-2 border-b border-white/5 shrink-0 justify-between">
                    <div className={`flex-1 flex justify-center py-2.5 rounded-lg font-bold text-[11px] transition-all flex-col items-center gap-1 ${step === 1 ? 'bg-[#8DC63F]/10 text-[#8DC63F] border border-[#8DC63F]/30' : 'text-white/30'}`}><Sliders size={14}/> <span>الأساسيات</span></div>
                    <div className={`flex-1 flex justify-center py-2.5 rounded-lg font-bold text-[11px] transition-all flex-col items-center gap-1 ${step === 2 ? 'bg-[#8DC63F]/10 text-[#8DC63F] border border-[#8DC63F]/30' : 'text-white/30'}`}><ScanFace size={14}/> <span>الجذع والبطن</span></div>
                    <div className={`flex-1 flex justify-center py-2.5 rounded-lg font-bold text-[11px] transition-all flex-col items-center gap-1 ${step === 3 ? 'bg-[#8DC63F]/10 text-[#8DC63F] border border-[#8DC63F]/30' : 'text-white/30'}`}><ActivitySquare size={14}/> <span>الجلد والأطراف</span></div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    
                    {step === 1 && (
                      <div className="animate-[slideUp_0.3s_ease-out]">
                        <h3 className="text-xl font-black text-white mb-6">البيانات العامة للجسد</h3>
                        
                        <div className="flex gap-4 mb-8">
                           <button onClick={() => setAvatarGender('male')} className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${avatarGender === 'male' ? 'bg-[#8DC63F]/10 border-[#8DC63F] text-[#8DC63F]' : 'border-white/5 text-white/50 hover:bg-white/5'}`}><User size={24}/> <span className="font-bold text-sm">ذكر</span></button>
                           <button onClick={() => setAvatarGender('female')} className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${avatarGender === 'female' ? 'bg-[#8DC63F]/10 border-[#8DC63F] text-[#8DC63F]' : 'border-white/5 text-white/50 hover:bg-white/5'}`}><User size={24}/> <span className="font-bold text-sm">أنثى</span></button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                          <div><label className="text-white/50 font-bold mb-2 block text-xs">الوزن الحالي (كجم)</label><input type="number" value={avatarWeight} onChange={(e) => setAvatarWeight(Number(e.target.value))} className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-center font-black text-white text-lg focus:border-[#8DC63F] outline-none" /></div>
                          <div><label className="text-white/50 font-bold mb-2 block text-xs">الطول الفعلي (سم)</label><input type="number" value={avatarHeight} onChange={(e) => setAvatarHeight(Number(e.target.value))} className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-center font-black text-white text-lg focus:border-[#8DC63F] outline-none" /></div>
                        </div>

                        <div className="mb-6">
                          <label className="text-white/50 font-bold mb-4 block text-xs">لون البشرة الأساسي</label>
                          <div className="flex gap-3 justify-between">
                            {['#5c3826', '#8c593b', '#c48e65', '#e2b999', '#fcdbc4'].map((color) => (
                              <button key={color} onClick={() => setAvatarSkinTone(color)} className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-4 transition-transform hover:scale-110 ${avatarSkinTone === color ? 'border-[#8DC63F] shadow-[0_0_15px_rgba(141,198,63,0.5)] scale-110' : 'border-transparent'}`} style={{ backgroundColor: color }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="animate-[slideUp_0.3s_ease-out]">
                        <h3 className="text-xl font-black text-white mb-6">مناطق تراكم الدهون</h3>
                        {renderSlider('استدارة البطن الكلية (الكرش)', 'bellyRound', 'حجم البروز الأمامي للبطن')}
                        {renderSlider('تراكم دهون أسفل البطن', 'bellyLower', 'الدهون المتمركزة تحت السرة')}
                        {renderSlider('مقاس الخصر والجوانب', 'loveHandles', 'تراكم الجوانب (Love Handles)')}
                        {renderSlider('ترهلات وضعف عضلات الصدر', 'chestSag', 'نسبة نزول الصدر أو التثدي')}
                      </div>
                    )}

                    {step === 3 && (
                      <div className="animate-[slideUp_0.3s_ease-out]">
                        <h3 className="text-xl font-black text-white mb-6">الأطراف وحالة الجلد</h3>
                        {renderSlider('دهون الذراعين (الزنود)', 'armsFat', 'حجم الكتلة الدهنية')}
                        {renderSlider('دهون الفخذين والأرداف', 'thighsFat', 'امتلاء النصف السفلي')}
                        
                        <div className="mt-8 pt-6 border-t border-white/5">
                           <h3 className="text-sm font-black text-[#8DC63F] mb-4 uppercase tracking-wider">نسيج وملمس الجلد</h3>
                           
                           <div onClick={() => setHasStretchMarks(!hasStretchMarks)} className={`p-4 rounded-2xl cursor-pointer border-2 mb-3 transition-all flex justify-between items-center ${hasStretchMarks ? 'bg-[#8DC63F]/10 border-[#8DC63F]' : 'bg-black/40 border-white/5 hover:border-white/20'}`}>
                             <div><h4 className="font-black text-white text-sm">علامات التمدد (Stretch Marks)</h4><p className="text-[10px] text-green-100/40 mt-1">خطوط التمدد الناتجة عن تذبذب الوزن</p></div>
                             <div className={`w-6 h-6 rounded flex items-center justify-center ${hasStretchMarks ? 'bg-[#8DC63F] text-black' : 'bg-black/50'}`}>{hasStretchMarks && '✓'}</div>
                           </div>

                           <div onClick={() => setHasCellulite(!hasCellulite)} className={`p-4 rounded-2xl cursor-pointer border-2 transition-all flex justify-between items-center ${hasCellulite ? 'bg-[#8DC63F]/10 border-[#8DC63F]' : 'bg-black/40 border-white/5 hover:border-white/20'}`}>
                             <div><h4 className="font-black text-white text-sm">مظهر السيلوليت (Cellulite)</h4><p className="text-[10px] text-green-100/40 mt-1">تأثير قشر البرتقال على الفخذين والأرداف</p></div>
                             <div className={`w-6 h-6 rounded flex items-center justify-center ${hasCellulite ? 'bg-[#8DC63F] text-black' : 'bg-black/50'}`}>{hasCellulite && '✓'}</div>
                           </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 👈 أزرار التنقل (Next / Prev) */}
                  <div className="p-5 border-t border-white/5 bg-black/60 shrink-0 flex gap-3">
                     {step > 1 && step < 4 && (
                       <button onClick={() => setStep(step - 1)} className="px-5 py-4 rounded-xl font-bold text-white bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2">
                         <ChevronRight size={18}/>
                       </button>
                     )}
                     
                     {step === 4 ? (
                       <button onClick={handleClose} className="btn-glow btn-glow-gold w-full py-4 rounded-xl font-black text-lg shadow-lg">حفظ التكوين وإغلاق</button>
                     ) : (
                       <button onClick={() => step < 3 ? setStep(step + 1) : startBuildingAvatar()} className="flex-1 btn-glow btn-glow-gold py-4 rounded-xl font-black shadow-lg flex justify-center items-center gap-2 border-none">
                         {step < 3 ? 'التالي للحفظ المؤقت' : 'تأكيد وحفظ المجسم'} {step < 3 ? <ChevronLeft size={18}/> : <Sparkles size={18}/>}
                       </button>
                     )}
                  </div>
                </div>

                {/* 👈 منطقة عرض المجسم المباشر (تأخذ باقي الشاشة، وتم ضبط الإضاءة والخلفية فيها) */}
                <div className="flex-1 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0a160d] to-black flex items-center justify-center min-h-[40vh]">
                  <Avatar3D 
                    gender={avatarGender} weight={avatarWeight} height={avatarHeight} skinTone={avatarSkinTone}
                    bellyRound={morphs.bellyRound / 100} bellyLower={morphs.bellyLower / 100} bellyUpper={morphs.bellyUpper / 100}
                    loveHandles={morphs.loveHandles / 100} doubleChin={morphs.doubleChin / 100} chestSag={morphs.chestSag / 100}
                    armsFat={morphs.armsFat / 100} armsSag={morphs.armsSag / 100} thighsFat={morphs.thighsFat / 100}
                    calvesFat={morphs.calvesFat / 100} glutesFat={morphs.glutesFat / 100}
                    hasStretchMarks={hasStretchMarks} hasCellulite={hasCellulite}
                  />
                  <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#8DC63F]/20 flex items-center gap-3 z-10">
                    <div className="w-2 h-2 bg-[#8DC63F] rounded-full animate-pulse shadow-[0_0_8px_#8DC63F]"></div>
                    <span className="text-white font-bold text-xs tracking-wider">LIVE PREVIEW</span>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(BodySimulator);