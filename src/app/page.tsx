"use client";
import { useState } from 'react';
import Link from 'next/link';
import { 
  Activity, Brain, ChevronLeft, Send, Calculator, 
  CalendarDays, Wallet, Stethoscope, Star, Quote, 
  Phone, Mail, Info, Sparkles, Play
} from 'lucide-react';
import BodySimulator from '@/components/BodySimulator';

type UserRole = 'guest' | 'patient' | 'doctor';

export default function HomePage() {
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [chatInput, setChatInput] = useState("");
  const [bmiResult, setBmiResult] = useState<number>(27.5);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  return (
    // ضبط المساحات العلوية للموبايل والشاشات الكبيرة
    <div className="w-full max-w-[1500px] mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-20">
      
      {/* ===================== أزرار التبديل (ريسبونسيف 100%) ===================== */}
      <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8 md:mb-12 bg-black/40 p-3 rounded-xl border border-white/10 w-max mx-auto md:mx-0 animate-[fadeIn_0.5s_ease-out]">
        <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-white">
          <input type="radio" name="role" checked={userRole === 'guest'} onChange={() => setUserRole('guest')} className="accent-[#8DC63F]" /> زائر (ضيف)
        </label>
        <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-white">
          <input type="radio" name="role" checked={userRole === 'patient'} onChange={() => setUserRole('patient')} className="accent-[#8DC63F]" /> مريض
        </label>
        <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-[#f1c40f]">
          <input type="radio" name="role" checked={userRole === 'doctor'} onChange={() => setUserRole('doctor')} className="accent-[#f1c40f]" /> دكتور (إدارة)
        </label>
      </div>

      {/* ===================== Hero Area ===================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-32">
          
        {/* العمود الأول */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="mb-2 min-h-[140px] text-center md:text-right">
            {userRole === 'doctor' ? (
              <>
                <h1 className="text-3xl md:text-5xl font-black leading-[1.3] mb-6 drop-shadow-lg text-white animate-[fadeIn_0.3s_ease-out]">
                  مرحباً بك<br/>
                  <span className="font-light italic text-[#f1c40f]">يا دكتور!</span>
                </h1>
                <Link href="/doctor" className="bg-[#f1c40f] hover:bg-[#d4ac0d] text-black px-8 py-3.5 rounded-full font-black shadow-lg text-sm flex items-center justify-center gap-2 w-full md:w-max border-none transition-colors">
                  <Stethoscope size={18} /> فتح لوحة التحكم
                </Link>
              </>
            ) : userRole === 'patient' ? (
              <>
                <h1 className="text-3xl md:text-5xl font-black leading-[1.3] mb-6 drop-shadow-lg text-white animate-[fadeIn_0.3s_ease-out]">
                  مرحباً بعودتك،<br/>
                  <span className="font-light italic text-[#8DC63F]">أحمد علي</span>
                </h1>
                <Link href="/patient" className="btn-glow btn-glow-gold px-8 py-3.5 rounded-full font-bold shadow-lg text-sm flex items-center justify-center gap-2 w-full md:w-max border-none">
                  <Activity size={18} /> الانتقال لبوابتك
                </Link>
              </>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-black leading-[1.3] mb-6 drop-shadow-lg text-white animate-[fadeIn_0.3s_ease-out]">
                  اعرف مؤشراتك<br/>
                  <span className="font-light italic text-[#8DC63F]">الصحية الآن</span>
                </h1>
                <button className="btn-glow btn-glow-gold px-8 py-3.5 rounded-full font-bold shadow-lg text-base flex items-center justify-center gap-2 w-full md:w-max border-none">
                  <Calculator size={20} /> ابدأ التقييم
                </button>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-[24px] p-6 flex flex-col justify-between min-h-[150px]">
              <div className="flex justify-between items-center font-bold mb-1 text-base text-white">مستوى الالتزام</div>
              <div className="mt-4 relative z-10">
                {userRole === 'patient' ? (
                  <div className="text-3xl font-black text-[#8DC63F]">85%</div>
                ) : (
                  <>
                    <p className="text-xs text-green-100/80 mb-3 leading-relaxed">سجل بياناتك لمعرفة نسبة التزامك.</p>
                    <Link href="/login" className="w-full bg-white/5 hover:bg-white/10 py-2.5 rounded-xl text-xs font-bold border border-white/10 transition-all text-white block text-center">سجل دخولك</Link>
                  </>
                )}
              </div>
            </div>
            <div className="glass-card rounded-[24px] p-6 flex flex-col justify-between min-h-[150px]">
              <div className="flex justify-between items-center font-bold mb-1 text-base text-white">معدل النشاط</div>
              <div className="mt-4 relative z-10">
                {userRole === 'patient' ? (
                  <div className="text-2xl font-black text-white">ممتاز</div>
                ) : (
                  <>
                    <p className="text-xs text-green-100/80 mb-3 leading-relaxed">اكتشف معدل حرق السعرات اليومي.</p>
                    <button className="w-full bg-white/5 hover:bg-[#8DC63F] hover:text-[#030805] border border-white/10 py-2.5 rounded-xl text-xs font-bold transition-all text-white">احجز استشارة</button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[24px] p-6 flex flex-col gap-4">
            <div className="flex items-start gap-4 relative z-10">
              <div className="flex-1">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-2 text-white drop-shadow-md">
                  <Brain size={20} className="text-[#8DC63F]"/> المساعد الذكي
                </h3>
                <p className="text-xs text-green-100/80 leading-relaxed">
                  {userRole === 'guest' ? 'سجل دخولك للبدء في المراجعة الذكية لحالتك.' : 'مرحباً بك! أنا مساعد سيرا الذكي، كيف يمكنني مساعدتك؟'}
                </p>
              </div>
              <div className="w-14 h-14 ai-brain rounded-full flex-shrink-0 border-2 border-[#8DC63F]/40 cursor-pointer hidden sm:block"></div>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="relative w-full mt-2 z-10">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-full border border-white/5"></div>
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="اكتب رسالتك للمساعد الذكي..." className="relative w-full bg-transparent px-5 py-3.5 pr-12 text-white placeholder-white/40 outline-none text-xs font-bold z-10" disabled={userRole === 'guest'} />
              <button disabled={userRole === 'guest'} className="absolute right-1.5 top-1.5 bottom-1.5 w-10 bg-white/10 hover:bg-[#8DC63F] hover:text-black rounded-full flex items-center justify-center text-white/30 z-20 transition-colors"><Send size={16} className="mr-1" /></button>
            </form>
          </div>
        </div>

        {/* العمود الأوسط */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="glass-card rounded-[24px] p-6 flex flex-col justify-center min-h-[200px]">
             <div className="flex justify-between items-start mb-2 relative z-10">
               <div>
                 <h3 className="font-bold text-lg drop-shadow-md text-white">مؤشر كتلة الجسم</h3>
                 <span className="text-[#8DC63F] text-xs font-bold tracking-wider">BMI INDEX</span>
               </div>
               <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-lg"><Activity size={20} className="text-[#8DC63F]" /></div>
             </div>
             <div className="mt-6 flex flex-col items-center text-center relative z-10">
                 <button className="btn-glow btn-glow-gold w-full font-bold py-3.5 rounded-xl text-sm flex justify-center gap-2 border-none"><Calculator size={18}/> احسب مؤشرك الآن</button>
             </div>
          </div>

          <div className="glass-card rounded-[24px] p-6 flex-1 flex flex-col justify-center gap-3">
             <h3 className="font-bold text-base text-white text-center mb-2 drop-shadow-md relative z-10">الخدمات السريعة</h3>
             <button className="w-full flex justify-between items-center bg-white/5 hover:bg-white/10 text-white px-4 py-3.5 rounded-xl text-sm font-bold transition-all border border-white/10 shadow-sm group relative z-10"><div className="flex items-center gap-3"><Stethoscope size={18} className="text-[#8DC63F]"/> التشخيص السريع</div><ChevronLeft size={16}/></button>
             <button className="w-full flex justify-between items-center bg-white/5 hover:bg-white/10 text-white px-4 py-3.5 rounded-xl text-xs font-bold border border-white/10 transition-all group relative z-10"><div className="flex items-center gap-3"><Wallet size={18} className="text-[#8DC63F]"/> صمم برنامجك</div><ChevronLeft size={16}/></button>
             <button className="w-full flex justify-between items-center bg-white/5 hover:bg-white/10 text-white px-4 py-3.5 rounded-xl text-xs font-bold border border-white/10 transition-all group relative z-10"><div className="flex items-center gap-3"><CalendarDays size={18} className="text-[#8DC63F]"/> حجز موعد جديد</div><ChevronLeft size={16}/></button>
          </div>
        </div>

        {/* العمود الأخير (محاكي الـ 3D - تم ضبط ارتفاعه للموبايل) */}
        <div className="lg:col-span-4 flex flex-col gap-6 min-h-[450px]">
          <div className="glass-card rounded-[24px] p-6 h-[85px] flex flex-col justify-center">
            <h3 className="font-bold text-lg drop-shadow-md text-white">المحاكي الفيزيائي</h3>
            <p className="text-[11px] text-[#8DC63F] mt-1">قم بتخصيص المجسم ثلاثي الأبعاد</p>
          </div>
          <BodySimulator 
            bmiResult={bmiResult} 
            showAvatarModal={showAvatarModal}
            setShowAvatarModal={setShowAvatarModal}
          />
        </div>
      </section>

      {/* باقي السكاشن كما هي تماماً */}
      <section className="mb-40 relative z-20 w-full mt-10">
        <div className="flex flex-col items-center text-center mb-14">
           <span className="text-[#8DC63F] text-[10px] font-black tracking-[0.2em] uppercase bg-[#8DC63F]/10 px-4 py-1.5 rounded-full border border-[#8DC63F]/30 mb-4">CERRAH REELS</span>
           <h2 className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-xl">
              ماذا يقول <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8DC63F] to-[#4CAF50]">الأطباء</span>؟
           </h2>
           <p className="text-green-100/80 font-bold text-sm md:text-base max-w-xl">نصائح طبية موثوقة وقصص نجاح ملهمة مباشرة من طاقم أطباء سيرا.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
           {[
             { id: 1, name: "د. أحمد كمال", role: "أخصائي العلاج الطبيعي", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop" },
             { id: 2, name: "د. سارة منير", role: "أخصائية التغذية العلاجية", image: "https://images.unsplash.com/photo-1594824416560-631ce030043c?q=80&w=400&auto=format&fit=crop" },
             { id: 3, name: "د. مصطفى محمود", role: "استشاري السمنة والنحافة", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop" }
           ].map((doc) => (
             <div key={doc.id} className="glass-card relative rounded-[28px] overflow-hidden aspect-[9/13] group cursor-pointer hover:border-[#8DC63F]/40 transition-all duration-500 hover:-translate-y-2 !p-0">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 group-hover:opacity-60 transition-opacity duration-500 grayscale group-hover:grayscale-0 z-0" style={{ backgroundImage: `url(${doc.image})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#030805] via-[#030805]/50 to-transparent z-10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                   <div className="w-14 h-14 bg-gradient-to-tr from-[#8DC63F] to-[#4CAF50] rounded-full flex items-center justify-center text-[#030805] shadow-[0_0_25px_rgba(141,198,63,0.3)] group-hover:scale-110 transition-all duration-300">
                     <Play fill="currentColor" size={22} className="ml-1" />
                   </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 z-20 transform group-hover:translate-y-[-5px] transition-transform duration-300">
                   <h4 className="text-white font-extrabold text-xl drop-shadow-md mb-1">{doc.name}</h4>
                   <p className="text-[#8DC63F] text-xs font-bold tracking-wide">{doc.role}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="mb-40 flex flex-col md:flex-row gap-12 items-center relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <Info className="text-[#8DC63F]" size={26} />
            <h2 className="text-2xl font-extrabold text-white">عن عيادة سيرا <span className="text-[#8DC63F]">CERRAH</span></h2>
          </div>
          <p className="text-green-100/90 text-sm md:text-base leading-relaxed mb-8 font-semibold">
            نحن في سيرا نؤمن بأن التعافي والوصول للوزن المثالي هو رحلة متكاملة. ندمج بين أحدث أجهزة العلاج الطبيعي والتخسيس الموضعي، وبين أنظمة التغذية العلاجية الذكية التي تناسب نمط حياتك.
          </p>
          <div className="flex gap-4">
            <div className="glass-card rounded-[20px] p-5 text-center min-w-[120px]">
              <h4 className="text-2xl font-extrabold text-white mb-1">+5000</h4>
              <p className="text-xs text-green-100/80 font-bold">قصة نجاح</p>
            </div>
            <div className="glass-card rounded-[20px] p-5 text-center min-w-[120px]">
              <h4 className="text-2xl font-extrabold text-white mb-1">10+</h4>
              <p className="text-xs text-green-100/80 font-bold">أجهزة متطورة</p>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full h-[340px] glass-card rounded-[32px] overflow-hidden relative border border-[#8DC63F]/10 shadow-[0_0_30px_rgba(141,198,63,0.05)]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700"></div>
        </div>
      </section>

      <section className="mb-40 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-white mb-3">أحدث التقنيات والأجهزة الطبية</h2>
          <p className="text-green-100/80 font-bold text-sm md:text-base">نستخدم أحدث التقنيات العالمية لضمان أفضل النتائج في رحلة علاجك.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['جهاز Scizer لتفتيت الدهون', 'جهاز Microwave لشد الترهلات', 'جلسات Mesotherapy'].map((device, i) => (
            <div key={i} className="glass-card p-8 rounded-[28px] flex flex-col items-center text-center group cursor-pointer hover:border-[#8DC63F]/30">
              <div className="w-20 h-20 rounded-full bg-black/40 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#8DC63F]/50 transition-all">
                <Sparkles size={28} className="text-[#8DC63F]" />
              </div>
              <h3 className="text-lg font-extrabold text-white mb-2">{device}</h3>
              <p className="text-xs text-green-100/70 font-semibold mb-6 leading-relaxed">تقنية متطورة توفر نتائج ملحوظة بأعلى درجات الأمان والراحة من الجلسة الأولى.</p>
              <button className="bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 group-hover:bg-[#8DC63F] group-hover:text-black transition-all">اكتشف المزيد <ChevronLeft size={14}/></button>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-40 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-white mb-3">تجارب وقصص نجاح</h2>
          <p className="text-green-100/80 font-bold text-sm md:text-base">آراء عملائنا بعد رحلة التعافي والتغيير.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8 md:p-10 rounded-[32px] relative overflow-hidden">
            <Quote size={60} className="absolute -top-2 -left-2 text-white/5 z-0 rotate-180" />
            <div className="flex gap-1 text-[#f1c40f] mb-5 relative z-10">{[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
            <p className="text-white text-base md:text-lg leading-relaxed mb-8 font-semibold relative z-10">"نظام المتابعة الأونلاين والذكاء الاصطناعي شجعني جداً على الالتزام، ووصلت لنتيجة مبهرة في شهرين بس!"</p>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-tr from-[#8DC63F] to-[#4CAF50] rounded-full flex items-center justify-center font-black text-black text-lg shadow-sm">م.س</div>
              <div><h4 className="font-extrabold text-white text-base">محمود سيد</h4><p className="text-[11px] text-[#8DC63F] font-bold mt-0.5">خطة مكثفة - تخسيس</p></div>
            </div>
          </div>
          <div className="glass-card p-8 md:p-10 rounded-[32px] relative overflow-hidden">
            <Quote size={60} className="absolute -top-2 -left-2 text-white/5 z-0 rotate-180" />
            <div className="flex gap-1 text-[#f1c40f] mb-5 relative z-10">{[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
            <p className="text-white text-base md:text-lg leading-relaxed mb-8 font-semibold relative z-10">"المجسم التفاعلي ساعدني أوضح للدكتور مكان الألم بالظبط، والجلسات كانت مريحة جداً بفضل الأجهزة الحديثة."</p>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-tr from-[#8DC63F] to-[#4CAF50] rounded-full flex items-center justify-center font-black text-black text-lg shadow-sm">س.أ</div>
              <div><h4 className="font-extrabold text-white text-base">سارة أحمد</h4><p className="text-[11px] text-[#8DC63F] font-bold mt-0.5">علاج طبيعي للعمود الفقري</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-[32px] p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-extrabold text-white mb-3 drop-shadow-md">اشترك في نشرتنا الصحية</h2>
          <p className="text-green-100/80 text-sm mb-8 leading-relaxed font-semibold">احصل على أحدث النصائح الطبية، أنظمة الدايت، وعروض العيادة مباشرة على بريدك الإلكتروني.</p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="البريد الإلكتروني..." className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-3.5 text-white outline-none focus:border-[#8DC63F]/50 transition-all font-semibold text-sm" />
            <button className="btn-glow btn-glow-gold px-8 py-3.5 rounded-xl font-bold shadow-md whitespace-nowrap border-none text-sm">اشترك الآن</button>
          </form>
        </div>
        <div className="glass-card rounded-[32px] p-8 md:p-10">
          <h2 className="text-2xl font-extrabold text-white mb-6 drop-shadow-md">تواصل معنا</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/5 hover:border-[#8DC63F]/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#8DC63F]/10 flex items-center justify-center border border-[#8DC63F]/20"><Phone size={20} className="text-[#8DC63F]"/></div>
              <div><p className="text-[11px] text-green-100/60 font-bold mb-1">رقم الهاتف للحجز</p><p className="font-black text-lg text-white" dir="ltr">+20 110 808 0564</p></div>
            </div>
            <div className="flex items-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/5 hover:border-[#8DC63F]/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#8DC63F]/10 flex items-center justify-center border border-[#8DC63F]/20"><Mail size={20} className="text-[#8DC63F]"/></div>
              <div><p className="text-[11px] text-green-100/60 font-bold mb-1">البريد الإلكتروني</p><p className="font-black text-lg text-white">info@cerrah.com</p></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}