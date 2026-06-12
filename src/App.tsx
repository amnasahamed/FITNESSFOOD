import React, { useState } from 'react';
import { userProfile, dailyTimeline } from './data';
import { ProfilePanel } from './components/ProfilePanel';
import { DailyTimeline } from './components/DailyTimeline';
import { LoggingPanel } from './components/LoggingPanel';
import { ProgressPanel } from './components/ProgressPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { Gamepad2, Map, PenLine, TrendingUp, Settings } from 'lucide-react';

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

  const navItems = [
    { id: 'overview', label: 'Quest', icon: Map },
    { id: 'logging', label: 'Log', icon: PenLine },
    { id: 'progress', label: 'Stats', icon: TrendingUp },
    { id: 'settings', label: 'Config', icon: Settings }
  ];

  return (
    <div className="min-h-[100dvh] bg-[#F4F7FE] text-slate-800 p-4 md:p-6 pb-24 md:pb-6 font-sans flex flex-col gap-6 overflow-x-hidden">
      <header className="max-w-6xl mx-auto w-full flex justify-between items-center bg-white border-2 border-slate-200/80 rounded-[2rem] p-5 shadow-sm z-10 transition-all">
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

      <nav 
        className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 z-50 md:sticky md:bottom-6 md:rounded-[2rem] md:mx-auto md:max-w-lg md:border-2 md:mt-2 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] md:shadow-lg transition-transform"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex justify-around items-center h-16 sm:h-20 px-2 sm:px-6">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 active:scale-95 ${
                  isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div className={`relative p-1.5 sm:p-2 rounded-xl mb-1 transition-all duration-300 ${
                  isActive ? 'bg-indigo-50 shadow-[0_2px_0_rgb(199,210,254)] -translate-y-1' : 'bg-transparent'
                }`}>
                  <Icon className={`w-[22px] h-[22px] sm:w-6 sm:h-6 transition-all ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                </div>
                <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
