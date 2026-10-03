import React from 'react';
import { Search, MapPin, AlertCircle, Sparkles } from 'lucide-react';
import { District, Upazila } from '../types';

interface HeroBannerProps {
  currentDistrict: District;
  currentUpazila: Upazila | null;
  onOpenSearch: () => void;
  onOpenUpazilaSelector: () => void;
  activeBloodRequestsCount: number;
  onOpenBloodSection: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  currentDistrict,
  currentUpazila,
  onOpenSearch,
  onOpenUpazilaSelector,
  activeBloodRequestsCount,
  onOpenBloodSection,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl mb-6">
      {/* Background Graphic / Photo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_amader_upazila_1791039384938.jpg"
          alt="Amader Upazila Community"
          className="w-full h-full object-cover opacity-35 filter brightness-95"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback gradient if file missing
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-5 sm:p-8 md:p-10 max-w-4xl">
        {/* District & Upazila Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-300 mb-3">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            {currentUpazila ? `${currentUpazila.nameBn}, ${currentDistrict.nameBn}` : `${currentDistrict.nameBn} জেলা (সকল এলাকা)`}
          </span>
          <button
            onClick={onOpenUpazilaSelector}
            className="text-[11px] underline hover:text-white ml-1 cursor-pointer"
          >
            পরিবর্তন
          </button>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white mb-2">
          {currentUpazila
            ? `${currentUpazila.nameBn} উপজেলার সকল সেবা ও বাজার`
            : `${currentDistrict.nameBn} জেলার স্থানীয় কমিউনিটি প্ল্যাটফর্ম`}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-6">
          {currentUpazila?.famousForBn ? (
            <span>ঐতিহ্য: {currentUpazila.famousForBn}। </span>
          ) : null}
          কেনাবেচা, জরুরি রক্তদাতা, ডাক্তার, চাকরি, বাসাভাড়া ও স্থানীয় ব্যবসার এক বিশ্বস্ত সুপার অ্যাপ।
        </p>

        {/* Search Bar Interactive Trigger */}
        <div className="flex flex-col sm:flex-row gap-2 max-w-xl">
          <button
            onClick={onOpenSearch}
            className="flex-1 flex items-center justify-between px-4 py-3 bg-white/95 text-slate-700 hover:bg-white rounded-xl shadow-lg cursor-pointer transition-all hover:scale-[1.01] group text-left"
          >
            <div className="flex items-center gap-2.5 truncate">
              <Search className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs sm:text-sm text-slate-500 group-hover:text-slate-800 truncate">
                {currentUpazila
                  ? `${currentUpazila.nameBn} এ পণ্য, রক্ত, চাকরি বা সেবা খুঁজুন...`
                  : `${currentDistrict.nameBn} এ যেকোনো কিছু সার্চ করুন...`}
              </span>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md shrink-0 ml-2">
              খুঁজুন
            </span>
          </button>
        </div>

        {/* Announcement / Emergency Blood Notification Bar */}
        {activeBloodRequestsCount > 0 && (
          <div className="mt-5 inline-flex items-center gap-2.5 px-3 py-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-200 text-xs backdrop-blur-md">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />
            <span>
              জরুরি সতর্কতা: এই মুহূর্তে এলাকায় <strong>{activeBloodRequestsCount}টি</strong> রক্তের আবেদন সক্রিয় রয়েছে!
            </span>
            <button
              onClick={onOpenBloodSection}
              className="text-xs font-bold text-white underline hover:text-rose-200 ml-1 cursor-pointer whitespace-nowrap"
            >
              রক্ত দিন &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
