import React from 'react';
import { Megaphone, ExternalLink, Calendar, MapPin, Sparkles, PlusCircle } from 'lucide-react';
import { Advertisement, District, Upazila } from '../../types';

interface AdvertisementsViewProps {
  ads: Advertisement[];
  currentDistrict: District;
  currentUpazila: Upazila | null;
  onOpenPricing: () => void;
  onOpenCreate: () => void;
  showDemoBadges: boolean;
}

export const AdvertisementsView: React.FC<AdvertisementsViewProps> = ({
  ads,
  currentDistrict,
  currentUpazila,
  onOpenPricing,
  onOpenCreate,
  showDemoBadges,
}) => {
  const filtered = ads.filter((ad) => {
    if (ad.targetDistrictId !== currentDistrict.id) return false;
    if (currentUpazila && ad.targetUpazilaId !== 'all' && ad.targetUpazilaId !== currentUpazila.id) {
      return false;
    }
    if (ad.status !== 'active' || ad.approvalStatus !== 'approved') return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Monetization Promo Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-5 sm:p-6 rounded-3xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>উপজেলা বিজ্ঞাপন সেবা</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">আপনার ব্যবসা বা অফার পৌঁছান সবার কাছে</h2>
          <p className="text-xs sm:text-sm text-purple-200 mt-1 max-w-xl">
            {currentUpazila ? `${currentUpazila.nameBn}` : `${currentDistrict.nameBn}`} উপজেলার হাজার হাজার স্থানীয় ক্রেতা ও পাঠকের কাছে আপনার পণ্যের প্রচার চালান স্বল্প খরচে।
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onOpenPricing}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            বিজ্ঞাপন প্যাকেজ ও মূল্যতালিকা &rarr;
          </button>
          <button
            onClick={onOpenCreate}
            className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl text-xs transition-colors cursor-pointer"
          >
            + বিজ্ঞাপন জমা দিন
          </button>
        </div>
      </div>

      {/* Active Ads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((ad) => (
          <div
            key={ad.id}
            className="bg-white rounded-2xl border border-purple-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/9 bg-slate-100">
                <img
                  src={ad.image}
                  alt={ad.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-purple-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                  স্পন্সরড বিজ্ঞাপন
                </span>
                {showDemoBadges && ad.isDemo && (
                  <span className="absolute top-2 right-2 bg-slate-900/80 text-white text-[9px] px-1.5 py-0.5 rounded">
                    ডেমো বিজ্ঞাপন
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-sm font-bold text-slate-900">{ad.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 mt-1.5 leading-relaxed">
                  {ad.description}
                </p>

                <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>মেয়াদ: {ad.endDate} পর্যন্ত</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <a
                href={ad.targetUrl || '#'}
                className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>অফারটি গ্রহণ করুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
          বর্তমানে কোনো সক্রিয় স্পন্সরড বিজ্ঞাপন নেই।
        </div>
      )}
    </div>
  );
};
