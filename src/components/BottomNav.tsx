import React from 'react';
import { Home, Search, PlusCircle, Bell, User } from 'lucide-react';

interface BottomNavProps {
  currentTab: 'home' | 'search' | 'create' | 'notifications' | 'profile';
  onChangeTab: (tab: 'home' | 'search' | 'create' | 'notifications' | 'profile') => void;
  unreadCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onChangeTab,
  unreadCount,
}) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg"
      aria-label="Bottom Navigation"
    >
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-2">
        {/* Home */}
        <button
          onClick={() => onChangeTab('home')}
          className={`flex flex-col items-center justify-center min-h-[44px] cursor-pointer transition-colors ${
            currentTab === 'home' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className={`w-5 h-5 ${currentTab === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight mt-0.5">হোম</span>
        </button>

        {/* Search */}
        <button
          onClick={() => onChangeTab('search')}
          className={`flex flex-col items-center justify-center min-h-[44px] cursor-pointer transition-colors ${
            currentTab === 'search' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Search className={`w-5 h-5 ${currentTab === 'search' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight mt-0.5">সার্চ</span>
        </button>

        {/* Post Listing CTA (Center highlight) */}
        <button
          onClick={() => onChangeTab('create')}
          className="flex flex-col items-center justify-center min-h-[44px] cursor-pointer group"
          title="নতুন বিজ্ঞাপন বা রিকুয়েস্ট পোস্ট করুন"
        >
          <div className="w-10 h-10 -mt-3 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 group-active:scale-95 transition-transform">
            <PlusCircle className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-[10px] tracking-tight text-emerald-800 font-bold mt-0.5">পোস্ট</span>
        </button>

        {/* Notifications */}
        <button
          onClick={() => onChangeTab('notifications')}
          className={`relative flex flex-col items-center justify-center min-h-[44px] cursor-pointer transition-colors ${
            currentTab === 'notifications' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Bell className={`w-5 h-5 ${currentTab === 'notifications' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">বিজ্ঞপ্তি</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => onChangeTab('profile')}
          className={`flex flex-col items-center justify-center min-h-[44px] cursor-pointer transition-colors ${
            currentTab === 'profile' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className={`w-5 h-5 ${currentTab === 'profile' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight mt-0.5">প্রোফাইল</span>
        </button>
      </div>
    </nav>
  );
};
