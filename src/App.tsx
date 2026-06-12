import React, { useState } from 'react';
import { userProfile, dailyTimeline } from './data';
import { ProfilePanel } from './components/ProfilePanel';
import { DailyTimeline } from './components/DailyTimeline';
import { LoggingPanel } from './components/LoggingPanel';
import { ProgressPanel } from './components/ProgressPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { Gamepad2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'logging' | 'progress' | 'settings'>('overview');

  const renderActiveTab = () => {
    switch(activeTab) {
      case 'logging':
        return <LoggingPanel />;
      case 'progress':
        return <ProgressPanel />;
      case 'settings':
        return <SettingsPanel />;
      case 'overview':
      default:
        return <DailyTimeline events={dailyTimeline} />;
    }
  };

  const getTabClass = (tabName: string) => {
    const isActive = activeTab === tabName;
    return `px-5 py-2.5 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-xl border-2 transition-all cursor-pointer ${
      isActive 
        ? 'bg-indigo-50 text-indigo-600 border-indigo-200 shadow-[0_2px_0_rgb(199,210,254)] hover:translate-y-[2px] hover:shadow-none' 
        : 'bg-white text-slate-500 border-slate-200 shadow-[0_2px_0_rgb(226,232,240)] hover:translate-y-[2px] hover:shadow-none hover:bg-slate-50'
    }`;
  };

  return (
    <div className="min-h-screen bg-[#F4F7FE] text-slate-800 p-4 md:p-6 font-sans flex flex-col gap-6">
      <header className="max-w-6xl mx-auto w-full flex justify-between items-center bg-white border-2 border-slate-200/80 rounded-[2rem] p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500 shadow-[0_4px_0_rgb(67,56,202)] flex items-center justify-center text-white transform -rotate-3">
            <Gamepad2 className="w-7 h-7 fill-current border-none" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800">FitPlan Quest</h1>
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest hidden md:block mt-0.5">Level 1 • Recomposition Phase</p>
          </div>
        </div>
        <div className="flex gap-6">
           <div className="text-right hidden sm:block">
             <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-0.5">Current EXP (Weight)</p>
             <p className="text-xl font-black text-indigo-500">{userProfile.weight}</p>
           </div>
           <div className="text-right hidden md:block">
             <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-0.5">Target Level</p>
             <p className="text-xl font-black text-slate-700">{userProfile.targetWeight}</p>
           </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Profile Summary */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <ProfilePanel profile={userProfile} />
        </div>

        {/* Right Column: Dynamic Content */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {renderActiveTab()}
        </div>
      </main>

      <footer className="max-w-6xl mx-auto w-full flex flex-wrap justify-center gap-2 sm:gap-4 lg:gap-8 py-4 pt-2">
        <button onClick={() => setActiveTab('overview')} className={getTabClass('overview')}>Overview</button>
        <button onClick={() => setActiveTab('logging')} className={getTabClass('logging')}>Logging</button>
        <button onClick={() => setActiveTab('progress')} className={getTabClass('progress')}>Progress</button>
        <button onClick={() => setActiveTab('settings')} className={getTabClass('settings')}>Settings</button>
      </footer>
    </div>
  );
}
