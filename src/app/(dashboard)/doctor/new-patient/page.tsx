"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useClinic, Patient } from '@/context/ClinicContext';
import { 
  UserPlus, QrCode, Printer, MessageCircle, Save, 
  CheckCircle, ArrowRight, User, FileText, Activity 
} from 'lucide-react';

export default function NewPatientPage() {
  const { addPatient } = useClinic();
  
  // حالات النموذج (Form States)
  const [step, setStep] = useState<1 | 2>(1); // 1: إدخال البيانات، 2: نجاح التسجيل
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredPatient, setRegisteredPatient] = useState<Patient | null>(null);

  // بيانات المريض
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [weight, setWeight] = useState(80);
  const [height, setHeight] = useState(165);
  const [dietTemplate, setDietTemplate] = useState('');
  const [notes, setNotes] = useState('');

  // دالة الحفظ وإضافة المريض للـ Context
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // محاكاة وقت التحميل
    setTimeout(() => {
      const newId = Date.now().toString();
      const newPatient: Patient = {
        id: newId,
        name,
        phone,
        qrCodeUrl: `https://cerrah.com/p/${newId}`,
        diet: dietTemplate ? { id: `d_${newId}`, name: dietTemplate, instructions: notes } : null,
        sessions: [], // لا يوجد جلسات عند التسجيل
        avatarProps: {
          gender, weight, height,
          skinTone: '#fcdbc4', bellyRound: 0.5, bellyLower: 0.3, bellyUpper: 0.2,
          loveHandles: 0.3, doubleChin: 0.1, chestSag: 0.1, armsFat: 0.2, armsSag: 0.1,
          thighsFat: 0.3, calvesFat: 0.2, glutesFat: 0.2, hasStretchMarks: false, hasCellulite: false
        }
      };

      addPatient(newPatient); // 👈 هنا بنرمي البيانات في الـ Context عشان تُسمّع في الموقع كله
      setRegisteredPatient(newPatient);
      setIsSubmitting(false);
      setStep(2); // الانتقال لشاشة النجاح والطباعة
    }, 1500);
  };

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
          <UserPlus className="text-[#8DC63F]" size={32} /> تسجيل مريض جديد
        </h1>
        <p className="text-green-100/70 font-bold text-sm">إضافة ملف شامل للمريض يشمل المجسم الأولي والنظام الغذائي.</p>
      </div>

      {step === 1 ? (
        <form onSubmit={handleRegister} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* العمود الأول: البيانات الأساسية والمجسم */}
          <div className="flex flex-col gap-6">
            <div className="glass-card p-6 md:p-8 rounded-[24px]">
              <h3 className="text-xl font-black text-white mb-6 border-b border-white/5 pb-4 flex items-center gap-2">
                <User size={20} className="text-[#8DC63F]"/> البيانات الأساسية
              </h3>
              
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-bold text-green-100/60 mb-2">الاسم الثنائي</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: أحمد محمود" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#8DC63F]/50 font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-green-100/60 mb-2">رقم التليفون (واتساب)</label>
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01X XXXX XXXX" dir="ltr" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#8DC63F]/50 font-bold text-right" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="block text-xs font-bold text-green-100/60 mb-2">الوزن الأولي (كجم)</label>
                    <input type="number" required value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#8DC63F]/50 font-bold text-center" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-green-100/60 mb-2">الطول (سم)</label>
                    <input type="number" required value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#8DC63F]/50 font-bold text-center" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-green-100/60 mb-2">النوع (لتهيئة المجسم)</label>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setGender('male')} className={`flex-1 py-3 rounded-xl font-bold transition-all border ${gender === 'male' ? 'bg-[#8DC63F]/20 border-[#8DC63F] text-[#8DC63F]' : 'bg-black/40 border-white/5 text-white/60 hover:bg-white/5'}`}>ذكر</button>
                    <button type="button" onClick={() => setGender('female')} className={`flex-1 py-3 rounded-xl font-bold transition-all border ${gender === 'female' ? 'bg-[#8DC63F]/20 border-[#8DC63F] text-[#8DC63F]' : 'bg-black/40 border-white/5 text-white/60 hover:bg-white/5'}`}>أنثى</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* العمود الثاني: الروشتة المبدئية والاعتماد */}
          <div className="flex flex-col gap-6">
            <div className="glass-card p-6 md:p-8 rounded-[24px] flex-1 flex flex-col">
              <h3 className="text-xl font-black text-white mb-6 border-b border-white/5 pb-4 flex items-center gap-2">
                <FileText size={20} className="text-[#8DC63F]"/> الروشتة المبدئية
              </h3>
              
              <div className="flex flex-col gap-5 flex-1">
                <div>
                  <label className="block text-xs font-bold text-green-100/60 mb-2">النظام الغذائي المقترح</label>
                  <select value={dietTemplate} onChange={(e) => setDietTemplate(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#8DC63F]/50 font-bold appearance-none cursor-pointer">
                    <option value="">-- بدون نظام غذائي الآن --</option>
                    <option value="دايت كيتو (مبتدئين)">دايت كيتو (مبتدئين)</option>
                    <option value="صيام متقطع (16/8)">صيام متقطع (16/8)</option>
                    <option value="تخسيس سريع (لو كارب)">تخسيس سريع (لو كارب)</option>
                  </select>
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="block text-xs font-bold text-green-100/60 mb-2">تعليمات وأدوية (تطبع في الروشتة)</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="مثال: شرب 3 لتر ماء يومياً..." className="w-full flex-1 min-h-[120px] bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#8DC63F]/50 font-semibold text-sm resize-none"></textarea>
                </div>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full btn-glow btn-glow-gold py-5 rounded-2xl font-black text-lg border-none flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <><Activity size={24} className="animate-spin" /> جاري إنشاء الملف والمجسم...</>
              ) : (
                <><Save size={24} /> اعتماد وتسجيل المريض</>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* ================= شاشة النجاح (بعد التسجيل) ================= */
        <div className="glass-card p-8 md:p-12 rounded-[32px] max-w-3xl mx-auto text-center border border-[#8DC63F]/30 shadow-[0_0_50px_rgba(141,198,63,0.1)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8DC63F]/10 to-transparent pointer-events-none"></div>
          
          <CheckCircle size={80} className="text-[#8DC63F] mx-auto mb-6 relative z-10" />
          <h2 className="text-3xl font-black text-white mb-2 relative z-10">تم تسجيل المريض بنجاح!</h2>
          <p className="text-green-100/70 font-bold mb-10 relative z-10">تم تهيئة المجسم 3D وإنشاء حساب للمريض: <span className="text-[#8DC63F]">{registeredPatient?.name}</span></p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-10">
            <div className="bg-black/50 border border-white/10 rounded-2xl p-6 flex flex-col items-center">
              <p className="text-sm font-bold text-white mb-4">كود دخول المريض (QR)</p>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${registeredPatient?.qrCodeUrl}&color=030604`} alt="QR Code" className="w-32 h-32 rounded-lg mb-4 bg-white p-2" />
              <button className="bg-white/10 hover:bg-white/20 text-white w-full py-2.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors text-xs">
                <QrCode size={16} /> تحميل كصورة
              </button>
            </div>
            
            <div className="flex flex-col gap-4 justify-center">
              <button className="btn-glow btn-glow-gold w-full py-4 rounded-xl font-black text-black border-none flex justify-center items-center gap-2">
                <Printer size={18} /> طباعة الروشتة PDF
              </button>
              <a href={`https://wa.me/2${registeredPatient?.phone}?text=مرحباً بك في عيادة سيرا! لمتابعة خطتك والمجسم الخاص بك، استخدم هذا الرابط: ${registeredPatient?.qrCodeUrl}`} target="_blank" rel="noreferrer" className="bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 w-full py-4 rounded-xl font-black flex justify-center items-center gap-2 transition-colors">
                <MessageCircle size={18} /> إرسال الروشتة واتساب
              </a>
            </div>
          </div>

          <Link href="/doctor" className="inline-flex items-center gap-2 text-white/50 hover:text-white font-bold transition-colors relative z-10">
            الانتقال لقائمة العملاء <ArrowRight size={16} />
          </Link>
        </div>
      )}

    </div>
  );
}