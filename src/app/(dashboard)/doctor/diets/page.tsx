"use client";
import React, { useState } from 'react';
import { ListChecks, Plus, FileText, Edit, Trash2, Save, X } from 'lucide-react';

// النوع الخاص بقالب الدايت
type DietTemplate = {
  id: string;
  name: string;
  description: string;
  instructions: string;
  type: 'loss' | 'gain' | 'maintenance';
};

export default function DietTemplatesPage() {
  const [templates, setTemplates] = useState<DietTemplate[]>([
    {
      id: '1',
      name: 'دايت كيتو (مبتدئين)',
      description: 'نظام منخفض الكربوهيدرات وعالي الدهون للتحفيز السريع للحرق.',
      instructions: '- الإفطار: 3 بيضات مقلية بالزبدة\n- الغداء: شريحة لحم مع سلطة ورقيات\n- العشاء: تونة بزيت الزيتون',
      type: 'loss'
    },
    {
      id: '2',
      name: 'صيام متقطع (16/8)',
      description: 'نظام يعتمد على الصيام لمدة 16 ساعة وتناول الطعام في نافذة 8 ساعات.',
      instructions: '- وجبة 1 (12 ظهراً): بروتين خالي من الدهون مع خضار\n- وجبة 2 (8 مساءً): زبادي يوناني مع مكسرات',
      type: 'loss'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // حالات الفورم
  const [newDiet, setNewDiet] = useState<Partial<DietTemplate>>({
    name: '', description: '', instructions: '', type: 'loss'
  });

  const handleSaveDiet = (e: React.FormEvent) => {
    e.preventDefault();
    const newTemplate: DietTemplate = {
      id: Date.now().toString(),
      name: newDiet.name!,
      description: newDiet.description!,
      instructions: newDiet.instructions!,
      type: newDiet.type as 'loss' | 'gain' | 'maintenance'
    };
    setTemplates([newTemplate, ...templates]);
    setIsModalOpen(false);
    setNewDiet({ name: '', description: '', instructions: '', type: 'loss' });
  };

  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      
      {/* الهيدر */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
            <ListChecks className="text-[#8DC63F]" size={32} /> الأنظمة الغذائية (Templates)
          </h1>
          <p className="text-green-100/70 font-bold text-sm">أضف وقم بإدارة القوالب الجاهزة لاستخدامها السريع مع المرضى.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#8DC63F] text-black hover:bg-[#7ab036] px-5 py-3 rounded-xl font-black flex items-center gap-2 transition-colors shadow-lg w-full md:w-auto justify-center">
          <Plus size={20} /> إنشاء نظام غذائي جديد
        </button>
      </div>

      {/* شبكة القوالب الجاهزة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div key={template.id} className="glass-card p-6 rounded-[24px] flex flex-col h-full border border-white/5 hover:border-[#8DC63F]/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-[#8DC63F]/10 p-3 rounded-xl">
                <FileText size={24} className="text-[#8DC63F]" />
              </div>
              <div className="flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-white/50 hover:text-white p-1 transition-colors"><Edit size={16} /></button>
                <button onClick={() => deleteTemplate(template.id)} className="text-white/50 hover:text-red-400 p-1 transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
            
            <h3 className="text-xl font-black text-white mb-2">{template.name}</h3>
            <p className="text-sm text-green-100/60 font-semibold mb-4 flex-1">{template.description}</p>
            
            <div className="bg-black/40 p-4 rounded-xl border border-white/5 relative overflow-hidden">
              <p className="text-xs text-white/70 font-bold whitespace-pre-line leading-relaxed max-h-[80px] overflow-hidden relative">
                {template.instructions}
                <span className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/80 to-transparent"></span>
              </p>
            </div>
            
            <div className="mt-4 flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                template.type === 'loss' ? 'bg-red-500/20 text-red-400 border border-red-500/20' :
                template.type === 'gain' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' :
                'bg-[#8DC63F]/20 text-[#8DC63F] border border-[#8DC63F]/20'
              }`}>
                {template.type === 'loss' ? 'تخسيس وحرق' : template.type === 'gain' ? 'زيادة وزن' : 'تثبيت'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* نافذة إنشاء نظام جديد (Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-[#030604] border border-[#8DC63F]/20 p-6 md:p-8 rounded-[32px] max-w-2xl w-full relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 left-6 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full p-2"><X size={20}/></button>
            <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
              <Plus size={24} className="text-[#8DC63F]" /> إضافة نظام غذائي
            </h3>
            
            <form onSubmit={handleSaveDiet} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-green-100/60 mb-2">اسم النظام (الدايت)</label>
                  <input type="text" required value={newDiet.name} onChange={(e) => setNewDiet({...newDiet, name: e.target.value})} placeholder="مثال: دايت كيتو متقدم" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#8DC63F]/50 font-bold text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-green-100/60 mb-2">الهدف من النظام</label>
                  <select required value={newDiet.type} onChange={(e) => setNewDiet({...newDiet, type: e.target.value as any})} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#8DC63F]/50 font-bold text-sm appearance-none cursor-pointer">
                    <option value="loss">تخسيس وحرق دهون</option>
                    <option value="gain">زيادة وزن (تضخيم)</option>
                    <option value="maintenance">تثبيت وزن</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-green-100/60 mb-2">وصف مختصر</label>
                <input type="text" required value={newDiet.description} onChange={(e) => setNewDiet({...newDiet, description: e.target.value})} placeholder="وصف سريع يظهر للدكتور..." className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#8DC63F]/50 font-bold text-sm" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-green-100/60 mb-2">محتوى النظام والوجبات (يطبع للمريض)</label>
                <textarea required value={newDiet.instructions} onChange={(e) => setNewDiet({...newDiet, instructions: e.target.value})} placeholder="اكتب الوجبات والتعليمات بالتفصيل هنا..." className="w-full min-h-[150px] bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#8DC63F]/50 font-semibold text-sm resize-none"></textarea>
              </div>
              
              <button type="submit" className="w-full bg-[#8DC63F] hover:bg-[#7ab036] text-black py-4 rounded-xl font-black flex justify-center items-center gap-2 transition-colors mt-2 text-lg">
                <Save size={20} /> حفظ القالب
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}