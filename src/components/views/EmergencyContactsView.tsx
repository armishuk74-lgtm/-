import React, { useState } from 'react';
import {
  PhoneCall,
  Shield,
  Flame,
  Ambulance,
  Heart,
  AlertTriangle,
  Building,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { EmergencyContact, District, Upazila } from '../../types';

interface EmergencyContactsViewProps {
  contacts: EmergencyContact[];
  currentDistrict: District;
  currentUpazila: Upazila | null;
  showDemoBadges: boolean;
}

export const EmergencyContactsView: React.FC<EmergencyContactsViewProps> = ({
  contacts,
  currentDistrict,
  currentUpazila,
  showDemoBadges,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = contacts.filter((c) => {
    // District match or national (all)
    if (c.districtId !== currentDistrict.id && c.districtId !== 'all') return false;
    // Upazila match or all upazilas in this district
    if (currentUpazila && c.upazilaId !== 'all' && c.upazilaId !== currentUpazila.id) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchType = c.serviceTypeBn.toLowerCase().includes(q);
      const matchName = c.contactName.toLowerCase().includes(q);
      const matchPhone = c.phone.toLowerCase().includes(q);
      if (!matchType && !matchName && !matchPhone) return false;
    }

    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'police':
        return Shield;
      case 'fire':
        return Flame;
      case 'ambulance':
        return Ambulance;
      case 'hospital':
        return Heart;
      case 'uno':
        return Building;
      default:
        return PhoneCall;
    }
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
        <div className="text-xs text-red-900 leading-relaxed">
          <strong>জরুরি ব্যবহারের জন্য গুরুত্বপূর্ণ নোটিশ:</strong> যেকোনো গুরুতর জীবন-বিপন্নকর পরিস্থিতিতে সর্বাগ্রে <strong>৯৯৯</strong> জাতীয় জরুরি সেবায় ফোন করুন। নিচে উল্লেখিত স্থানীয় নম্বরসমূহ উপজেলা ও জেলা প্রশাসনের তালিকাভুক্ত সেবার তথ্যাবলী।
        </div>
      </div>

      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">জরুরি যোগাযোগ ডিরেক্টরি</h2>
          <p className="text-xs text-slate-500">
            {currentUpazila ? `${currentUpazila.nameBn} উপজেলা` : `${currentDistrict.nameBn} জেলা`} ও জাতীয় পর্যায়ের জরুরি নম্বর
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="থানা, ফায়ার স্টেশন বা হাসপাতালের নাম লিখে সার্চ করুন..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {filtered.map((item) => {
          const Icon = getIcon(item.serviceType);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-red-200 p-4 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {item.serviceTypeBn}
                      </h3>
                      <div className="text-[11px] text-slate-500">{item.contactName}</div>
                    </div>
                  </div>

                  {showDemoBadges && item.isDemo && (
                    <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded shrink-0">
                      ডেমো নম্বর
                    </span>
                  )}
                </div>

                <div className="my-2.5 text-xs text-slate-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>উপলব্ধতা: {item.availability}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <a
                  href={`tel:${item.phone.replace(/[^0-9]/g, '')}`}
                  className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>এখনই কল করুন ({item.phone})</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
          কোনো জরুরি নম্বর পাওয়া যায়নি।
        </div>
      )}
    </div>
  );
};
