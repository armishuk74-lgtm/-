import React, { useState } from 'react';
import {
  X,
  Upload,
  Tag,
  Briefcase,
  Droplet,
  Store,
  Home,
  Wrench,
  Newspaper,
  Megaphone,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { District, Upazila, User, BloodGroup } from '../types';
import {
  MARKETPLACE_CATEGORIES,
  BUSINESS_CATEGORIES,
  JOB_CATEGORIES,
  SERVICE_TYPES,
  RENTAL_TYPES,
  NEWS_CATEGORIES,
} from '../data/categories';
import { StorageService } from '../services/storageService';

interface PostCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDistrict: District;
  currentUpazila: Upazila | null;
  upazilas: Upazila[];
  currentUser: User;
  onPostSuccess: (message: string) => void;
  initialType?: string;
}

export const PostCreateModal: React.FC<PostCreateModalProps> = ({
  isOpen,
  onClose,
  currentDistrict,
  currentUpazila,
  upazilas,
  currentUser,
  onPostSuccess,
  initialType = 'marketplace',
}) => {
  const [postType, setPostType] = useState<string>(initialType);
  const [selectedUpazilaId, setSelectedUpazilaId] = useState<string>(
    currentUpazila ? currentUpazila.id : upazilas[0]?.id || 'mymensingh-sadar'
  );

  // Common Form States
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState(MARKETPLACE_CATEGORIES[0]);
  const [condition, setCondition] = useState<'new' | 'used'>('used');
  const [imageUrl, setImageUrl] = useState('');

  // Blood Request specific
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('B+');
  const [requiredUnits, setRequiredUnits] = useState('1');
  const [hospital, setHospital] = useState('');
  const [neededTime, setNeededTime] = useState('আজকের মধ্যে');
  const [isEmergency, setIsEmergency] = useState(true);

  // Job specific
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState<'Full-time' | 'Part-time'>('Full-time');
  const [deadline, setDeadline] = useState('২০২৬-০৪-৩০');

  // Business specific
  const [openingHours, setOpeningHours] = useState('সকাল ৯:০০ - রাত ৯:০০');
  const [whatsapp, setWhatsapp] = useState('');
  const [website, setWebsite] = useState('');

  // Rental specific
  const [rentalType, setRentalType] = useState('flat');
  const [rentAmount, setRentAmount] = useState('');
  const [rentalSize, setRentalSize] = useState('১২০০ স্কয়ার ফিট');

  // Service specific
  const [serviceType, setServiceType] = useState(SERVICE_TYPES[0]);
  const [experienceYears, setExperienceYears] = useState('5');

  const isAdmin =
    currentUser.role === 'super_admin' ||
    currentUser.role === 'district_admin' ||
    currentUser.role === 'upazila_admin';

  if (!isOpen) return null;

  const availableUpazilas = upazilas.filter((u) => u.districtId === currentDistrict.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const approvalStatus = isAdmin ? 'approved' : 'pending';
    const timestamp = new Date().toISOString();

    if (postType === 'marketplace') {
      if (!title || !price || !phone) {
        alert('অনুগ্রহ করে পণ্যের নাম, দাম এবং ফোন নম্বর লিখুন।');
        return;
      }
      StorageService.saveProduct({
        id: `prod_${Date.now()}`,
        title,
        price: Number(price) || 0,
        isNegotiable: true,
        description,
        condition,
        category,
        districtId: currentDistrict.id,
        upazilaId: selectedUpazilaId,
        location: location || `${currentDistrict.nameBn} সদর`,
        phone,
        sellerName: currentUser.name,
        date: new Date().toISOString().split('T')[0],
        approvalStatus,
        ownerId: currentUser.id,
        images: [imageUrl || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600'],
        isDemo: false,
        createdAt: timestamp,
      });
    } else if (postType === 'blood') {
      if (!title || !hospital || !phone) {
        alert('রোগীর নাম, হাসপাতাল এবং যোগাযোগ নম্বর পূরণ করুন।');
        return;
      }
      StorageService.saveBloodRequest({
        id: `breq_${Date.now()}`,
        patientName: title,
        bloodGroup,
        requiredUnits: Number(requiredUnits) || 1,
        hospital,
        districtId: currentDistrict.id,
        upazilaId: selectedUpazilaId,
        location: location || hospital,
        contactNumber: phone,
        requiredDateTime: neededTime,
        isEmergency,
        ownerId: currentUser.id,
        approvalStatus,
        isDemo: false,
        createdAt: timestamp,
      });
    } else if (postType === 'jobs') {
      if (!title || !company || !salary || !phone) {
        alert('পদের নাম, কোম্পানির নাম ও বেতন উল্লেখ করুন।');
        return;
      }
      StorageService.saveJob({
        id: `job_${Date.now()}`,
        title,
        company,
        salary,
        jobType,
        category,
        districtId: currentDistrict.id,
        upazilaId: selectedUpazilaId,
        location: location || `${currentDistrict.nameBn}`,
        description,
        requirements: ['প্রাসঙ্গিক অভিজ্ঞতা', 'ভালো ব্যবহার', 'সময়নিষ্ঠতা'],
        contact: phone,
        deadline,
        ownerId: currentUser.id,
        approvalStatus,
        isDemo: false,
        createdAt: timestamp,
      });
    } else if (postType === 'business') {
      if (!title || !phone || !location) {
        alert('প্রতিষ্ঠানের নাম, ঠিকানা ও ফোন নম্বর পূরণ করুন।');
        return;
      }
      StorageService.saveBusiness({
        id: `biz_${Date.now()}`,
        name: title,
        category,
        districtId: currentDistrict.id,
        upazilaId: selectedUpazilaId,
        address: location,
        phone,
        whatsapp,
        openingHours,
        description,
        photos: [imageUrl || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600'],
        website,
        isFeatured: false,
        approvalStatus,
        ownerId: currentUser.id,
        rating: 5.0,
        reviewCount: 1,
        isDemo: false,
        createdAt: timestamp,
      });
    } else if (postType === 'rentals') {
      if (!title || !rentAmount || !phone) {
        alert('শিরোনাম, ভাড়ার পরিমাণ ও ফোন নম্বর পূরণ করুন।');
        return;
      }
      StorageService.saveRental({
        id: `rent_${Date.now()}`,
        title,
        listingType: rentalType as any,
        rent: Number(rentAmount) || 0,
        districtId: currentDistrict.id,
        upazilaId: selectedUpazilaId,
        location: location || `${currentDistrict.nameBn}`,
        size: rentalSize,
        photos: [imageUrl || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600'],
        description,
        contact: phone,
        isAvailable: true,
        ownerId: currentUser.id,
        approvalStatus,
        isDemo: false,
        createdAt: timestamp,
      });
    } else if (postType === 'services') {
      if (!title || !phone) {
        alert('আপনার নাম ও মোবাইল নম্বর পূরণ করুন।');
        return;
      }
      StorageService.saveService({
        id: `srv_${Date.now()}`,
        name: title,
        serviceType,
        districtId: currentDistrict.id,
        upazilaId: selectedUpazilaId,
        area: location || 'উপজেলার সকল এলাকা',
        phone,
        experienceYears: Number(experienceYears) || 1,
        rating: 5.0,
        reviewCount: 1,
        isAvailable: true,
        description,
        photos: [imageUrl || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600'],
        approvalStatus,
        ownerId: currentUser.id,
        isDemo: false,
      });
    }

    onPostSuccess(
      isAdmin
        ? 'বিজ্ঞাপনটি অবিলম্বে সফলভাবে প্রকাশিত হয়েছে!'
        : 'বিজ্ঞাপনটি গৃহীত হয়েছে! উপজেলা এডমিনের পর্যালোচনার পর প্রকাশিত হবে।'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-900">নতুন তথ্য বা বিজ্ঞাপন পোস্ট করুন</h2>
            <p className="text-xs text-slate-500">
              {currentDistrict.nameBn} জেলার নির্ধারিত উপজেলায় তাৎক্ষণিক প্রকাশ করুন
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Post Type Selector Pills */}
        <div className="p-3 border-b border-slate-100 bg-slate-50/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
          {[
            { id: 'marketplace', label: 'পণ্য বিক্রি', icon: Tag },
            { id: 'blood', label: 'রক্তের আবেদন', icon: Droplet },
            { id: 'jobs', label: 'চাকরি নিয়োগ', icon: Briefcase },
            { id: 'business', label: 'স্থানীয় ব্যবসা', icon: Store },
            { id: 'rentals', label: 'বাসা/দোকান ভাড়া', icon: Home },
            { id: 'services', label: 'মিস্ত্রি সার্ভিস', icon: Wrench },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = postType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPostType(item.id)}
                className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Target Upazila */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              উপজেলা নির্বাচন করুন <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedUpazilaId}
              onChange={(e) => setSelectedUpazilaId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              {availableUpazilas.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nameBn} ({currentDistrict.nameBn})
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Fields based on Type */}
          {postType === 'marketplace' && (
            <>
              <div>
                <label className="block font-bold text-slate-700 mb-1">পণ্যের নাম/শিরোনাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: Xiaomi Note 13 Pro 8/256GB"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">মূল্য (টাকায়) *</label>
                  <input
                    type="number"
                    required
                    placeholder="যেমন: 22000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {MARKETPLACE_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">পণ্যের অবস্থা</label>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      checked={condition === 'used'}
                      onChange={() => setCondition('used')}
                    />
                    <span>ব্যবহৃত (Used)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer ml-3">
                    <input
                      type="radio"
                      checked={condition === 'new'}
                      onChange={() => setCondition('new')}
                    />
                    <span>সম্পূর্ণ নতুন (Brand New)</span>
                  </label>
                </div>
              </div>
            </>
          )}

          {postType === 'blood' && (
            <>
              <div>
                <label className="block font-bold text-slate-700 mb-1">রোগীর নাম ও সমস্যা *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: রহিমা বেগম (সিজার অপারেশন)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">রক্তের গ্রুপ *</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-rose-700"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">কত ব্যাগ প্রয়োজন</label>
                  <input
                    type="number"
                    value={requiredUnits}
                    onChange={(e) => setRequiredUnits(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">হাসপাতালের নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ময়মনসিংহ মেডিকেল কলেজ হাসপাতাল (ওয়ার্ড নং ৪)"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="emg"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="emg" className="text-rose-700 font-bold cursor-pointer">
                  জরুরি প্রয়োজন (ইমার্জেন্সি লাল ব্যাজ প্রদর্শন)
                </label>
              </div>
            </>
          )}

          {postType === 'jobs' && (
            <>
              <div>
                <label className="block font-bold text-slate-700 mb-1">পদের নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: কম্পিউটার অপারেটর ও ক্যাশিয়ার"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">প্রতিষ্ঠান/কোম্পানি *</label>
                  <input
                    type="text"
                    required
                    placeholder="কোম্পানির নাম"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">বেতন কাঠামো *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ১৫,০০০ - ২০,০০০ টাকা"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
            </>
          )}

          {postType === 'business' && (
            <>
              <div>
                <label className="block font-bold text-slate-700 mb-1">প্রতিষ্ঠানের নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="দোকান বা ব্যবসার নাম"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {BUSINESS_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">খোলার সময়সূচি</label>
                  <input
                    type="text"
                    value={openingHours}
                    onChange={(e) => setOpeningHours(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
            </>
          )}

          {/* Location & Phone (Common) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">ঠিকানা / এলাকা *</label>
              <input
                type="text"
                required
                placeholder="যেমন: ছোট বাজার, মুক্তাগাছা"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">মোবাইল নম্বর *</label>
              <input
                type="text"
                required
                placeholder="017XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">বিস্তারিত বিবরণ</label>
            <textarea
              rows={3}
              placeholder="পণ্য বা সেবার বিস্তারিত সুবিধা ও বৈশিষ্ট্য লিখুন..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl resize-none"
            />
          </div>

          {/* Image URL / Upload Field */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">ছবির লিংক (ঐচ্ছিক)</label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              সরাসরি ওয়েব ইমেজ URL দিন অথবা খালি রাখুন (স্বয়ংক্রিয় প্লেসহোল্ডার যুক্ত হবে)।
            </p>
          </div>

          {/* Approval Notice */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2 text-slate-600 text-[11px]">
            <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              {isAdmin
                ? 'এডমিন অ্যাকাউন্টে লগইন থাকায় এটি সঙ্গে সঙ্গে সরাসরি অনুমোদিত হবে।'
                : 'সকল পোস্ট উপজেলা মডারেশনের পর সার্বজনীন ডিরেক্টরিতে দৃশ্যমান হবে। কোনো অবৈধ বা বিভ্রান্তিকর তথ্য দেওয়া যাবে না।'}
            </span>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
            >
              নিশ্চিত করুন ও প্রকাশ করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
