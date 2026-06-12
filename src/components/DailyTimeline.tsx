import React, { useState, useEffect } from 'react';
import { TimelineEvent } from '../types';
import { Utensils, Droplets, Dumbbell, Pill, Check, Circle, Star, Award } from 'lucide-react';
import { motion } from 'motion/react';

const getEventStyles = (type: string) => {
  switch (type) {
    case 'meal':
      return { icon: <Utensils className="w-4 h-4" />, color: 'bg-orange-100 text-orange-600 border-orange-300', dot: 'bg-orange-400 shadow-[0_4px_0_rgb(194,65,12)] border-orange-500 text-orange-100', iconEmoji: '🍗' };
    case 'water':
      return { icon: <Droplets className="w-4 h-4" />, color: 'bg-cyan-100 text-cyan-600 border-cyan-300', dot: 'bg-cyan-400 shadow-[0_4px_0_rgb(8,145,178)] border-cyan-500 text-cyan-100', iconEmoji: '💧' };
    case 'workout':
      return { icon: <Dumbbell className="w-4 h-4" />, color: 'bg-rose-100 text-rose-600 border-rose-300', dot: 'bg-rose-400 shadow-[0_4px_0_rgb(190,18,60)] border-rose-500 text-rose-100', iconEmoji: '💪' };
    case 'supplement':
      return { icon: <Pill className="w-4 h-4" />, color: 'bg-purple-100 text-purple-600 border-purple-300', dot: 'bg-purple-400 shadow-[0_4px_0_rgb(126,34,206)] border-purple-500 text-purple-100', iconEmoji: '✨' };
    default:
      return { icon: <Circle className="w-4 h-4" />, color: 'bg-slate-100 text-slate-600 border-slate-300', dot: 'bg-slate-400 shadow-[0_4px_0_rgb(71,85,105)] border-slate-500 text-slate-100', iconEmoji: '🎯' };
  }
};

export function DailyTimeline({ events }: { events: TimelineEvent[] }) {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const savedDate = localStorage.getItem('fitplan_date');
      const today = new Date().toDateString();
      if (savedDate !== today) {
        localStorage.setItem('fitplan_date', today);
        localStorage.removeItem('fitplan_completed');
        return new Set();
      }
      const saved = localStorage.getItem('fitplan_completed');
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load completed state', e);
    }
    return new Set();
  });

  useEffect(() => {
    try {
      localStorage.setItem('fitplan_completed', JSON.stringify(Array.from(completed)));
    } catch (e) {
      console.error('Failed to save completed state', e);
    }
  }, [completed]);

  const toggleComplete = (id: string) => {
    const next = new Set(completed);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setCompleted(next);
  };

  const progressPercentage = Math.round((completed.size / events.length) * 100) || 0;

  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border-2 border-slate-200 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-indigo-500 font-black text-xl uppercase tracking-wider flex items-center">
          <Award className="w-6 h-6 mr-2 text-amber-400 fill-amber-300" />
          Daily Missions
        </h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex-1 sm:w-32 h-4 bg-slate-100 rounded-full border-2 border-slate-200 overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-sm font-black text-slate-400 bg-slate-100 px-3 py-1.5 rounded-xl border-2 border-slate-200 whitespace-nowrap">
            {completed.size} / {events.length} DONE
          </span>
        </div>
      </div>
      
      <div className="relative pl-3 md:pl-8 flex-1">
        {/* Vertical line connecting timeline */}
        <div className="absolute left-[20px] md:left-[40px] top-4 bottom-4 w-2 bg-slate-100 rounded-full border border-slate-200"></div>

        <div className="space-y-6 relative">
          {events.map((event, index) => {
            const isCompleted = completed.has(event.id);
            const style = getEventStyles(event.type);
            
            return (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative pl-8 md:pl-10 border-l border-transparent"
              >
                {/* Status Dot */}
                <button
                  onClick={() => toggleComplete(event.id)}
                  className={`absolute left-[-22px] md:left-[-1px] top-4 w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all cursor-pointer z-10 hover:scale-110 active:scale-95 active:translate-y-1 active:shadow-none
                    ${isCompleted ? 'border-emerald-500 bg-emerald-400 shadow-[0_4px_0_rgb(16,185,129)] text-white' : style.dot}`}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 stroke-[3]" />
                  ) : (
                    <span className="text-lg">{style.iconEmoji}</span>
                  )}
                </button>

                {/* Content Card */}
                <div className={`w-full transition-all duration-300 ${isCompleted ? 'opacity-60 scale-[0.98]' : 'opacity-100'}`}>
                  
                  <div className={`bg-white rounded-2xl p-5 border-2 ${isCompleted ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-200 hover:border-slate-300 shadow-[0_4px_0_rgba(226,232,240,1)] hover:shadow-[0_4px_0_rgba(203,213,225,1)]'} transition-shadow`}>
                    
                    <div className="mb-3 flex items-center flex-wrap gap-2">
                      <span className={`text-[11px] font-black uppercase tracking-wider px-2 py-1 rounded-lg border-2 border-transparent ${isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        {event.time}
                      </span>
                      <div className={`px-2 py-1 rounded-lg border-2 text-[10px] font-black uppercase tracking-widest inline-flex items-center ${isCompleted ? 'bg-emerald-100 text-emerald-600 border-emerald-200/50' : style.color}`}>
                         <span>{event.type}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className={`text-[17px] font-black ${isCompleted ? 'text-emerald-700 line-through decoration-emerald-300 decoration-2' : 'text-slate-800'}`}>
                        {event.title}
                      </h3>
                      {event.protein && (
                        <div className="text-right flex-shrink-0 mt-0.5">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-xl border-2 text-[10px] font-black tracking-widest uppercase shadow-[0_2px_0_rgba(0,0,0,0.05)] ${isCompleted ? 'bg-emerald-100 border-emerald-200 text-emerald-600' : 'bg-amber-100 border-amber-300 text-amber-600'}`}>
                            {event.protein} PRO
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {event.description && (
                      <p className={`text-[13px] font-bold mb-3 leading-relaxed ${isCompleted ? 'text-emerald-600/70' : 'text-slate-500'}`}>
                        {event.description}
                      </p>
                    )}
                    
                    <ul className="space-y-1.5 mt-3 pt-3 border-t-2 border-slate-100/60">
                      {event.items.map((item, i) => (
                        <li key={i} className={`flex items-start text-sm font-bold ${isCompleted ? 'text-emerald-600/80' : 'text-slate-600'}`}>
                          <Star className={`w-3.5 h-3.5 mr-2 mt-0.5 flex-shrink-0 ${isCompleted ? 'text-emerald-300' : 'text-amber-300'} fill-current`} />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t-2 border-slate-100">
        <div className="flex justify-between items-center text-sm font-black">
          <span className="text-slate-500 uppercase tracking-widest">Daily Energy XP</span>
          <span className="text-indigo-600 px-4 py-2 bg-indigo-50 rounded-xl border-2 border-indigo-200 shadow-[0_2px_0_rgb(199,210,254)]">1800–2000 kcal</span>
        </div>
      </div>
    </div>
  );
}
