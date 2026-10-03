import React, { useState } from 'react';
import { X, Search, Check, Building2, MapPin } from 'lucide-react';
import { District, Upazila } from '../types';

interface UpazilaSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  districts: District[];
  upazilas: Upazila[];
  currentDistrict: District;
  currentUpazila: Upazila | null;
  onSelect: (district: District, upazila: Upazila | null) => void;
}

export const UpazilaSelectorModal: React.FC<UpazilaSelectorModalProps> = ({
  isOpen,
  onClose,
  districts,
  upazilas,
  currentDistrict,
  currentUpazila,
  onSelect,
}) => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(currentDistrict.id);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const activeDistrict = districts.find((d) => d.id === selectedDistrictId) || currentDistrict;
  const filteredUpazilas = upazilas.filter((u) => {
    const matchesDistrict = u.districtId === selectedDistrictId;
    if (!matchesDistrict) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      u.nameBn.toLowerCase().includes(q) ||
      u.nameEn.toLowerCase().includes(q) ||
      (u.famousForBn && u.famousForBn.toLowerCase().includes(q))
    );
  });

  const handleSelectUpazila = (upazila: Upazila | null) => {
    onSelect(activeDistrict, upazila);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">উপজেলা ও জেলা নির্বাচন করুন</h2>
              <p className="text-xs text-slate-600">আপনার এলাকার স্থানীয় পরিষেবা ও তথ্য ফিল্টার করতে নির্বাচন করুন</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* District Switcher Tabs */}
        <div className="p-3 bg-slate-100/70 border-b border-slate-200 flex gap-2">
          {districts.map((dist) => {
            const isActive = dist.id === selectedDistrictId;
            return (
              <button
                key={dist.id}
                onClick={() => {
                  setSelectedDistrictId(dist.id);
                  setSearchQuery('');
                }}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Building2 className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{dist.nameBn} জেলা</span>
                <span className="text-[10px] text-slate-600 font-normal">({dist.totalUpazilas})</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`${activeDistrict.nameBn} জেলার যেকোনো উপজেলা বা স্থান সার্চ করুন...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Upazila Selection Grid */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {/* Option: Entire District */}
          <button
            onClick={() => handleSelectUpazila(null)}
            className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
              selectedDistrictId === currentDistrict.id && currentUpazila === null
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50'
            }`}
          >
            <div>
              <div className="text-sm font-bold flex items-center gap-1.5">
                <span>{activeDistrict.nameBn} জেলা (সকল উপজেলা)</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {activeDistrict.nameBn} জেলার সকল উপজেলার সকল তথ্য ও বিজ্ঞাপন একত্রে দেখুন
              </p>
            </div>
            {selectedDistrictId === currentDistrict.id && currentUpazila === null && (
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
          </button>

          <div className="pt-2">
            <div className="text-[11px] font-bold tracking-wider text-slate-600 uppercase mb-2">
              {activeDistrict.nameBn} জেলার উপজেলাসমূহ ({filteredUpazilas.length})
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredUpazilas.map((u) => {
                const isCurrent =
                  currentUpazila?.id === u.id && currentDistrict.id === u.districtId;
                return (
                  <button
                    key={u.id}
                    onClick={() => handleSelectUpazila(u)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-2 ${
                      isCurrent
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-xs'
                        : 'bg-white border-slate-200 hover:border-emerald-200 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{u.nameBn}</div>
                      <div className="text-[11px] text-slate-600 truncate">{u.nameEn}</div>
                      {u.famousForBn && (
                        <div className="text-[10px] text-emerald-700 truncate mt-1">
                          ঐতিহ্য: {u.famousForBn}
                        </div>
                      )}
                    </div>
                    {isCurrent && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
            {filteredUpazilas.length === 0 && (
              <div className="py-8 text-center text-xs text-slate-400">
                "{searchQuery}" নামে কোনো উপজেলা পাওয়া যায়নি।
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>বর্তমানে সক্রিয়: {currentUpazila ? currentUpazila.nameBn : `${currentDistrict.nameBn} (সকল)`}</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium cursor-pointer transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
