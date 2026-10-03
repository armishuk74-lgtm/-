import React, { useState } from 'react';
import {
  HeartPulse,
  Building2,
  Phone,
  Clock,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  PlusCircle,
  Search,
  Ambulance,
} from 'lucide-react';
import { Doctor, HealthcareFacility, District, Upazila } from '../../types';

interface DoctorHospitalViewProps {
  doctors: Doctor[];
  facilities: HealthcareFacility[];
  currentDistrict: District;
  currentUpazila: Upazila | null;
  onOpenCreate: () => void;
  showDemoBadges: boolean;
}

export const DoctorHospitalView: React.FC<DoctorHospitalViewProps> = ({
  doctors,
  facilities,
  currentDistrict,
  currentUpazila,
  onOpenCreate,
  showDemoBadges,
}) => {
  const [activeTab, setActiveTab] = useState<'doctors' | 'facilities'>('doctors');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Doctors
  const filteredDoctors = doctors.filter((d) => {
    if (d.districtId !== currentDistrict.id) return false;
    if (currentUpazila && d.upazilaId !== currentUpazila.id) return false;
    if (d.approvalStatus !== 'approved') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = d.name.toLowerCase().includes(q);
      const matchSpec = d.specialty.toLowerCase().includes(q);
      const matchChamber = d.chamber.toLowerCase().includes(q);
      if (!matchName && !matchSpec && !matchChamber) return false;
    }
    return true;
  });

  // Filter Facilities
  const filteredFacilities = facilities.filter((f) => {
    if (f.districtId !== currentDistrict.id) return false;
    if (currentUpazila && f.upazilaId !== currentUpazila.id) return false;
    if (f.approvalStatus !== 'approved') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = f.name.toLowerCase().includes(q);
      const matchAddr = f.address.toLowerCase().includes(q);
      if (!matchName && !matchAddr) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Medical Disclaimer Alert */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-amber-800">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>চিকিৎসা সেবা সম্পর্কিত সতর্কতা:</strong> এই অ্যাপে প্রদত্ত ডাক্তার ও হাসপাতালের তথ্যাবলী শুধুমাত্র সাধারণ তথ্যের উদ্দেশ্যে প্রদর্শিত। ভিজিট ফি, চেম্বার শিডিউল এবং ডাক্তারদের উপস্থিতির বিষয়টি সেবা গ্রহণের পূর্বে সরাসরি ফোন করে নিশ্চিত করে নিন। জরুরি অবস্থায় দ্রুত নিকটস্থ সরকারি স্বাস্থ্য কমপ্লেক্সে যোগাযোগ করুন।
        </p>
      </div>

      {/* Header & Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">ডাক্তার ও হাসপাতাল ডিরেক্টরি</h2>
          <p className="text-xs text-slate-500">
            {currentUpazila ? currentUpazila.nameBn : currentDistrict.nameBn} এলাকার বিশেষজ্ঞ ডাক্তার, ক্লিনিক ও ডায়াগনস্টিক
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'doctors'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            বিশেষজ্ঞ ডাক্তার ({filteredDoctors.length})
          </button>
          <button
            onClick={() => setActiveTab('facilities')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'facilities'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            হাসপাতাল ও ক্লিনিক ({filteredFacilities.length})
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder={
            activeTab === 'doctors'
              ? 'ডাক্তারের নাম বা বিশেষত্ব লিখে খুঁজুন (যেমন: মেডিসিন, শিশু, গাইনি, হার্ট...)'
              : 'হাসপাতাল, ক্লিনিক বা ডায়াগনস্টিকের নাম লিখে খুঁজুন...'
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs"
        />
      </div>

      {/* Doctors Tab Content */}
      {activeTab === 'doctors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-4 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg shrink-0 border border-teal-100">
                      ডাঃ
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-slate-900">{doc.name}</h3>
                        {doc.isVerified && (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 font-medium px-1.5 py-0.2 rounded border border-emerald-200">
                            ভেরিফাইড
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-teal-700 font-medium mt-0.5">{doc.specialty}</div>
                      <div className="text-[11px] text-slate-500">{doc.degrees}</div>
                    </div>
                  </div>

                  {showDemoBadges && doc.isDemo && (
                    <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded shrink-0">
                      ডেমো
                    </span>
                  )}
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5 mt-2">
                  <div>
                    <strong className="text-slate-700">চেম্বার:</strong>{' '}
                    <span className="text-slate-600">{doc.chamber}</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-slate-600">{doc.visitingHours}</span>
                  </div>
                  {doc.consultationFee && (
                    <div className="text-emerald-700 font-medium">ফি: {doc.consultationFee}</div>
                  )}
                  <div className="text-[11px] text-slate-500">{doc.appointmentInfo}</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={`tel:${doc.phone.replace(/[^0-9]/g, '')}`}
                  className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>সিরিয়ালের জন্য কল করুন ({doc.phone})</span>
                </a>
              </div>
            </div>
          ))}

          {filteredDoctors.length === 0 && (
            <div className="col-span-full bg-white p-10 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              কোনো ডাক্তারের তালিকা পাওয়া যায়নি।
            </div>
          )}
        </div>
      )}

      {/* Facilities Tab Content */}
      {activeTab === 'facilities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-4 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{fac.name}</h3>
                      <div className="text-xs text-slate-500 capitalize">{fac.type}</div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="line-clamp-1">{fac.address}</span>
                      </div>
                    </div>
                  </div>

                  {fac.emergencyService24h && (
                    <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200 shrink-0">
                      ২৪ ঘণ্টা জরুরি
                    </span>
                  )}
                </div>

                {fac.services && fac.services.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {fac.services.map((srv, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`tel:${fac.phone.replace(/[^0-9]/g, '')}`}
                  className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>জরুরি হেল্পলাইন ({fac.phone})</span>
                </a>
              </div>
            </div>
          ))}

          {filteredFacilities.length === 0 && (
            <div className="col-span-full bg-white p-10 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              কোনো ক্লিনিক বা হাসপাতাল পাওয়া যায়নি।
            </div>
          )}
        </div>
      )}
    </div>
  );
};
