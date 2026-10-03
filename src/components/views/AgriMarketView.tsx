import React from 'react';
import { Sprout, TrendingUp, Calendar, MapPin, Scale } from 'lucide-react';
import { District, Upazila } from '../../types';

interface AgriMarketViewProps {
  currentDistrict: District;
  currentUpazila: Upazila | null;
}

export const AgriMarketView: React.FC<AgriMarketViewProps> = ({
  currentDistrict,
  currentUpazila,
}) => {
  const sampleAgriItems = [
    { name: 'আমন ও বোরো মোটা ধান (ব্রি-২৮)', price: '৳১,২০০ - ৳১,২৫০', unit: 'প্রতি মণ (৪০ কেজি)', trend: 'up', note: 'হাওর ও চরাঞ্চলের নতুন ধান' },
    { name: 'সুগন্ধি কাটারিভোগ ও চিনিগুঁড়া চাল', price: '৳৩,৪০০ - ৳৩,৬০০', unit: 'প্রতি মণ', trend: 'stable', note: 'উৎকৃষ্ট মানের নিজস্ব ফলন' },
    { name: 'মুক্তাগাছা ও ফুলবাড়িয়া খাঁটি পাটালি গুড়', price: '৳২৫০ - ৳২৮০', unit: 'প্রতি কেজি', trend: 'stable', note: 'রাসায়নিকমুক্ত তাজা গুড়' },
    { name: 'গফরগাঁওয়ের বিখ্যাত গোল বেগুন', price: '৳৫০ - ৳৬৫', unit: 'প্রতি কেজি', trend: 'down', note: 'সরাসরি ক্ষেত থেকে সংগৃহীত' },
    { name: 'মোহনগঞ্জ হাওরের দেশি জ্যান্ত শিং ও মাগুর', price: '৳৬৫০ - ৳৭৫০', unit: 'প্রতি কেজি', trend: 'up', note: 'আড়ত থেকে সরাসরি পাইকারি সরবরাহ' },
    { name: 'সরিষা ও তিলের বীজ', price: '৳৩,০০০ - ৳৩,২০০', unit: 'প্রতি মণ', trend: 'stable', note: 'তেল নিষ্কাশনের জন্য উপযুক্ত' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-emerald-800 text-white p-5 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <Sprout className="w-5 h-5 text-emerald-300" />
          <h2 className="text-lg font-bold">কৃষি বাজার ও পাইকারি বাজারদর</h2>
        </div>
        <p className="text-xs text-emerald-100">
          {currentUpazila ? currentUpazila.nameBn : currentDistrict.nameBn} উপজেলার স্থানীয় হাট ও আড়তের পাইকারি পণ্যের সাম্প্রতিক বাজারদর (ডেমো তথ্য)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {sampleAgriItems.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold text-slate-900">{item.name}</div>
            <div className="text-base font-extrabold text-emerald-700 mt-1">{item.price}</div>
            <div className="text-[11px] text-slate-500">{item.unit}</div>
            <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-slate-500">
              {item.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
