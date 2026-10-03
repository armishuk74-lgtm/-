import React from 'react';
import { Landmark, GraduationCap, MapPin, Pill, Building, ShieldCheck, Fuel } from 'lucide-react';
import { District, Upazila } from '../../types';

interface GovtEducationPlacesViewProps {
  category: 'education' | 'places' | 'banks' | 'pharmacies' | 'mosques' | 'govt' | 'petrol' | 'food';
  currentDistrict: District;
  currentUpazila: Upazila | null;
}

export const GovtEducationPlacesView: React.FC<GovtEducationPlacesViewProps> = ({
  category,
  currentDistrict,
  currentUpazila,
}) => {
  const getTitleAndData = () => {
    switch (category) {
      case 'education':
        return {
          title: 'শিক্ষা প্রতিষ্ঠান ও বিশ্ববিদ্যালয়',
          icon: GraduationCap,
          color: 'emerald',
          items: [
            { name: 'বাংলাদেশ কৃষি বিশ্ববিদ্যালয় (বাকৃবি)', place: 'ময়মনসিংহ সদর', desc: 'দেশের প্রাচীনতম ও সর্ববৃহৎ কৃষি শিক্ষা ও গবেষণা কেন্দ্র।' },
            { name: 'আনন্দ মোহন কলেজ', place: 'ময়মনসিংহ সদর', desc: 'শতবর্ষী প্রাচীন ঐতিহ্যবাহী শিক্ষাপ্রতিষ্ঠান।' },
            { name: 'জাতীয় কবি কাজী নজরুল ইসলাম বিশ্ববিদ্যালয়', place: 'ত্রিশাল', desc: 'নজরুল স্মৃতির তীর্থভূমি দরিরামপুরে অবস্থিত।' },
            { name: 'নেত্রকোনা সরকারি কলেজ', place: 'নেত্রকোনা সদর', desc: 'নেত্রকোনা জেলার প্রধান ঐতিহ্যবাহী উচ্চ শিক্ষা প্রতিষ্ঠান।' },
            { name: 'বিরিশিরি ক্ষুদ্র নৃগোষ্ঠীর কালচারাল একাডেমি', place: 'দুর্গাপুর', desc: 'গারো, হাজং ও ক্ষুদ্র নৃগোষ্ঠীর সমৃদ্ধ সংস্কৃতি চর্চা কেন্দ্র।' },
          ],
        };
      case 'places':
        return {
          title: 'দর্শনীয় স্থান ও পর্যটন স্পট',
          icon: MapPin,
          color: 'teal',
          items: [
            { name: 'সুসং দুর্গাপুরের বিরিশিরি চিনামাটির পাহাড় ও সোমেশ্বরী নদী', place: 'দুর্গাপুর, নেত্রকোনা', desc: 'সাদা মাটির পাহাড় ও স্বচ্ছ কাঁচের মতো ফিরোজা রঙের হ্রদ।' },
            { name: 'মুক্তাগাছা জমিদারবাড়ি ও রাজপ্রাসাদ', place: 'মুক্তাগাছা, ময়মনসিংহ', desc: 'মুঘল ও ব্রিটিশ আমলের ঐতিহাসিক স্থাপত্য নিদর্শন।' },
            { name: 'শশীলজ ও আলেকজান্ডার ক্যাসেল', place: 'ময়মনসিংহ সদর', desc: 'ময়মনসিংহের রাজন্যবর্গের নান্দনিক ঐতিহাসিক প্রাসাদ।' },
            { name: 'ডিঙ্গাপোতা হাওর ও কংস নদীর তীর', place: 'মোহনগঞ্জ ও খালিয়াজুড়ি', desc: 'বর্ষায় থৈ থৈ জলরাশি আর শীতে অতিথি পাখির কলকাকলি।' },
            { name: 'বিজয়পুর সীমান্ত ফাঁড়ি ও রানীখং গীর্জা', place: 'দুর্গাপুর, নেত্রকোনা', desc: 'পাহাড় ও মেঘের অপরূপ মায়াবী সীমান্ত।' },
          ],
        };
      case 'banks':
        return {
          title: 'ব্যাংক শাখা, এজেন্ট বুথ ও এটিএম',
          icon: Landmark,
          color: 'slate',
          items: [
            { name: 'সোনালী ব্যাংক পিএলসি (প্রধান শাখা)', place: 'সদর ও সকল উপজেলা', desc: 'সরকারি ট্রেজারি ও সকল প্রকার অনলাইন ব্যাংকিং সেবা।' },
            { name: 'ইসলামী ব্যাংক বাংলাদেশ লিমিটেড', place: 'প্রধান বাজারসমূহ', desc: 'শাখা, উপশাখা এবং ২৪ ঘণ্টা নগদ জমা ও উত্তোলনের সিআরএম বুথ।' },
            { name: 'ডাচ বাংলা ব্যাংক ফাস্ট ট্র্যাক ও এটিএম', place: 'পৌরসভা ও বাসস্ট্যান্ড', desc: 'যেকোনো ভিসা/মাস্টারকার্ড ও নেক্সাস কার্ডের এটিএম সুবিধা।' },
            { name: 'বিকাশ ও নগদ এজেন্ট পয়েন্ট', place: 'সকল মোড়ে মোড়ে', desc: 'দ্রুত ক্যাশ ইন, ক্যাশ আউট ও ইউটিলিটি বিল পেমেন্ট।' },
          ],
        };
      case 'pharmacies':
        return {
          title: '২৪ ঘণ্টা জরুরি ফার্মেসি সেবা',
          icon: Pill,
          color: 'fuchsia',
          items: [
            { name: 'মেডিকেল গেট সেন্ট্রাল ফার্মেসি (২৪ ঘণ্টা খোলা)', place: 'ময়মনসিংহ মেডিকেল কলেজ হাসপাতাল মোড়', desc: 'জীবন রক্ষাকারী ওষুধ ও ইনসুলিন সার্বক্ষণিক মজুত।' },
            { name: 'মুক্তাগাছা সেবা ফার্মেসি ও সার্জিক্যাল', place: 'উপজেলা স্বাস্থ্য কমপ্লেক্স রোড', desc: 'প্রেসক্রিপশন অনুযায়ী প্রয়োজনীয় অ্যান্টিবায়োটিক ও ওষুধ।' },
            { name: 'নেত্রকোনা আধুনিক ফার্মেসি', place: 'সদর হাসপাতাল গেট সংলগ্ন', desc: 'সারারাত খোলা ও হোম ডেলিভারি সুবিধা।' },
          ],
        };
      case 'govt':
        return {
          title: 'সরকারি ও ইউনিয়ন ডিজিটাল সেবা',
          icon: ShieldCheck,
          color: 'blue',
          items: [
            { name: 'উপজেলা নির্বাহী অফিসারের কার্যালয় (ইউএনও অফিস)', place: 'উপজেলা পরিষদ চত্বর', desc: 'প্রশাসনিক তদারকি, নাগরিক অভিযোগ ও সাধারণ প্রত্যয়ন।' },
            { name: 'উপজেলা ভূমি অফিস ও এসি ল্যান্ড', place: 'উপজেলা সদর', desc: 'ই-নামজারি, খতিয়ান ও ভূমি উন্নয়ন কর সেবা।' },
            { name: 'ইউনিয়ন ডিজিটাল সেন্টার (UDC)', place: 'সকল ইউনিয়ন পরিষদ', desc: 'অনলাইন জন্ম-মৃত্যু নিবন্ধন, নাগরিক সনদ ও সরকারি চাকরির আবেদন।' },
          ],
        };
      default:
        return {
          title: 'উপজেলার তথ্য ও স্থান',
          icon: Building,
          color: 'slate',
          items: [
            { name: 'কেন্দ্রীয় জামে মসজিদ', place: 'পৌরসভা চত্বর', desc: 'ঐতিহ্যবাহী জামে মসজিদ ও সামাজিক কেন্দ্র।' },
            { name: 'পদ্মা ও মেঘনা পেট্রোল পাম্প', place: 'মহাসড়ক সংলগ্ন', desc: 'সিএনজি ও পেট্রোলিয়াম ফুয়েলিং পয়েন্ট।' },
          ],
        };
    }
  };

  const info = getTitleAndData();
  const Icon = info.icon;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <Icon className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold">{info.title}</h2>
        </div>
        <p className="text-xs text-slate-300">
          {currentUpazila ? currentUpazila.nameBn : currentDistrict.nameBn} এলাকার গুরুত্বপূর্ণ নাগরিক ও জনস্বার্থমূলক তথ্যাবলী
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {info.items.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
            <div className="text-xs text-emerald-700 font-medium flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              <span>{item.place}</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
