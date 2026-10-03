import React from 'react';
import { Car, Train, Navigation, Phone, Clock, MapPin } from 'lucide-react';
import { District, Upazila } from '../../types';

interface TransportViewProps {
  currentDistrict: District;
  currentUpazila: Upazila | null;
}

export const TransportView: React.FC<TransportViewProps> = ({
  currentDistrict,
  currentUpazila,
}) => {
  const routes = [
    {
      title: 'হাওর এক্সপ্রেস (ট্রেন নং ৭১৯/৭২০)',
      type: 'আন্তঃনগর ট্রেন',
      route: 'ঢাকা ⇌ ময়মনসিংহ ⇌ শ্যামগঞ্জ ⇌ নেত্রকোনা ⇌ মোহনগঞ্জ',
      schedule: 'ঢাকা ছাড়ে: সকাল ১০:১৫ | মোহনগঞ্জ ছাড়ে: রাত ১১:৩০',
      contact: 'কমলাপুর / ময়মনসিংহ / মোহনগঞ্জ রেলওয়ে স্টেশন',
      badge: 'জনপ্রিয় ট্রেন',
    },
    {
      title: 'এনা ও সৌখিন পরিবহন (বাস সার্ভিস)',
      type: 'ডাইরেক্ট বাস',
      route: 'ঢাকা (মহাখালী) ⇌ ভালুকা ⇌ ত্রিশাল ⇌ ময়মনসিংহ সদর (মাসকান্দা)',
      schedule: 'প্রতি ১৫ মিনিট পর পর ২৪ ঘণ্টা চালু',
      contact: 'মাসকান্দা বাস টার্মিনাল: ০১৭১১-XXXXXX (ডেমো)',
      badge: 'নিয়মিত বাস',
    },
    {
      title: 'বিরিশিরি ও দুর্গাপুর পর্যটন সিএনজি/মাহিন্দ্রা সার্ভিস',
      type: 'লোকাল সিএনজি',
      route: 'ময়মনসিংহ / শ্যামগঞ্জ মোড় ⇌ দুর্গাপুর (বিরিশিরি ব্রিজ ঘাট)',
      schedule: 'সকাল ৬:০০ হতে সন্ধ্যা ৭:০০ পর্যন্ত',
      contact: 'শ্যামগঞ্জ সিএনজি স্ট্যান্ড',
      badge: 'ট্যুরিস্ট রুট',
    },
    {
      title: 'মোহনগঞ্জ টু খালিয়াজুড়ি স্পিডবোট ও ইঞ্জিন ট্রলার ঘাট',
      type: 'নৌপথ পরিবহন',
      route: 'মোহনগঞ্জ ঘাট ⇌ খালিয়াজুড়ি ও ডিঙ্গাপোতা হাওর',
      schedule: 'সারাদিন পর্যাপ্ত ট্রলার ও স্পিডবোট ভাড়ায় পাওয়া যায়',
      contact: 'মোহনগঞ্জ বড় স্টেশন ঘাট',
      badge: 'হাওর রুট',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-sky-800 text-white p-5 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <Car className="w-5 h-5 text-sky-300" />
          <h2 className="text-lg font-bold">পরিবহন, ট্রেন ও বাস কাউন্টার</h2>
        </div>
        <p className="text-xs text-sky-100">
          {currentUpazila ? currentUpazila.nameBn : currentDistrict.nameBn} এবং রাজধানী ঢাকা ও পার্শ্ববর্তী এলাকার সাথে যোগাযোগের প্রধান বাহন ও সময়সূচি
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routes.map((r, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                {r.type}
              </span>
              <span className="text-[10px] text-slate-500">{r.badge}</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">{r.title}</h3>
            <div className="text-xs text-slate-600 mt-2 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>{r.route}</span>
            </div>
            <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{r.schedule}</span>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{r.contact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
