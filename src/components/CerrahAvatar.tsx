"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ActivitySquare, AlertTriangle, RefreshCcw } from 'lucide-react';

export interface AvatarProps {
  gender: 'male' | 'female';
  weight: number; height: number; skinTone: string;
  bellyRound: number; bellyLower: number; bellyUpper: number;
  loveHandles: number; doubleChin: number; chestSag: number;
  armsFat: number; armsSag: number; thighsFat: number;
  calvesFat: number; glutesFat: number;
  hasStretchMarks: boolean; hasCellulite: boolean;
}

const Model = React.memo((props: AvatarProps) => {
  const [scene, setScene] = useState<THREE.Group | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let loadedScene: THREE.Group | null = null;
    const loader = new GLTFLoader();
    const modelPath = props.gender === 'male' ? '/male_avatar.glb' : '/female_avatar.glb';

    loader.load(
      modelPath,
      (gltf) => {
        if (isMounted) {
          loadedScene = gltf.scene;
          setScene(loadedScene);
          setError(false);
        } else {
          gltf.scene.traverse((child: any) => {
            if (child.isMesh) {
              child.geometry?.dispose();
              if (Array.isArray(child.material)) child.material.forEach((m: any) => m.dispose());
              else child.material?.dispose();
            }
          });
        }
      },
      undefined,
      (err) => {
        console.error("خطأ في تحميل المجسم:", err);
        if (isMounted) setError(true);
      }
    );

    return () => {
      isMounted = false;
      if (loadedScene) {
        loadedScene.traverse((child: any) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) child.material.forEach((m: any) => m.dispose());
            else child.material?.dispose();
          }
        });
      }
    };
  }, [props.gender]);

  const bmi = props.weight / Math.pow(props.height / 100, 2);
  const autoFatBase = bmi > 25 ? Math.min((bmi - 25) / 15, 1) : 0; 

  useEffect(() => {
    if (!scene) return;
    try {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true; 
          child.receiveShadow = true;
          
          if (child.material) {
            child.material.color.set(props.skinTone || '#fcdbc4');
            child.material.roughness = props.hasCellulite ? 0.8 : 0.4;
            child.material.needsUpdate = true;
          }

          if (child.morphTargetDictionary && child.morphTargetInfluences) {
            const dict = child.morphTargetDictionary;
            const influences = child.morphTargetInfluences;
            const applyMorph = (keyName: string, sliderValue: number, useAutoFat = true) => {
              if (dict[keyName] !== undefined) {
                influences[dict[keyName]] = useAutoFat ? Math.min(autoFatBase + sliderValue, 1) : sliderValue;
              }
            };

            applyMorph('Belly_Round', props.bellyRound); applyMorph('Belly_Lower', props.bellyLower);
            applyMorph('Belly_Upper', props.bellyUpper); applyMorph('Love_Handles', props.loveHandles);
            applyMorph('Double_Chin', props.doubleChin); applyMorph('Chest_Sag', props.chestSag, false); 
            applyMorph('Arms_Fat', props.armsFat); applyMorph('Arms_Sag', props.armsSag, false);
            applyMorph('Thighs_Fat', props.thighsFat); applyMorph('Calves_Fat', props.calvesFat);
            applyMorph('Glutes_Fat', props.glutesFat);
          }
        }
      });
    } catch (error) {}
  }, [scene, props, autoFatBase]);

  if (error) {
    return (
      <Html center>
        <div className="flex flex-col items-center justify-center bg-black/90 text-white border border-red-500/30 rounded-[24px] p-6 text-center w-64 backdrop-blur-md">
          <AlertTriangle size={40} className="mb-3 text-red-500" />
          <p className="font-bold text-sm">المجسم قيد التحديث</p>
          <p className="text-[10px] text-white/50 mt-2">يرجى التأكد من مسار ملفات .glb</p>
        </div>
      </Html>
    );
  }

  if (!scene) {
    return (
      <Html center>
        <div className="flex flex-col items-center gap-3 bg-black/80 px-6 py-4 rounded-2xl border border-[#8DC63F]/20 backdrop-blur-md">
          <ActivitySquare className="text-[#8DC63F] animate-pulse" size={24} />
          <span className="text-[#8DC63F] font-bold text-xs whitespace-nowrap">جاري تحميل المحاكي بأمان...</span>
        </div>
      </Html>
    );
  }

  const scaleRatio = props.height ? Math.max(0.85, Math.min(props.height / 170, 1.1)) : 1;
  return (
    <group scale={[scaleRatio, scaleRatio, scaleRatio]} position={[0, -0.1, 0]}>
      <primitive object={scene} />
    </group>
  );
});

Model.displayName = 'Model';

export default function CerrahAvatar(props: AvatarProps) {
  // 👈 نظام الحماية ضد الشاشة البيضاء (Context Lost)
  const [isContextLost, setIsContextLost] = useState(false);

  // إذا انهار كارت الشاشة، نظهر هذه الواجهة بدلاً من الشاشة البيضاء
  if (isContextLost) {
    return (
      <div className="absolute inset-0 w-full h-full z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md rounded-[24px] border border-white/10">
        <AlertTriangle size={48} className="text-[#f1c40f] mb-4 opacity-80" />
        <h3 className="text-white font-black text-lg mb-2">تم إيقاف المحاكي مؤقتاً</h3>
        <p className="text-white/50 text-xs font-bold text-center max-w-[250px] mb-6">
          لتوفير موارد الجهاز والذاكرة، تم إيقاف العرض ثلاثي الأبعاد.
        </p>
        <button 
          onClick={() => setIsContextLost(false)} 
          className="bg-[#8DC63F] hover:bg-[#7ab036] text-black px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-colors shadow-lg"
        >
          <RefreshCcw size={16} /> إعادة تشغيل المحاكي
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full z-20 cursor-grab active:cursor-grabbing pointer-events-auto bg-transparent rounded-[24px] overflow-hidden">
      <Canvas 
        style={{ background: 'transparent' }} 
        shadows={{ type: THREE.PCFShadowMap }} 
        camera={{ position: [0, 0, 4.5], fov: 42 }} 
        gl={{ alpha: true, antialias: true, powerPreference: "default" }}
        // 👈 التقاط لحظة انهيار كارت الشاشة للتدخل الفوري
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault(); // منع المتصفح من إظهار الشاشة البيضاء
            setIsContextLost(true); // تفعيل واجهة الإنقاذ
          });
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 5, 5]} intensity={1.5} castShadow shadow-mapSize={1024} />
        <Environment preset="city" />
        
        <Model {...props} />

        <ContactShadows position={[0, -0.1, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000000" />
        <OrbitControls makeDefault enablePan={false} enableZoom={true} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} minDistance={2} maxDistance={7} target={[0, 0.9, 0]} />
      </Canvas>
    </div>
  );
}