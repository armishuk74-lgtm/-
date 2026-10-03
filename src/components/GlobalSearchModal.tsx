import React, { useState } from 'react';
import {
  Search,
  X,
  Tag,
  Store,
  Briefcase,
  Droplet,
  HeartPulse,
  Home,
  Wrench,
  Newspaper,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import {
  MarketplaceProduct,
  BusinessListing,
  JobListing,
  BloodDonor,
  Doctor,
  LocalServiceProvider,
  RentalListing,
  LocalNews,
  District,
  Upazila,
} from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: MarketplaceProduct[];
  businesses: BusinessListing[];
  jobs: JobListing[];
  bloodDonors: BloodDonor[];
  doctors: Doctor[];
  services: LocalServiceProvider[];
  rentals: RentalListing[];
  news: LocalNews[];
  currentDistrict: District;
  currentUpazila: Upazila | null;
  onSelectResult: (type: string, id: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  products,
  businesses,
  jobs,
  bloodDonors,
  doctors,
  services,
  rentals,
  news,
  currentDistrict,
  currentUpazila,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search aggregations
  const matchedProducts = q
    ? products.filter(
        (p) =>
          p.districtId === currentDistrict.id &&
          (!currentUpazila || p.upazilaId === currentUpazila.id) &&
          (p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q))
      )
    : [];

  const matchedBusinesses = q
    ? businesses.filter(
        (b) =>
          b.districtId === currentDistrict.id &&
          (!currentUpazila || b.upazilaId === currentUpazila.id) &&
          (b.name.toLowerCase().includes(q) ||
            b.category.toLowerCase().includes(q) ||
            b.description.toLowerCase().includes(q))
      )
    : [];

  const matchedJobs = q
    ? jobs.filter(
        (j) =>
          j.districtId === currentDistrict.id &&
          (!currentUpazila || j.upazilaId === currentUpazila.id) &&
          (j.title.toLowerCase().includes(q) ||
            j.company.toLowerCase().includes(q) ||
            j.category.toLowerCase().includes(q))
      )
    : [];

  const matchedDoctors = q
    ? doctors.filter(
        (d) =>
          d.districtId === currentDistrict.id &&
          (!currentUpazila || d.upazilaId === currentUpazila.id) &&
          (d.name.toLowerCase().includes(q) ||
            d.specialty.toLowerCase().includes(q) ||
            d.chamber.toLowerCase().includes(q))
      )
    : [];

  const matchedServices = q
    ? services.filter(
        (s) =>
          s.districtId === currentDistrict.id &&
          (!currentUpazila || s.upazilaId === currentUpazila.id) &&
          (s.name.toLowerCase().includes(q) ||
            s.serviceType.toLowerCase().includes(q) ||
            s.area.toLowerCase().includes(q))
      )
    : [];

  const matchedRentals = q
    ? rentals.filter(
        (r) =>
          r.districtId === currentDistrict.id &&
          (!currentUpazila || r.upazilaId === currentUpazila.id) &&
          (r.title.toLowerCase().includes(q) ||
            r.listingType.toLowerCase().includes(q) ||
            r.location.toLowerCase().includes(q))
      )
    : [];

  const totalResults =
    matchedProducts.length +
    matchedBusinesses.length +
    matchedJobs.length +
    matchedDoctors.length +
    matchedServices.length +
    matchedRentals.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 sm:pt-20 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="পণ্য, ব্যবসা, চাকরি, রক্তদাতা, ডাক্তার, বাসাভাড়া সার্চ করুন..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm font-medium placeholder-slate-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-1 cursor-pointer"
            >
              মুছুন
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Location Scope Indicator */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              অনুসন্ধানের আওতা: <strong>{currentUpazila ? currentUpazila.nameBn : `${currentDistrict.nameBn} জেলা (সকল)`}</strong>
            </span>
          </div>
          {q && <span>{totalResults} টি ফলাফল পাওয়া গেছে</span>}
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {!q && (
            <div className="py-12 text-center">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs text-slate-500">
                বাংলা অথবা ইংরেজিতে যেকোনো কি-ওয়ার্ড লিখে সার্চ করুন (যেমন: "মোবাইল", "মণ্ডা", "মেডিসিন", "ফ্ল্যাট")
              </p>
            </div>
          )}

          {q && totalResults === 0 && (
            <div className="py-12 text-center text-xs text-slate-500">
              "{query}" সম্পর্কিত কোনো তথ্য এই এলাকায় পাওয়া যায়নি।
            </div>
          )}

          {/* Products */}
          {matchedProducts.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-600" />
                <span>মার্কেটপ্লেস কেনাবেচা ({matchedProducts.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectResult('marketplace', p.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                        {p.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        ৳{p.price.toLocaleString('bn-BD')} &middot; {p.location}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Businesses */}
          {matchedBusinesses.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-amber-600" />
                <span>স্থানীয় ব্যবসা ({matchedBusinesses.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedBusinesses.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      onSelectResult('business', b.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-amber-700">
                        {b.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {b.category} &middot; {b.address}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jobs */}
          {matchedJobs.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>চাকরির খবর ({matchedJobs.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedJobs.map((j) => (
                  <div
                    key={j.id}
                    onClick={() => {
                      onSelectResult('jobs', j.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700">
                        {j.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {j.company} &middot; বেতন: {j.salary}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Doctors */}
          {matchedDoctors.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
                <span>ডাক্তার ও চেম্বার ({matchedDoctors.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedDoctors.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => {
                      onSelectResult('healthcare', d.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-teal-700">
                        {d.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {d.specialty} &middot; চেম্বার: {d.chamber}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
