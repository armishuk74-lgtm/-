import React, { useState } from 'react';
import {
  Droplet,
  Heart,
  Phone,
  Calendar,
  MapPin,
  AlertCircle,
  ShieldCheck,
  PlusCircle,
  Eye,
  CheckCircle,
  X,
  Lock,
} from 'lucide-react';
import { BloodDonor, BloodRequest, District, Upazila, BloodGroup, User } from '../../types';

interface BloodDonorViewProps {
  donors: BloodDonor[];
  requests: BloodRequest[];
  currentDistrict: District;
  currentUpazila: Upazila | null;
  currentUser: User;
  onOpenCreateRequest: () => void;
  onOpenRegisterDonor: () => void;
  showDemoBadges: boolean;
}

const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const BloodDonorView: React.FC<BloodDonorViewProps> = ({
  donors,
  requests,
  currentDistrict,
  currentUpazila,
  currentUser,
  onOpenCreateRequest,
  onOpenRegisterDonor,
  showDemoBadges,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(true);
  const [revealedDonorIds, setRevealedDonorIds] = useState<string[]>([]);
  const [confirmRevealDonor, setConfirmRevealDonor] = useState<BloodDonor | null>(null);

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    if (r.districtId !== currentDistrict.id) return false;
    if (currentUpazila && r.upazilaId !== currentUpazila.id) return false;
    if (r.approvalStatus !== 'approved') return false;
    if (selectedGroup !== 'all' && r.bloodGroup !== selectedGroup) return false;
    return true;
  });

  // Filter donors
  const filteredDonors = donors.filter((d) => {
    if (d.districtId !== currentDistrict.id) return false;
    if (currentUpazila && d.upazilaId !== currentUpazila.id) return false;
    if (selectedGroup !== 'all' && d.bloodGroup !== selectedGroup) return false;
    if (onlyAvailable && !d.isAvailable) return false;
    return true;
  });

  const handleRevealPhone = (donor: BloodDonor) => {
    // If privacy is hidden or consent not given
    if (!donor.consentGiven) {
      alert('রক্তদাতা তার নম্বর সর্বসাধারণের জন্য প্রকাশে সম্মতি প্রদান করেননি।');
      return;
    }
    setConfirmRevealDonor(donor);
  };

  const confirmReveal = () => {
    if (confirmRevealDonor) {
      setRevealedDonorIds((prev) => [...prev, confirmRevealDonor.id]);
      setConfirmRevealDonor(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-900 to-rose-700 text-white p-5 sm:p-6 rounded-3xl shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-2">
              <Droplet className="w-3.5 h-3.5 text-rose-200 fill-rose-200" />
              <span>স্বেচ্ছাসেবী রক্তদাতা নেটওয়ার্ক</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {currentUpazila ? `${currentUpazila.nameBn} ব্লাড ব্যাংক ও ডোনার` : `${currentDistrict.nameBn} জেলা ব্লাড ডিরেক্টরি`}
            </h2>
            <p className="text-xs sm:text-sm text-rose-100 max-w-xl mt-1">
              এক ব্যাগ রক্ত বাঁচাতে পারে একটি মুমূর্ষু প্রাণ। জরুরি রক্তের প্রয়োজনে সরাসরি যোগাযোগ করুন অথবা নিজে রক্তদাতা হিসেবে নাম নিবন্ধন করুন।
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
            <button
              onClick={onOpenCreateRequest}
              className="px-4 py-2 bg-white text-rose-800 hover:bg-rose-50 rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
            >
              + রক্তের জরুরি আবেদন করুন
            </button>
            <button
              onClick={onOpenRegisterDonor}
              className="px-4 py-2 bg-rose-800/80 hover:bg-rose-800 border border-white/30 text-white rounded-xl text-xs font-medium cursor-pointer transition-colors"
            >
              রক্তদাতা হিসেবে যোগ দিন
            </button>
          </div>
        </div>
      </div>

      {/* Blood Group Filter Chips */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">রক্তের গ্রুপ নির্বাচন করুন:</span>
          <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500"
            />
            <span>শুধুমাত্র রক্তদানে প্রস্তুত</span>
          </label>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedGroup('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedGroup === 'all'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            সব গ্রুপ
          </button>
          {BLOOD_GROUPS.map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedGroup === grp
                  ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-300'
                  : 'bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100'
              }`}
            >
              {grp}
            </button>
          ))}
        </div>
      </div>

      {/* Section 1: Emergency Blood Requests */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-bold text-slate-900">জরুরি রক্তের আবেদনসমূহ ({filteredRequests.length})</h3>
          </div>
          <button
            onClick={onOpenCreateRequest}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer"
          >
            নতুন আবেদন +
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className={`p-4 rounded-2xl border transition-all ${
                req.isEmergency
                  ? 'bg-rose-50/80 border-rose-200 shadow-xs ring-1 ring-rose-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex flex-col items-center justify-center font-black text-sm shrink-0 shadow-xs">
                    <span>{req.bloodGroup}</span>
                    <span className="text-[9px] font-normal opacity-90">{req.requiredUnits} ব্যাগ</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{req.patientName}</div>
                    <div className="text-xs text-rose-700 font-medium">{req.hospital}</div>
                    <div className="text-[11px] text-slate-500">{req.location}</div>
                  </div>
                </div>

                {req.isEmergency && (
                  <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 animate-pulse">
                    জরুরি
                  </span>
                )}
              </div>

              <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-xs">
                <div className="text-[11px] text-slate-500">
                  সময়: <strong className="text-slate-700">{req.requiredDateTime}</strong>
                </div>
                <a
                  href={`tel:${req.contactNumber.replace(/[^0-9]/g, '')}`}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>কল করুন ({req.contactNumber})</span>
                </a>
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="col-span-full bg-white p-8 rounded-2xl border border-slate-200 text-center">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs text-slate-600 font-medium">
                বর্তমানে এই এলাকায় কোনো জরুরি রক্তের আবেদন পেন্ডিং নেই।
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Section 2: Blood Donors Directory */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-bold text-slate-900">স্বেচ্ছাসেবী রক্তদাতাগণ ({filteredDonors.length})</h3>
          </div>
          <span className="text-xs text-slate-500">প্রাইভেসি সুরক্ষিত ডিরেক্টরি</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredDonors.map((donor) => {
            const isPhoneRevealed = revealedDonorIds.includes(donor.id);
            return (
              <div
                key={donor.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 font-extrabold flex items-center justify-center text-sm">
                        {donor.bloodGroup}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{donor.name}</h4>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{donor.area}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        donor.isAvailable
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {donor.isAvailable ? 'রক্তদানে প্রস্তুত' : 'অপেক্ষমাণ'}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 mt-2 space-y-1">
                    <div>সর্বশেষ রক্তদান: {donor.lastDonationDate}</div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-600">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>সম্মতি প্রদানকৃত রক্তদাতা</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  {isPhoneRevealed ? (
                    <a
                      href={`tel:${donor.phone.replace(/[^0-9]/g, '')}`}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{donor.phone}</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => handleRevealPhone(donor)}
                      className="w-full py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                    >
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span>যোগাযোগ নম্বর দেখুন</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {filteredDonors.length === 0 && (
            <div className="col-span-full bg-white p-8 rounded-2xl border border-slate-200 text-center">
              <Droplet className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs text-slate-600 font-medium">
                আপনার নির্বাচিত ফিল্টারে কোনো রক্তদাতা পাওয়া যায়নি।
              </p>
              <button
                onClick={onOpenRegisterDonor}
                className="mt-3 px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold"
              >
                নিজে রক্তদাতা হিসেবে যুক্ত হন
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Privacy Consent Confirmation Modal */}
      {confirmRevealDonor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-slate-200 shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">রক্তদাতার গোপনীয়তা সুরক্ষা</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              স্বেচ্ছাসেবী রক্তদাতা <strong>{confirmRevealDonor.name}</strong> ({confirmRevealDonor.bloodGroup}) এর মোবাইল নম্বর শুধুমাত্র জরুরি রক্তের প্রয়োজনে যোগাযোগের জন্যই ব্যবহৃত হতে হবে। কোনো প্রকার বিজ্ঞাপনী বা অপ্রাসঙ্গিক ফোন করা আইনত নিষিদ্ধ।
            </p>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setConfirmRevealDonor(null)}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
              >
                বাতিল
              </button>
              <button
                onClick={confirmReveal}
                className="flex-1 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 cursor-pointer"
              >
                আমি সম্মত, নম্বর দিন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
