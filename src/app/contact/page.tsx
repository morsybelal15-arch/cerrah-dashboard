"use client";
import React from 'react';
import { Activity, Apple, Dumbbell, Sparkles, Zap, Syringe, CalendarDays } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 md:px-8 mt-24 mb-20 animate-[fadeIn_0.5s_ease-out]">
      
      {/* هيدر الخدمات */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="w-16 h-16 mx-auto bg-[#8DC63F]/10 border border-[#8DC63F]/30 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(141,198,63,0.1)]">
          <Sparkles size={32} className="text-[#8DC63F]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-lg leading-tight">
          خدمات طبية متطورة <br />
          <span className="text-[#8DC63F]">لصياغة نسختك الأفضل</span>
        </h1>
        <p className="text-green-100/80 font-semibold text-base md:text-lg leading-relaxed">
          نقدم لك منظومة علاجية متكاملة تبدأ من التشخيص الدقيق عبر المحاكي الفيزيائي، مروراً بالعلاج الطبيعي المتخصص، وصولاً إلى تنسيق القوام بأحدث تقنيات تفتيت الدهون في العالم.
        </p>
      </div>

      {/* الخدمات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
        <div className="glass-card p-8 rounded-[32px] flex flex-col group hover:border-[#8DC63F]/40 transition-colors">
          <div className="flex-1">
            <div className="w-14 h-14 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center mb-6 text-[#8DC63F] group-hover:scale-110 transition-transform">
              <Activity size={28} />
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-4">العلاج الطبيعي والتأهيل</h3>
            <p className="text-sm text-green-100/70 font-semibold leading-relaxed mb-8">
              بروتوكولات علاجية متطورة لإصابات الملاعب، آلام العمود الفقري، والمفاصل. نستخدم أجهزة متقدمة لتسريع الاستشفاء وتقليل الألم من الجلسة الأولى.
            </p>
          </div>
          <button className="w-full bg-white/5 hover:bg-[#8DC63F] hover:text-black border border-white/10 px-5 py-3.5 rounded-xl text-sm font-bold transition-all text-white flex justify-center items-center gap-2">
            احجز استشارة <CalendarDays size={16}/>
          </button>
        </div>

        <div className="glass-card p-8 rounded-[32px] flex flex-col group hover:border-[#8DC63F]/40 transition-colors">
          <div className="flex-1">
            <div className="w-14 h-14 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center mb-6 text-[#8DC63F] group-hover:scale-110 transition-transform">
              <Apple size={28} />
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-4">التغذية العلاجية</h3>
            <p className="text-sm text-green-100/70 font-semibold leading-relaxed mb-8">
              خطط غذائية مخصصة بناءً على تحليل مكونات الجسم (InBody) ومؤشر كتلة الجسم (BMI). نصمم لك نظاماً يحقق أهدافك بدون حرمان قاسي.
            </p>
          </div>
          <button className="w-full bg-white/5 hover:bg-[#8DC63F] hover:text-black border border-white/10 px-5 py-3.5 rounded-xl text-sm font-bold transition-all text-white flex justify-center items-center gap-2">
            احجز استشارة <CalendarDays size={16}/>
          </button>
        </div>

        <div className="glass-card p-8 rounded-[32px] flex flex-col group hover:border-[#8DC63F]/40 transition-colors">
          <div className="flex-1">
            <div className="w-14 h-14 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center mb-6 text-[#8DC63F] group-hover:scale-110 transition-transform">
              <Dumbbell size={28} />
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-4">نحت القوام وتفتيت الدهون</h3>
            <p className="text-sm text-green-100/70 font-semibold leading-relaxed mb-8">
              بدائل العمليات الجراحية للوصول للقوام المثالي. نعتمد على تدمير الخلايا الدهنية الموضعية وشد الجلد بتقنيات غير الغازية (Non-Invasive).
            </p>
          </div>
          <button className="w-full bg-white/5 hover:bg-[#8DC63F] hover:text-black border border-white/10 px-5 py-3.5 rounded-xl text-sm font-bold transition-all text-white flex justify-center items-center gap-2">
            احجز استشارة <CalendarDays size={16}/>
          </button>
        </div>
      </div>

      {/* التكنولوجيا الحصرية */}
      <div className="mb-32">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[#8DC63F] mb-4">أجهزة وتكنولوجيا حصرية</h2>
          <p className="text-green-100/70 font-semibold text-lg">لا نعتمد على الطرق التقليدية، بل استثمرنا في تكنولوجيا الجيل القادم لضمان نتائج مبهرة تلاحظها من المقاسات الأولى.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="glass-card p-8 rounded-[28px] border-t-2 border-t-[#8DC63F]/50">
            <Zap size={32} className="text-[#8DC63F] mx-auto mb-4" />
            <h3 className="text-xl font-extrabold text-white mb-3">جهاز Scizer</h3>
            <p className="text-xs text-green-100/60 font-semibold leading-relaxed">يعمل بتقنية الموجات فوق الصوتية المركزة (HIFU) لتدمير الخلايا الدهنية العنيدة في مناطق البطن والأجناب بفعالية وأمان تام.</p>
          </div>
          
          <div className="glass-card p-8 rounded-[28px] border-t-2 border-t-[#8DC63F]/50">
            <Activity size={32} className="text-[#8DC63F] mx-auto mb-4" />
            <h3 className="text-xl font-extrabold text-white mb-3">جهاز Microwave (Onda)</h3>
            <p className="text-xs text-green-100/60 font-semibold leading-relaxed">التقنية الأحدث عالمياً لشد الترهلات العميقة وعلاج السيلوليت المتقدم عبر موجات الميكروويف الباردة التي تستهدف الدهون دون حرق الجلد.</p>
          </div>

          <div className="glass-card p-8 rounded-[28px] border-t-2 border-t-[#8DC63F]/50">
            <Syringe size={32} className="text-[#8DC63F] mx-auto mb-4" />
            <h3 className="text-xl font-extrabold text-white mb-3">حقن الميزوثيرابي</h3>
            <p className="text-xs text-green-100/60 font-semibold leading-relaxed">كوكتيل طبي من الفيتامينات والإنزيمات يُحقن موضعياً لتسريع معدل الحرق في المناطق التي لا تستجيب للدايت والرياضة.</p>
          </div>
        </div>
      </div>

      {/* Call To Action */}
      <div className="glass-card rounded-[40px] p-12 text-center relative overflow-hidden border border-[#8DC63F]/20 shadow-[0_0_50px_rgba(141,198,63,0.1)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8DC63F]/10 to-transparent pointer-events-none"></div>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">هل أنت مستعد لبدء التحول؟</h2>
        <p className="text-green-100/80 font-semibold text-lg max-w-2xl mx-auto mb-10 relative z-10">
          لا تنتظر طويلاً.. احجز استشارتك المبدئية الآن، وسيقوم فريقنا الطبي بتقييم حالتك باستخدام المحاكي الذكي لتصميم خطتك المخصصة.
        </p>
        <Link href="/contact" className="btn-glow btn-glow-gold px-10 py-4 rounded-xl font-black shadow-lg flex items-center justify-center gap-3 w-max mx-auto border-none relative z-10 text-lg">
          <CalendarDays size={20}/> احجز موعدك الآن
        </Link>
      </div>

    </div>
  );
}