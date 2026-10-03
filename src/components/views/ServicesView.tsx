import React, { useState } from 'react';
import {
  Wrench,
  Star,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Search,
  PlusCircle,
  ThumbsUp,
} from 'lucide-react';
import { LocalServiceProvider, District, Upazila } from '../../types';
import { SERVICE_TYPES } from '../../data/categories';

interface ServicesViewProps {
  services: LocalServiceProvider[];
  currentDistrict: District;
  currentUpazila: Upazila | null;
  onOpenCreate: () => void;
  showDemoBadges: boolean;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  services,
  currentDistrict,
  currentUpazila,
  onOpenCreate,
  showDemoBadges,
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = services.filter((s) => {
    if (s.districtId !== currentDistrict.id) return false;
    if (currentUpazila && s.upazilaId !== currentUpazila.id) return false;
    if (s.approvalStatus !== 'approved') return false;

    if (selectedType !== 'all' && s.serviceType.toLowerCase() !== selectedType.toLowerCase()) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = s.name.toLowerCase().includes(q);
      const matchType = s.serviceType.toLowerCase().includes(q);
      const matchArea = s.area.toLowerCase().includes(q);
      if (!matchName && !matchType && !matchArea) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">মিস্ত্রি ও হোম সার্ভিস</h2>
            <span className="text-xs bg-cyan-50 text-cyan-800 font-semibold px-2 py-0.5 rounded-full border border-cyan-200">
              {currentUpazila ? currentUpazila.nameBn : currentDistrict.nameBn}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            ইলেকট্রিশিয়ান, প্লাম্বার, এসি ও ফ্রিজ মেকানিক, রাজমিস্ত্রি ও ড্রাইভারদের সাথে সরাসরি যোগাযোগ করুন
          </p>
        </div>
        <button
          onClick={onOpenCreate}
          className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          + সেবাদাতা হিসেবে নাম দিন
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="কাজের ধরণ বা সেবাদাতার নাম লিখুন (যেমন: ইলেকট্রিশিয়ান, প্লাম্বার, ক্যামেরা, ড্রাইভার...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors font-medium ${
              selectedType === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            সকল সেবা
          </button>
          {SERVICE_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors font-medium ${
                selectedType === type
                  ? 'bg-cyan-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((srv) => (
          <div
            key={srv.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-4 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-800 flex items-center justify-center shrink-0 border border-cyan-100">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{srv.name}</h3>
                    <div className="text-xs font-semibold text-cyan-800">{srv.serviceType}</div>
                    <div className="flex items-center gap-1 text-xs text-amber-600 mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold">{srv.rating}</span>
                      <span className="text-slate-400 text-[10px]">({srv.reviewCount} কাজ সম্পন্ন)</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium shrink-0">
                  {srv.experienceYears} বছরের অভিজ্ঞতা
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 my-2 leading-relaxed">
                {srv.description}
              </p>

              <div className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>সার্ভিস এলাকা: {srv.area}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
              <a
                href={`tel:${srv.phone.replace(/[^0-9]/g, '')}`}
                className="w-full py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>সরাসরি কল করুন ({srv.phone})</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
          কোনো মিস্ত্রি বা টেকনিশিয়ান তালিকাভুক্ত নেই।
        </div>
      )}
    </div>
  );
};
