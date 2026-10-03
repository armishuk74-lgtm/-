import React from 'react';
import { MapPin, Search, PlusCircle, Bell, User as UserIcon, Shield, AlertTriangle } from 'lucide-react';
import { District, Upazila, User } from '../types';

interface HeaderProps {
  currentDistrict: District;
  currentUpazila: Upazila | null;
  onOpenUpazilaSelector: () => void;
  onOpenSearch: () => void;
  onOpenCreate: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenAdmin: () => void;
  onOpenEmergency: () => void;
  currentUser: User;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentDistrict,
  currentUpazila,
  onOpenUpazilaSelector,
  onOpenSearch,
  onOpenCreate,
  onOpenNotifications,
  onOpenProfile,
  onOpenAdmin,
  onOpenEmergency,
  currentUser,
  unreadCount,
}) => {
  const isAdmin =
    currentUser.role === 'super_admin' ||
    currentUser.role === 'district_admin' ||
    currentUser.role === 'upazila_admin';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Zone 1: Brand & Location Selector */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-left group flex items-center gap-2 cursor-pointer focus:outline-none"
              aria-label="Amader Upazila Home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                উ
              </div>
              <div className="truncate">
                <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  আমাদের উপজেলা
                </span>
                <span className="hidden sm:inline text-xs text-slate-600 ml-1.5 font-medium">
                  ময়মনসিংহ ও নেত্রকোনা
                </span>
              </div>
            </button>

            {/* Upazila Selector Button */}
            <button
              onClick={onOpenUpazilaSelector}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 transition-colors text-xs font-semibold cursor-pointer border border-slate-200"
              title="উপজেলা বা জেলা পরিবর্তন করুন"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate max-w-[110px] sm:max-w-[150px]">
                {currentUpazila ? currentUpazila.nameBn : `${currentDistrict.nameBn} (সকল)`}
              </span>
              <span className="text-[10px] text-slate-600 font-normal">বদলান ▾</span>
            </button>
          </div>

          {/* Zone 2: Fast Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-slate-600">
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>জরুরি সেবা</span>
            </button>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">
              {currentDistrict.nameBn} জেলা &middot; {currentDistrict.totalUpazilas}টি উপজেলা
            </span>
          </div>

          {/* Zone 3: Primary Action Affordances */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="সার্চ করুন (পণ্য, চাকরি, রক্তদাতা, ডাক্তার...)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="বিজ্ঞপ্তি"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>

            {/* Admin Dashboard Entry (if privileged) */}
            {isAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-medium hover:bg-indigo-100 transition-colors cursor-pointer"
                title="এডমিন ড্যাশবোর্ড"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>এডমিন</span>
              </button>
            )}

            {/* Post / Add Listing CTA */}
            <button
              onClick={onOpenCreate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>বিজ্ঞাপন দিন</span>
            </button>

            {/* User Profile */}
            <button
              onClick={onOpenProfile}
              className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
              title="ব্যবহারকারী প্রোফাইল"
              aria-label="Profile"
            >
              <UserIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
