import React, { useState } from 'react';
import {
  Home,
  MapPin,
  Phone,
  Bed,
  Bath,
  Maximize2,
  Search,
  PlusCircle,
  Tag,
} from 'lucide-react';
import { RentalListing, District, Upazila } from '../../types';
import { RENTAL_TYPES } from '../../data/categories';

interface RentalsViewProps {
  rentals: RentalListing[];
  currentDistrict: District;
  currentUpazila: Upazila | null;
  onOpenCreate: () => void;
  showDemoBadges: boolean;
}

export const RentalsView: React.FC<RentalsViewProps> = ({
  rentals,
  currentDistrict,
  currentUpazila,
  onOpenCreate,
  showDemoBadges,
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = rentals.filter((r) => {
    if (r.districtId !== currentDistrict.id) return false;
    if (currentUpazila && r.upazilaId !== currentUpazila.id) return false;
    if (r.approvalStatus !== 'approved') return false;

    if (selectedType !== 'all' && r.listingType !== selectedType) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchLoc = r.location.toLowerCase().includes(q);
      const matchDesc = r.description.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchDesc) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">বাসা ও দোকান ভাড়া</h2>
            <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded-full border border-indigo-200">
              {currentUpazila ? currentUpazila.nameBn : currentDistrict.nameBn}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            ফ্যামিলি বাসা, ব্যাচেলর মেস, কমার্শিয়াল দোকান ও অফিস ভাড়ার পূর্ণাঙ্গ তথ্য
          </p>
        </div>
        <button
          onClick={onOpenCreate}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          + ভাড়ার বিজ্ঞাপন দিন
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="এলাকা বা ফ্ল্যাটের ধরন লিখে খুঁজুন (যেমন: ৩ রুম, ব্যাচেলর, ছোট বাজার, সিডস্টোর...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
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
            সব ধরনের ভাড়া
          </button>
          {RENTAL_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors font-medium capitalize ${
                selectedType === type
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/10 bg-slate-100">
                <img
                  src={item.photos[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600'}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-indigo-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded capitalize">
                  {item.listingType}
                </span>
              </div>

              <div className="p-4">
                <div className="text-lg font-black text-indigo-700 tabular-nums">
                  ৳{item.rent.toLocaleString('bn-BD')} <span className="text-xs font-normal text-slate-500">/ মাস</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mt-1">{item.title}</h3>

                <div className="flex items-center gap-3 text-xs text-slate-500 my-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{item.size}</span>
                  </div>
                  {item.bedrooms && (
                    <div className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5" />
                      <span>{item.bedrooms} বেড</span>
                    </div>
                  )}
                  {item.bathrooms && (
                    <div className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5" />
                      <span>{item.bathrooms} বাথ</span>
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="line-clamp-1">{item.location}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <a
                href={`tel:${item.contact.replace(/[^0-9]/g, '')}`}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>ভাড়া নিতে যোগাযোগ ({item.contact})</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
          কোনো ভাড়ার তালিকা পাওয়া যায়নি।
        </div>
      )}
    </div>
  );
};
