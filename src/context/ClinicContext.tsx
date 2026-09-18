"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

// تعريف أنواع البيانات (Types)
export type Session = { id: string; date: string; device: string; duration: number; status: 'completed' | 'upcoming'; };
export type Diet = { id: string; name: string; instructions: string; };
export type Patient = {
  id: string;
  name: string;
  phone: string;
  qrCodeUrl: string;
  diet: Diet | null;
  sessions: Session[];
  avatarProps: any; // بيانات المجسم
};

type ClinicContextType = {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updatedData: Partial<Patient>) => void;
};

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export function ClinicProvider({ children }: { children: ReactNode }) {
  // بيانات وهمية ابتدائية
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1', name: 'سارة جمال', phone: '01001234567', qrCodeUrl: 'https://cerrah.com/p/1',
      diet: { id: 'd1', name: 'دايت كيتو (مبتدئين)', instructions: 'أوميجا 3 يومياً' },
      sessions: [{ id: 's1', date: '2026-09-24T17:00', device: 'Microwave (Onda)', duration: 30, status: 'upcoming' }],
      avatarProps: { gender: 'female', weight: 85, height: 165, bellyRound: 0.6, bellyLower: 0.4, bellyUpper: 0.3, loveHandles: 0.5, doubleChin: 0.2, chestSag: 0.1, armsFat: 0.3, armsSag: 0.1, thighsFat: 0.4, calvesFat: 0.2, glutesFat: 0.3, hasStretchMarks: false, hasCellulite: true, skinTone: '#fcdbc4' }
    }
  ]);

  const addPatient = (patient: Patient) => setPatients(prev => [patient, ...prev]);
  
  const updatePatient = (id: string, updatedData: Partial<Patient>) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  return (
    <ClinicContext.Provider value={{ patients, addPatient, updatePatient }}>
      {children}
    </ClinicContext.Provider>
  );
}

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) throw new Error('useClinic must be used within a ClinicProvider');
  return context;
};