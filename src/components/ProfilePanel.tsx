import React from 'react';
import { UserProfile } from '../types';
import { Target, Flame, Ruler, Weight, Sword, Heart } from 'lucide-react';

export function ProfilePanel({ profile }: { profile: UserProfile }) {
  return (
    <div className="h-full flex flex-col gap-6">
      {/* Bio / Metrics */}
      <div className="bg-white border-2 border-slate-200 rounded-[2rem] p-6 shadow-sm">
        <div className="flex items-center space-x-5 mb-6">
          <div className="h-16 w-16 rounded-2xl bg-amber-400 shadow-[0_4px_0_rgb(217,119,6)] flex items-center justify-center text-white font-black text-2xl border-2 border-amber-500 transform -rotate-3">
            {profile.age}
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-800 mb-1">Player Stats</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-lg inline-block border-2 border-slate-200">{profile.work} Class</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-sky-50 border-2 border-sky-200 p-3.5 rounded-[1.25rem] text-center flex flex-col items-center justify-center transform transition-transform hover:-translate-y-1 hover:shadow-sm cursor-default">
            <div className="flex items-center justify-center text-sky-500 text-[10px] uppercase font-black mb-1.5 tracking-wider">
              <Ruler className="w-3.5 h-3.5 mr-1.5" /> Height
            </div>
            <div className="text-lg font-black text-sky-700">{profile.height}</div>
          </div>
          <div className="bg-purple-50 border-2 border-purple-200 p-3.5 rounded-[1.25rem] text-center flex flex-col items-center justify-center transform transition-transform hover:-translate-y-1 hover:shadow-sm cursor-default">
            <div className="flex items-center justify-center text-purple-500 text-[10px] uppercase font-black mb-1.5 tracking-wider">
              <Weight className="w-3.5 h-3.5 mr-1.5" /> Start
            </div>
            <div className="text-lg font-black text-purple-700">{profile.weight}</div>
          </div>
          <div className="bg-emerald-50 border-2 border-emerald-200 p-3.5 rounded-[1.25rem] text-center flex flex-col items-center justify-center transform transition-transform hover:-translate-y-1 hover:shadow-sm cursor-default">
            <div className="flex items-center justify-center text-emerald-500 text-[10px] uppercase font-black mb-1.5 tracking-wider">
              <Target className="w-3.5 h-3.5 mr-1.5" /> Goal
            </div>
            <div className="text-lg font-black text-emerald-700">{profile.targetWeight}</div>
          </div>
          <div className="bg-rose-50 border-2 border-rose-200 p-3.5 rounded-[1.25rem] text-center flex flex-col items-center justify-center transform transition-transform hover:-translate-y-1 hover:shadow-sm cursor-default">
            <div className="flex items-center justify-center text-rose-500 text-[10px] uppercase font-black mb-1.5 tracking-wider">
              <Flame className="w-3.5 h-3.5 mr-1.5" /> Energy
            </div>
            <div className="text-lg font-black text-rose-700">{profile.calories}</div>
          </div>
        </div>
      </div>

      {/* Training Recommendation */}
      <div className="bg-white border-2 border-slate-200 rounded-[2rem] p-6 shadow-sm flex flex-col">
        <div className="flex justify-between items-start mb-4">
           <h2 className="text-indigo-500 font-black text-[13px] uppercase tracking-wider flex items-center pr-2"><Sword className="w-5 h-5 mr-1.5" /> Quest Strategy</h2>
           <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-xl border-2 border-indigo-200 whitespace-nowrap shadow-[0_2px_0_rgb(199,210,254)]">NEW QUEST</span>
        </div>
        
        <p className="text-[17px] leading-tight font-black text-slate-800 mb-5">Switch to Strength Training</p>
        <div className="space-y-3 text-sm font-bold text-slate-600">
           <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border-2 border-slate-100">
             <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-500 flex items-center justify-center border-2 border-orange-200 text-lg">⚔️</div>
             3–4 Days Weights
           </div>
           <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border-2 border-slate-100">
             <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-500 flex items-center justify-center border-2 border-cyan-200 text-lg">🏃</div>
             2–3 Days Cardio
           </div>
        </div>
        
        <div className="mt-6 pt-5 border-t-2 border-slate-100 flex items-center justify-between mt-auto">
           <span className="text-xs text-slate-500 font-black uppercase tracking-wider">Daily Step Goal</span>
           <span className="font-black text-indigo-600 text-sm bg-indigo-50 px-3 py-1.5 rounded-xl border-2 border-indigo-200">10,000 XP</span>
        </div>
      </div>
      
      {/* Basic macros visual placeholder */}
      <div className="bg-white border-2 border-slate-200 rounded-[2rem] p-6 shadow-sm flex-1 flex flex-col justify-between overflow-hidden">
         <h2 className="text-slate-500 font-black text-sm uppercase tracking-wider mb-8 flex items-center">
           <Heart className="w-5 h-5 mr-2 text-rose-400 fill-rose-200" /> Target Macros
         </h2>
         <div className="flex flex-1 justify-around items-end h-24 gap-4 px-2">
            <div className="flex flex-col items-center gap-3 w-full">
               <div className="w-full bg-sky-200 border-2 border-sky-400 h-24 rounded-t-2xl relative group transition-all hover:bg-sky-300 shadow-[inset_0_-4px_0_rgba(14,165,233,0.3)]">
                  <span className="absolute -top-7 left-0 right-0 text-center text-xs font-black text-sky-600">180g</span>
               </div>
               <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">PRO</span>
            </div>
            <div className="flex flex-col items-center gap-3 w-full">
               <div className="w-full bg-emerald-200 border-2 border-emerald-400 h-20 rounded-t-2xl relative group transition-all hover:bg-emerald-300 shadow-[inset_0_-4px_0_rgba(16,185,129,0.3)]">
                  <span className="absolute -top-7 left-0 right-0 text-center text-xs font-black text-emerald-600">150g</span>
               </div>
               <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">CARB</span>
            </div>
            <div className="flex flex-col items-center gap-3 w-full">
               <div className="w-full bg-amber-200 border-2 border-amber-400 h-10 rounded-t-2xl relative group transition-all hover:bg-amber-300 shadow-[inset_0_-4px_0_rgba(245,158,11,0.3)]">
                   <span className="absolute -top-7 left-0 right-0 text-center text-xs font-black text-amber-600">65g</span>
               </div>
               <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">FAT</span>
            </div>
         </div>
      </div>
    </div>
  );
}
