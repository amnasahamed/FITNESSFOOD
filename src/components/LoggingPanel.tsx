import React, { useState } from 'react';
import { Plus, Coffee, Utensils, Droplets, Dumbbell, Minus } from 'lucide-react';
import { motion } from 'motion/react';

export function LoggingPanel() {
  const [logs, setLogs] = useState<{ id: number; time: string; type: string; notes: string }[]>([
    { id: 1, time: '08:00 AM', type: 'Water', notes: '500ml' },
    { id: 2, time: '09:30 AM', type: 'Meal', notes: 'Protein Shake' },
  ]);
  const [newNote, setNewNote] = useState('');
  const [selectedType, setSelectedType] = useState('Meal');

  // Hydration state
  const [waterLevel, setWaterLevel] = useState(3);
  const dailyWaterGoal = 8;

  const handleAddWater = () => {
    if (waterLevel < dailyWaterGoal) {
      setWaterLevel(prev => prev + 1);
      const now = new Date();
      setLogs([{
        id: Date.now(),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'Water',
        notes: '1 Glass of Water (~250ml)'
      }, ...logs]);
    }
  };

  const addLog = () => {
    if (!newNote.trim()) return;
    const now = new Date();
    setLogs([{
      id: Date.now(),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: selectedType,
      notes: newNote
    }, ...logs]);
    setNewNote('');
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border-2 border-slate-200 h-full flex flex-col">
      {/* Visual Hydration Tracker */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-cyan-500 font-black text-xl uppercase tracking-wider mb-1 flex items-center">
              <Droplets className="w-5 h-5 mr-2" /> Hydration Quest
            </h2>
            <p className="text-slate-500 font-bold text-sm">Track your daily water intake (250ml per glass).</p>
          </div>
          <div className="text-cyan-600 font-black text-2xl hidden sm:block">
            {waterLevel} <span className="text-cyan-300 text-sm">/ {dailyWaterGoal}</span>
          </div>
        </div>

        <div className="bg-cyan-50 border-2 border-cyan-200 rounded-2xl p-4 sm:p-6 overflow-hidden relative">
          {/* Animated Water Background Fill */}
          <motion.div 
            className="absolute left-0 bottom-0 top-0 bg-cyan-200/50 z-0"
            initial={{ width: 0 }}
            animate={{ width: `${(waterLevel / dailyWaterGoal) * 100}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />
          
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start w-full sm:w-auto">
              {Array.from({ length: dailyWaterGoal }).map((_, i) => {
                const isFilled = i < waterLevel;
                const isNext = i === waterLevel;
                
                return (
                  <motion.button
                    key={i}
                    onClick={() => {
                        if (isNext) handleAddWater();
                        else if (isFilled && i === waterLevel - 1) setWaterLevel(prev => prev - 1); // allow undoing last one directly by clicking it
                    }}
                    whileHover={isNext || (isFilled && i === waterLevel - 1) ? { scale: 1.1 } : {}}
                    whileTap={isNext || (isFilled && i === waterLevel - 1) ? { scale: 0.9 } : {}}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-[1rem] flex items-center justify-center border-2 transition-all ${
                      isFilled
                        ? 'bg-cyan-500 border-cyan-600 shadow-[0_4px_0_rgb(8,145,178)] text-white hover:bg-cyan-400' 
                        : isNext
                          ? 'bg-white border-cyan-300 text-cyan-300 cursor-pointer shadow-[0_4px_0_rgb(165,243,252)] hover:border-cyan-400 hover:text-cyan-400' 
                          : 'bg-white/50 border-cyan-200 text-cyan-200 opacity-50 cursor-default'
                    }`}
                  >
                    <Droplets className={`w-5 h-5 sm:w-6 sm:h-6 ${isFilled ? 'fill-current' : ''}`} />
                  </motion.button>
                );
              })}
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto mt-2 sm:mt-0">
               <button 
                  onClick={() => setWaterLevel(prev => Math.max(0, prev - 1))}
                  disabled={waterLevel === 0}
                  className="flex-1 sm:flex-none p-3 bg-white border-2 border-slate-200 text-slate-400 rounded-xl shadow-[0_2px_0_rgb(226,232,240)] hover:text-slate-600 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 <Minus className="w-5 h-5 mx-auto" />
               </button>
               <button 
                  onClick={handleAddWater}
                  disabled={waterLevel === dailyWaterGoal}
                  className="flex-1 sm:flex-none py-3 px-6 bg-cyan-500 border-2 border-cyan-600 text-white font-black uppercase tracking-widest rounded-xl shadow-[0_4px_0_rgb(8,145,178)] hover:bg-cyan-400 hover:translate-y-[2px] hover:shadow-[0_2px_0_rgb(8,145,178)] active:translate-y-[4px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_0_rgb(8,145,178)] transition-all flex items-center justify-center"
               >
                 <Plus className="w-5 h-5 sm:mr-2" /> <span className="hidden sm:inline">Add</span>
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-indigo-500 font-black text-xl uppercase tracking-wider mb-2">Manual Logging</h2>
        <p className="text-slate-500 font-bold text-sm">Add custom entries that are not part of the daily quest.</p>
      </div>

      <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {['Meal', 'Water', 'Workout', 'Supplement'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-2 transition-all ${selectedType === type ? 'bg-indigo-50 border-indigo-300 text-indigo-600 shadow-[0_2px_0_rgb(165,180,252)]' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 shadow-[0_2px_0_rgb(226,232,240)]'}`}
            >
              {type}
            </button>
          ))}
        </div>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder={`Details about your ${selectedType.toLowerCase()}...`}
          className="w-full bg-white border-2 border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all resize-none h-24 mb-4"
        />
        <button
          onClick={addLog}
          className="w-full py-3 bg-emerald-50 text-emerald-600 text-sm font-black uppercase tracking-widest rounded-xl border-2 border-emerald-200 shadow-[0_4px_0_rgb(167,243,208)] hover:translate-y-[2px] hover:shadow-[0_2px_0_rgb(167,243,208)] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center"
        >
          <Plus className="w-5 h-5 mr-2" /> Log {selectedType}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <h3 className="text-slate-400 font-black text-xs uppercase tracking-widest mb-4">Today's Extra Logs</h3>
        <div className="space-y-4">
          {logs.map(log => (
            <div key={log.id} className="p-4 bg-white border-2 border-slate-200 rounded-2xl flex items-center shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex flex-shrink-0 items-center justify-center border-2 border-slate-200 mr-4">
                {log.type === 'Water' ? <Droplets className="w-5 h-5 text-cyan-500" /> : 
                 log.type === 'Meal' ? <Utensils className="w-5 h-5 text-orange-500" /> : 
                 log.type === 'Workout' ? <Dumbbell className="w-5 h-5 text-rose-500" /> : 
                 <Coffee className="w-5 h-5 text-purple-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-800 font-black truncate">{log.notes}</p>
                <div className="flex items-center mt-1">
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-black uppercase tracking-widest">{log.type}</span>
                  <span className="text-[10px] text-slate-400 font-bold ml-2">{log.time}</span>
                </div>
              </div>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-center py-8 text-slate-400 font-bold text-sm">
              No extra logs today. You're strictly following the quest!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
