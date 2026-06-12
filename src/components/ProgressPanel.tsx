import React from 'react';
import { Target, TrendingDown, Flame } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', weight: 84.5 },
  { name: 'Tue', weight: 84.2 },
  { name: 'Wed', weight: 84.0 },
  { name: 'Thu', weight: 83.8 },
  { name: 'Fri', weight: 83.5 },
  { name: 'Sat', weight: 83.3 },
  { name: 'Sun', weight: 83.1 },
];

export function ProgressPanel() {
  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border-2 border-slate-200 h-full flex flex-col">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-indigo-500 font-black text-xl uppercase tracking-wider mb-2">Campaign Progress</h2>
          <p className="text-slate-500 font-bold text-sm">Track your stats across the recomposition phase.</p>
        </div>
        <div className="bg-indigo-50 border-2 border-indigo-200 px-3 py-1.5 rounded-xl hidden sm:block">
          <span className="text-indigo-500 font-black text-xs uppercase tracking-widest">Week 1</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-rose-50 border-2 border-rose-200 p-4 rounded-[1.5rem] flex flex-col justify-center transform transition-transform hover:-translate-y-1 hover:shadow-sm cursor-default">
          <div className="flex items-center text-rose-500 text-[10px] uppercase font-black mb-1.5 tracking-wider">
            <TrendingDown className="w-4 h-4 mr-1.5" /> Weight Lost
          </div>
          <div className="text-2xl font-black text-rose-700">-1.4 kg</div>
          <div className="text-[10px] font-bold text-rose-400 mt-1">This week</div>
        </div>
        
        <div className="bg-emerald-50 border-2 border-emerald-200 p-4 rounded-[1.5rem] flex flex-col justify-center transform transition-transform hover:-translate-y-1 hover:shadow-sm cursor-default">
          <div className="flex items-center text-emerald-500 text-[10px] uppercase font-black mb-1.5 tracking-wider">
            <Flame className="w-4 h-4 mr-1.5" /> Streak
          </div>
          <div className="text-2xl font-black text-emerald-700">7 Days</div>
          <div className="text-[10px] font-bold text-emerald-400 mt-1">Consistency rating: A+</div>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 rounded-2xl border-2 border-slate-200 p-4 sm:p-6 min-h-[300px] flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-slate-500 font-black text-xs uppercase tracking-widest flex items-center">
            <Target className="w-4 h-4 mr-1.5" /> Weight Trend (EXP)
          </h3>
          <span className="text-[10px] font-black text-slate-400 uppercase">Target: 75kg</span>
        </div>
        
        <div className="flex-1 w-full min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                dy={10}
              />
              <YAxis 
                domain={['dataMin - 0.5', 'dataMax + 0.5']} 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '1rem', 
                  border: '2px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontWeight: 900,
                  fontSize: '14px',
                  color: '#1e293b'
                }}
                itemStyle={{ color: '#6366f1', fontWeight: 900 }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#6366f1" 
                strokeWidth={4} 
                dot={{ r: 6, fill: '#fff', stroke: '#6366f1', strokeWidth: 3 }}
                activeDot={{ r: 8, fill: '#6366f1', stroke: '#fff', strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
