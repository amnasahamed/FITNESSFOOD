import React, { useState } from 'react';
import { Save, User, Bell, Shield } from 'lucide-react';
import { userProfile } from '../data';

export function SettingsPanel() {
  const [profile, setProfile] = useState({
    weight: '83.1',
    targetWeight: '75',
    calories: '1900',
    steps: '10000'
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In a real app we'd update context/store here
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border-2 border-slate-200 h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-indigo-500 font-black text-xl uppercase tracking-wider mb-2">Game Settings</h2>
        <p className="text-slate-500 font-bold text-sm">Configure your quest parameters and preferences.</p>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto pr-2">
        
        {/* Profile Settings */}
        <div className="bg-slate-50 rounded-2xl p-5 border-2 border-slate-200">
          <h3 className="text-slate-800 font-black mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-indigo-500" /> Player Config
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Current Weight (kg)</label>
              <input 
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({...profile, weight: e.target.value})}
                className="w-full bg-white border-2 border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Target (kg)</label>
                <input 
                  type="number"
                  value={profile.targetWeight}
                  onChange={(e) => setProfile({...profile, targetWeight: e.target.value})}
                  className="w-full bg-white border-2 border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Daily Cal Limit</label>
                <input 
                  type="number"
                  value={profile.calories}
                  onChange={(e) => setProfile({...profile, calories: e.target.value})}
                  className="w-full bg-white border-2 border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-800 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-slate-50 rounded-2xl p-5 border-2 border-slate-200">
          <h3 className="text-slate-800 font-black mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-amber-500" /> Alerts & Reminders
          </h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
              <div>
                <div className="text-sm font-black text-slate-700">Meal Reminders</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">15 mins before scheduled meal</div>
              </div>
              <div className="relative inline-block w-10 h-6">
                <input type="checkbox" defaultChecked className="peer opacity-0 w-0 h-0" />
                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-slate-200 transition-colors rounded-full peer-checked:bg-indigo-500"></span>
                <span className="absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-4"></span>
              </div>
            </label>
            
            <label className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
              <div>
                <div className="text-sm font-black text-slate-700">Hydration Alerts</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Every 2 hours during day</div>
              </div>
              <div className="relative inline-block w-10 h-6">
                <input type="checkbox" defaultChecked className="peer opacity-0 w-0 h-0" />
                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-slate-200 transition-colors rounded-full peer-checked:bg-indigo-500"></span>
                <span className="absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-4"></span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-auto">
        <button
          onClick={handleSave}
          className={`w-full py-3.5 text-white text-sm font-black uppercase tracking-widest rounded-xl border-2 shadow-[0_4px_0_rgba(0,0,0,0.2)] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center
            ${saved 
              ? 'bg-emerald-500 border-emerald-600 shadow-[0_4px_0_rgb(5,150,105)]' 
              : 'bg-indigo-500 border-indigo-600 shadow-[0_4px_0_rgb(67,56,202)] hover:translate-y-[2px] hover:shadow-[0_2px_0_rgb(67,56,202)]'}`}
        >
          {saved ? (
             <><Shield className="w-5 h-5 mr-2" /> Data Saved</>
          ) : (
             <><Save className="w-5 h-5 mr-2" /> Save Configuration</>
          )}
        </button>
      </div>

    </div>
  );
}
