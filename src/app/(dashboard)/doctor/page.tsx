"use client";
import React, { useState, useEffect } from 'react';
import { useClinic, Patient, Session, Diet } from '@/context/ClinicContext';
import { 
  Search, MessageCircle, ChevronLeft, CalendarDays, FileText, User, 
  Plus, Edit2, Trash2, CheckCircle2, Clock, X, Save, Sliders
} from 'lucide-react';
import CerrahAvatar from '@/components/CerrahAvatar';

export default function DoctorPatientsPage() {
  const { patients, updatePatient } = useClinic();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const selectedPatient = patients.find(p => p.id === selectedPatientId) || null;

  // ===== حالات النوافذ المنبثقة (Modals) =====
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  
  // تحديد النوع بصرامة هنا لـ TypeScript
  const [sessionForm, setSessionForm] = useState<{
    device: string;
    date: string;
    duration: number;
    status: 'upcoming' | 'completed';
  }>({
    device: 'جهاز Microwave (Onda)',
    date: new Date().toISOString().slice(0, 16),
    duration: 30,
    status: 'upcoming'
  });

  const [isDietModalOpen, setIsDietModalOpen] = useState(false);
  const [dietForm, setDietForm] = useState({ name: '', instructions: '' });

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [tempAvatarProps, setTempAvatarProps] = useState<any>(null);

  useEffect(() => {
    if (selectedPatient) {
      setTempAvatarProps(selectedPatient.avatarProps);
    }
  }, [selectedPatientId, selectedPatient]);

  // ================= دوال إدارة الجلسات =================
  const handleOpenAddSession = () => {
    setEditingSessionId(null);
    setSessionForm({
      device: 'جهاز Microwave (Onda)',
      date: new Date().toISOString().slice(0, 16),
      duration: 30,
      status: 'upcoming'
    });
    setIsSessionModalOpen(true);
  };

  const handleOpenEditSession = (session: Session) => {
    setEditingSessionId(session.id);
    setSessionForm({
      device: session.device,
      date: session.date,
      duration: session.duration,
      status: session.status
    });
    setIsSessionModalOpen(true);
  };

  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    // بناء الكائن بشكل صريح ومطابق لـ Session 100% لإرضاء TypeScript
    const newOrUpdatedSession: Session = {
      id: editingSessionId ? editingSessionId : Date.now().toString(),
      device: sessionForm.device,
      date: sessionForm.date,
      duration: sessionForm.duration,
      status: sessionForm.status as 'upcoming' | 'completed'
    };

    let updatedSessions: Session[];
    if (editingSessionId) {
      updatedSessions = selectedPatient.sessions.map(s => 
        s.id === editingSessionId ? newOrUpdatedSession : s
      );
    } else {
      updatedSessions = [newOrUpdatedSession, ...selectedPatient.sessions];
    }

    updatePatient(selectedPatient.id, { sessions: updatedSessions });
    setIsSessionModalOpen(false);
  };

  const handleDeleteSession = (sessionId: string) => {
    if (!selectedPatient) return;
    const updated = selectedPatient.sessions.filter(s => s.id !== sessionId);
    updatePatient(selectedPatient.id, { sessions: updated });
  };

  const handleToggleSessionStatus = (session: Session) => {
    if (!selectedPatient) return;
    const nextStatus: 'upcoming' | 'completed' = session.status === 'completed' ? 'upcoming' : 'completed';
    const updated = selectedPatient.sessions.map(s => 
      s.id === session.id ? { ...s, status: nextStatus } : s
    );
    updatePatient(selectedPatient.id, { sessions: updated });
  };

  // ================= دوال إدارة الروشتة والنظام الغذائي =================
  const handleOpenDietModal = () => {
    if (selectedPatient?.diet) {
      setDietForm({ name: selectedPatient.diet.name, instructions: selectedPatient.diet.instructions });
    } else {
      setDietForm({ name: 'دايت كيتو (مبتدئين)', instructions: 'شرب 3 لتر ماء يومياً والالتزام بمواعيد الوجبات.' });
    }
    setIsDietModalOpen(true);
  };

  const handleSaveDiet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;
    const newDiet: Diet = {
      id: Date.now().toString(),
      name: dietForm.name,
      instructions: dietForm.instructions
    };
    updatePatient(selectedPatient.id, { diet: newDiet });
    setIsDietModalOpen(false);
  };

  const handleDeleteDiet = () => {
    if (!selectedPatient) return;
    updatePatient(selectedPatient.id, { diet: null });
  };

  // ================= حفظ تعديلات المجسم 3D =================
  const handleSaveAvatarProps = () => {
    if (!selectedPatient || !tempAvatarProps) return;
    updatePatient(selectedPatient.id, { avatarProps: tempAvatarProps });
    setIsAvatarModalOpen(false);
  };

  // ================= الفلترة للقائمة =================
  const filteredPatients = patients.filter(p => 
    p.name.includes(searchTerm) || p.phone.includes(searchTerm)
  );

  // === واجهة تفاصيل المريض (عند اختياره من القائمة) ===
  if (selectedPatient) {
    return (
      <div className="animate-[fadeIn_0.3s_ease-out]">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <button onClick={() => setSelectedPatientId(null)} className="text-green-100/50 hover:text-white flex items-center gap-1 text-sm font-bold mb-3 transition-colors">
              <ChevronLeft size={16} className="rotate-180" /> العودة لقائمة العملاء
            </button>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              {selectedPatient.name}
            </h1>
            <p className="text-[#8DC63F] font-bold text-sm mt-1" dir="ltr">{selectedPatient.phone}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <a 
              href={`https://wa.me/2${selectedPatient.phone}?text=مرحباً ${selectedPatient.name}، نود تذكيرك بمتابعة نظامك وجدول جلساتك في عيادة سيرا.`} 
              target="_blank" rel="noreferrer" 
              className="bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 py-2.5 px-5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#25D366]/20 transition-colors">
              <MessageCircle size={18} /> مراسلة واتساب
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            <div className="glass-card p-6 rounded-[24px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <FileText size={18} className="text-[#8DC63F]"/> النظام الغذائي الحالي
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={handleOpenDietModal}
                    className="bg-[#8DC63F]/10 hover:bg-[#8DC63F]/20 text-[#8DC63F] border border-[#8DC63F]/20 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors">
                    {selectedPatient.diet ? <><Edit2 size={13}/> تعديل</> : <><Plus size={13}/> تعيين نظام</>}
                  </button>
                  {selectedPatient.diet && (
                    <button 
                      onClick={handleDeleteDiet}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 p-1.5 rounded-lg transition-colors">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              {selectedPatient.diet ? (
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1.5 h-full bg-[#8DC63F]"></div>
                  <h4 className="text-white font-bold text-lg mb-2">{selectedPatient.diet.name}</h4>
                  <p className="text-green-100/70 text-sm font-semibold whitespace-pre-line leading-relaxed">{selectedPatient.diet.instructions}</p>
                </div>
              ) : (
                <div className="bg-black/20 border border-dashed border-white/10 p-6 rounded-2xl text-center">
                  <p className="text-white/40 text-sm font-bold mb-3">لم يتم تعيين أي نظام غذائي لهذا العميل حتى الآن.</p>
                  <button onClick={handleOpenDietModal} className="text-xs bg-[#8DC63F] text-black font-black px-4 py-2 rounded-lg">إضافة نظام غذائي الآن</button>
                </div>
              )}
            </div>

            <div className="glass-card p-6 rounded-[24px]">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <CalendarDays size={18} className="text-[#8DC63F]"/> الجلسات والمواعيد
                  </h3>
                  <p className="text-xs text-green-100/50 font-bold mt-0.5">إجمالي الجلسات: {selectedPatient.sessions.length}</p>
                </div>
                <button 
                  onClick={handleOpenAddSession}
                  className="bg-[#8DC63F] text-black hover:bg-[#7ab036] px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-colors shadow-md">
                  <Plus size={16} /> إضافة جلسة
                </button>
              </div>
              
              <div className="flex flex-col gap-3">
                {selectedPatient.sessions.length > 0 ? selectedPatient.sessions.map(session => (
                  <div key={session.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black/40 border border-white/5 p-4 rounded-xl gap-3">
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
                        {session.device}
                      </h4>
                      <p className="text-green-100/50 text-xs font-semibold">
                        {new Date(session.date).toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' })} • المدة: {session.duration} دقيقة
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button 
                        onClick={() => handleToggleSessionStatus(session)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                          session.status === 'completed' 
                            ? 'bg-[#8DC63F]/20 text-[#8DC63F] border border-[#8DC63F]/30' 
                            : 'bg-[#f1c40f]/20 text-[#f1c40f] border border-[#f1c40f]/30'
                        }`}>
                        {session.status === 'completed' ? <><CheckCircle2 size={12}/> تمت</> : <><Clock size={12}/> قادمة</>}
                      </button>

                      <button 
                        onClick={() => handleOpenEditSession(session)} 
                        className="text-white/40 hover:text-white p-1.5 transition-colors">
                        <Edit2 size={14}/>
                      </button>
                      <button 
                        onClick={() => handleDeleteSession(session.id)} 
                        className="text-white/40 hover:text-red-400 p-1.5 transition-colors">
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="p-6 text-center text-white/30 font-bold border border-dashed border-white/10 rounded-xl">
                    لا توجد جلسات مسجلة لهذا العميل.
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 glass-card p-6 rounded-[24px] flex flex-col min-h-[580px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <User size={18} className="text-[#8DC63F]"/> المجسم الخاص به
              </h3>
              <button 
                onClick={() => { setTempAvatarProps({ ...selectedPatient.avatarProps }); setIsAvatarModalOpen(true); }}
                className="bg-[#8DC63F]/20 hover:bg-[#8DC63F]/30 text-[#8DC63F] border border-[#8DC63F]/30 px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-colors">
                <Sliders size={14} /> تعديل المجسم
              </button>
            </div>

            <div className="flex-1 bg-black/60 rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center">
              <CerrahAvatar {...selectedPatient.avatarProps} />
            </div>

            <div className="mt-4 bg-white/5 p-3.5 rounded-xl border border-white/5 flex justify-between items-center text-xs font-bold text-white/70">
              <span>الوزن الحالي: {selectedPatient.avatarProps?.weight || 80} كجم</span>
              <span>الطول: {selectedPatient.avatarProps?.height || 170} سم</span>
              <span className="text-[#8DC63F]">تحديث مباشر</span>
            </div>
          </div>

        </div>

        {/* MODAL: إضافة / تعديل جلسة */}
        {isSessionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-[#030604] border border-[#8DC63F]/20 p-6 md:p-8 rounded-[32px] max-w-md w-full relative shadow-2xl">
              <button onClick={() => setIsSessionModalOpen(false)} className="absolute top-5 left-5 text-white/50 hover:text-white bg-white/5 p-1.5 rounded-full"><X size={18}/></button>
              <h3 className="text-xl font-black text-white mb-5 flex items-center gap-2">
                <CalendarDays size={20} className="text-[#8DC63F]" />
                {editingSessionId ? 'تعديل موعد الجلسة' : 'إضافة جلسة جديدة'}
              </h3>
              
              <form onSubmit={handleSaveSession} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-green-100/60 mb-2">نوع الجهاز أو الخدمة</label>
                  <select 
                    value={sessionForm.device} 
                    onChange={(e) => setSessionForm({...sessionForm, device: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#8DC63F]/50 font-bold text-sm">
                    <option value="جهاز Microwave (Onda)">جهاز Microwave (Onda)</option>
                    <option value="جهاز Scizer (تفتيت)">جهاز Scizer (تفتيت)</option>
                    <option value="جلسة ميزوثيرابي">جلسة ميزوثيرابي</option>
                    <option value="جلسة كرايو (تجميد دهون)">جلسة كرايو (تجميد دهون)</option>
                    <option value="جلسة متابعة وتوجيه دايت">جلسة متابعة وتوجيه دايت</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-green-100/60 mb-2">تاريخ ووقت الجلسة</label>
                  <input 
                    type="datetime-local" 
                    required 
                    value={sessionForm.date} 
                    onChange={(e) => setSessionForm({...sessionForm, date: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#8DC63F]/50 font-bold text-sm [color-scheme:dark]" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-green-100/60 mb-2">المدة (بالدقائق)</label>
                    <input 
                      type="number" 
                      min="10" max="180" 
                      value={sessionForm.duration} 
                      onChange={(e) => setSessionForm({...sessionForm, duration: Number(e.target.value)})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#8DC63F]/50 font-bold text-sm text-center" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-green-100/60 mb-2">حالة الحضور</label>
                    <select 
                      value={sessionForm.status} 
                      onChange={(e) => setSessionForm({...sessionForm, status: e.target.value as 'upcoming' | 'completed'})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#8DC63F]/50 font-bold text-sm">
                      <option value="upcoming">قادمة (مجدولة)</option>
                      <option value="completed">تمت بنجاح</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full bg-[#8DC63F] hover:bg-[#7ab036] text-black py-3 rounded-xl font-black flex justify-center items-center gap-2 transition-colors mt-3">
                  <Save size={18} /> حفظ الجلسة
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: تعيين وتعديل النظام الغذائي */}
        {isDietModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-[#030604] border border-[#8DC63F]/20 p-6 md:p-8 rounded-[32px] max-w-lg w-full relative shadow-2xl">
              <button onClick={() => setIsDietModalOpen(false)} className="absolute top-5 left-5 text-white/50 hover:text-white bg-white/5 p-1.5 rounded-full"><X size={18}/></button>
              <h3 className="text-xl font-black text-white mb-5 flex items-center gap-2">
                <FileText size={20} className="text-[#8DC63F]" /> تعيين النظام الغذائي للعميل
              </h3>

              <form onSubmit={handleSaveDiet} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-green-100/60 mb-2">اسم النظام (الدايت)</label>
                  <input 
                    type="text" required 
                    value={dietForm.name} 
                    onChange={(e) => setDietForm({...dietForm, name: e.target.value})}
                    placeholder="مثال: دايت كيتو 1500 كالوري"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#8DC63F]/50 font-bold text-sm" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-green-100/60 mb-2">التعليمات والوجبات والملاحظات</label>
                  <textarea 
                    required rows={6}
                    value={dietForm.instructions} 
                    onChange={(e) => setDietForm({...dietForm, instructions: e.target.value})}
                    placeholder="اكتب تفاصيل الدايت والممنوعات هنا..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#8DC63F]/50 font-semibold text-sm resize-none" 
                  />
                </div>

                <button type="submit" className="w-full bg-[#8DC63F] hover:bg-[#7ab036] text-black py-3 rounded-xl font-black flex justify-center items-center gap-2 transition-colors mt-2">
                  <Save size={18} /> حفظ النظام الغذائي
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: تعديل المجسم 3D */}
        {isAvatarModalOpen && tempAvatarProps && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-[#030604] border border-[#8DC63F]/30 p-6 md:p-8 rounded-[32px] max-w-4xl w-full relative shadow-2xl max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Sliders size={20} className="text-[#8DC63F]" /> تعديل أبعاد المجسم
                </h3>
                <button onClick={() => setIsAvatarModalOpen(false)} className="text-white/50 hover:text-white bg-white/5 p-1.5 rounded-full"><X size={18}/></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-y-auto pr-2">
                <div className="bg-black/40 rounded-2xl h-[340px] border border-white/5 overflow-hidden relative">
                  <CerrahAvatar {...tempAvatarProps} />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-white/60 mb-1">الوزن (كجم)</label>
                      <input type="number" value={tempAvatarProps.weight} onChange={(e) => setTempAvatarProps({...tempAvatarProps, weight: Number(e.target.value)})} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white text-center font-bold text-sm" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-white/60 mb-1">الطول (سم)</label>
                      <input type="number" value={tempAvatarProps.height} onChange={(e) => setTempAvatarProps({...tempAvatarProps, height: Number(e.target.value)})} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white text-center font-bold text-sm" />
                    </div>
                  </div>

                  {[
                    { label: 'محيط البطن', key: 'bellyRound' },
                    { label: 'الدهون السفلية للبطن', key: 'bellyLower' },
                    { label: 'الأجناب', key: 'loveHandles' },
                    { label: 'دهون الفخذين', key: 'thighsFat' },
                    { label: 'دهون الذراعين', key: 'armsFat' },
                  ].map((slider) => (
                    <div key={slider.key} className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                      <div className="flex justify-between text-xs font-bold text-white mb-1">
                        <span>{slider.label}</span>
                        <span className="text-[#8DC63F]">{tempAvatarProps[slider.key] ?? 0}</span>
                      </div>
                      <input 
                        type="range" min="0" max="1" step="0.05" 
                        value={tempAvatarProps[slider.key] ?? 0} 
                        onChange={(e) => setTempAvatarProps({...tempAvatarProps, [slider.key]: Number(e.target.value)})}
                        className="w-full accent-[#8DC63F]" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 mt-4 flex justify-end gap-3">
                <button onClick={() => setIsAvatarModalOpen(false)} className="px-5 py-2.5 rounded-xl text-white/60 hover:text-white font-bold text-sm">إلغاء</button>
                <button onClick={handleSaveAvatarProps} className="bg-[#8DC63F] hover:bg-[#7ab036] text-black px-6 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 transition-colors">
                  <Save size={16} /> حفظ ونشر للمريض
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">العملاء</h1>
          <p className="text-green-100/70 font-bold text-sm">قائمة المرضى والمتابعات الفورية مع العيادة.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="بحث بالاسم أو رقم التليفون..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 pr-12 text-sm text-white outline-none focus:border-[#8DC63F]/50 transition-colors font-bold" 
          />
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" />
        </div>
      </div>

      <div className="glass-card rounded-[32px] overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-black/20 border-b border-white/5">
                <th className="p-5 text-xs font-bold text-[#8DC63F]">اسم العميل</th>
                <th className="p-5 text-xs font-bold text-[#8DC63F]">رقم التليفون</th>
                <th className="p-5 text-xs font-bold text-[#8DC63F]">الجلسات المتبقية</th>
                <th className="p-5 text-xs font-bold text-[#8DC63F]">النظام الحالي</th>
                <th className="p-5 text-xs font-bold text-[#8DC63F]">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map(patient => {
                  const upcoming = patient.sessions.filter(s => s.status === 'upcoming').length;
                  return (
                    <tr key={patient.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-5 font-bold text-white text-sm">{patient.name}</td>
                      <td className="p-5 font-bold text-green-100/70 text-sm" dir="ltr">{patient.phone}</td>
                      <td className="p-5 font-bold text-white/60 text-sm">
                        {upcoming > 0 ? `${upcoming} قادمة` : 'لا يوجد'}
                      </td>
                      <td className="p-5 font-semibold text-xs text-white/80">
                        {patient.diet ? patient.diet.name : <span className="text-white/30">غير محدد</span>}
                      </td>
                      <td className="p-5">
                        <button 
                          onClick={() => setSelectedPatientId(patient.id)}
                          className="bg-[#8DC63F]/10 hover:bg-[#8DC63F]/20 text-[#8DC63F] border border-[#8DC63F]/20 px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                          عرض التفاصيل
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/50 font-bold">لا يوجد عملاء مطابقين للبحث.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}