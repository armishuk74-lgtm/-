import React, { useState } from 'react';
import {
  Store,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
  Star,
  CheckCircle,
  Search,
  PlusCircle,
  Share2,
} from 'lucide-react';
import { BusinessListing, District, Upazila } from '../../types';
import { BUSINESS_CATEGORIES } from '../../data/categories';

interface BusinessDirectoryViewProps {
  businesses: BusinessListing[];
  currentDistrict: District;
  currentUpazila: Upazila | null;
  onOpenCreate: () => void;
  showDemoBadges: boolean;
}

export const BusinessDirectoryView: React.FC<BusinessDirectoryViewProps> = ({
  businesses,
  currentDistrict,
  currentUpazila,
  onOpenCreate,
  showDemoBadges,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = businesses.filter((b) => {
    if (b.districtId !== currentDistrict.id) return false;
    if (currentUpazila && b.upazilaId !== currentUpazila.id) return false;
    if (b.approvalStatus !== 'approved') return false;

    if (selectedCategory !== 'all' && b.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = b.name.toLowerCase().includes(q);
      const matchAddr = b.address.toLowerCase().includes(q);
      const matchDesc = b.description.toLowerCase().includes(q);
      if (!matchName && !matchAddr && !matchDesc) return false;
    }

    return true;
  });

  // Featured first
  const sorted = [...filtered].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return b.rating - a.rating;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">স্থানীয় ব্যবসা ডিরেক্টরি</h2>
            <span className="text-xs bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded-full border border-amber-200">
              {currentUpazila ? currentUpazila.nameBn : currentDistrict.nameBn}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            উপজেলার ঐতিহ্যবাহী দোকান, শোরুম, রেস্টুরেন্ট ও স্থানীয় সেবাদাতাদের পূর্ণাঙ্গ তালিকা
          </p>
        </div>
        <button
          onClick={onOpenCreate}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          + ব্যবসা প্রতিষ্ঠান যুক্ত করুন
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ব্যবসা বা দোকানের নাম লিখে খুঁজুন (যেমন: মণ্ডা, হোটেল, ফার্মেসি...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors font-medium ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            সব ক্যাটাগরি
          </button>
          {BUSINESS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors font-medium ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Business Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((biz) => (
          <div
            key={biz.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-100 overflow-hidden shrink-0">
                    <img
                      src={biz.photos[0] || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200'}
                      alt={biz.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{biz.name}</h3>
                      {biz.isFeatured && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded shrink-0">
                          ভেরিফায়েড VIP
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">{biz.category}</div>
                    <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold">{biz.rating}</span>
                      <span className="text-slate-400 text-[10px]">({biz.reviewCount} রিভিউ)</span>
                    </div>
                  </div>
                </div>

                {showDemoBadges && biz.isDemo && (
                  <span className="bg-slate-100 text-slate-500 text-[9px] px-1.5 py-0.5 rounded shrink-0">
                    ডেমো তথ্য
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                {biz.description}
              </p>

              <div className="mt-3 space-y-1 text-xs text-slate-500">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{biz.address}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{biz.openingHours}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <a
                href={`tel:${biz.phone.replace(/[^0-9]/g, '')}`}
                className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>সরাসরি কল</span>
              </a>

              {biz.whatsapp && (
                <a
                  href={`https://wa.me/88${biz.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  title="WhatsApp এ মেসেজ পাঠান"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              )}

              {biz.website && (
                <a
                  href={biz.website}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Store className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-700">কোনো ব্যবসা প্রতিষ্ঠান তালিকাভুক্ত নেই</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            আপনার প্রতিষ্ঠানটি এখানে যুক্ত করুন এবং উপজেলার স্থানীয় গ্রাহকদের সাথে যুক্ত হোন।
          </p>
          <button
            onClick={onOpenCreate}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            + ব্যবসা যুক্ত করুন
          </button>
        </div>
      )}
    </div>
  );
};
