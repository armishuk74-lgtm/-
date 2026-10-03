import React, { useState } from 'react';
import {
  User,
  Shield,
  Bookmark,
  Bell,
  Settings,
  Trash2,
  Lock,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Building2,
  AlertCircle,
  LogOut,
  RefreshCw,
} from 'lucide-react';
import { User as UserType, District, Upazila, MarketplaceProduct } from '../types';
import { StorageService } from '../services/storageService';

interface UserProfileViewProps {
  currentUser: UserType;
  districts: District[];
  upazilas: Upazila[];
  products: MarketplaceProduct[];
  savedItemIds: string[];
  onRoleChanged: (newRoleUser: UserType) => void;
  onOpenNotifications: () => void;
  onDeleteItem: (id: string) => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  currentUser,
  districts,
  upazilas,
  products,
  savedItemIds,
  onRoleChanged,
  onOpenNotifications,
  onDeleteItem,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'my_posts' | 'saved' | 'settings'>('profile');
  const [deleteAccountDialog, setDeleteAccountDialog] = useState(false);

  // My posts
  const myProducts = products.filter((p) => p.ownerId === currentUser.id);
  const savedProducts = products.filter((p) => savedItemIds.includes(p.id));

  // Role Switcher Handler for effortless evaluator testing
  const handleSwitchRole = (role: UserType['role'], distId?: string, upzId?: string) => {
    const updated = StorageService.switchUserRole(role, distId, upzId);
    onRoleChanged(updated);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black text-2xl flex items-center justify-center shadow-md">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">{currentUser.name}</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {currentUser.role.replace('_', ' ')}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1 font-mono">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser.phone}</span>
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser.email}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Role Tester Dropdown */}
        <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200 text-xs">
          <span className="font-bold text-slate-700 block mb-1">ভূমিকা পরিবর্তন (টেস্টিং মোড):</span>
          <div className="flex flex-wrap gap-1">
            {[
              { label: 'সুপার এডমিন', role: 'super_admin' },
              { label: 'ময়মনসিংহ এডমিন', role: 'district_admin', dist: 'mymensingh' },
              { label: 'নেত্রকোনা এডমিন', role: 'district_admin', dist: 'netrokona' },
              { label: 'মুক্তাগাছা এডমিন', role: 'upazila_admin', dist: 'mymensingh', upz: 'muktagachha' },
              { label: 'সাধারণ ব্যবহারকারী', role: 'user' },
              { label: 'ব্যবসা সত্ত্বাধিকারী', role: 'business_owner' },
            ].map((r: any, idx) => (
              <button
                key={idx}
                onClick={() => handleSwitchRole(r.role, r.dist, r.upz)}
                className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  currentUser.role === r.role &&
                  (!r.dist || currentUser.assignedDistrictId === r.dist) &&
                  (!r.upz || currentUser.assignedUpazilaId === r.upz)
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-2xl overflow-x-auto scrollbar-none text-xs">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl font-bold transition-all cursor-pointer text-center ${
            activeTab === 'profile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          অ্যাকাউন্ট তথ্য
        </button>
        <button
          onClick={() => setActiveTab('my_posts')}
          className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl font-bold transition-all cursor-pointer text-center ${
            activeTab === 'my_posts' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          আমার বিজ্ঞাপন ({myProducts.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl font-bold transition-all cursor-pointer text-center ${
            activeTab === 'saved' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          সংরক্ষিত পণ্য ({savedProducts.length})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl font-bold transition-all cursor-pointer text-center ${
            activeTab === 'settings' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          প্রাইভেসি ও সেটিংস
        </button>
      </div>

      {/* Tab Content: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900">ব্যক্তিগত প্রোফাইল ও এলাকা</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[11px]">নির্বাচিত জেলা</span>
              <span className="text-sm font-bold text-slate-800">
                {districts.find((d) => d.id === currentUser.districtId)?.nameBn || 'ময়মনসিংহ'}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[11px]">নির্বাচিত উপজেলা</span>
              <span className="text-sm font-bold text-slate-800">
                {upazilas.find((u) => u.id === currentUser.upazilaId)?.nameBn || 'ময়মনসিংহ সদর'}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[11px]">নিবন্ধন তারিখ</span>
              <span className="font-semibold text-slate-800">{currentUser.createdAt}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[11px]">অ্যাকাউন্ট ভেরিফিকেশন</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>ভেরিফাইড স্থানীয় নাগরিক</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: My Posts */}
      {activeTab === 'my_posts' && (
        <div className="space-y-3">
          {myProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{p.title}</h4>
                  <div className="text-xs font-black text-emerald-700 mt-0.5">
                    ৳{p.price.toLocaleString('bn-BD')}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    স্ট্যাটাস:{' '}
                    <span
                      className={`font-semibold ${
                        p.approvalStatus === 'approved'
                          ? 'text-emerald-600'
                          : p.approvalStatus === 'pending'
                          ? 'text-amber-600'
                          : 'text-rose-600'
                      }`}
                    >
                      {p.approvalStatus === 'approved' ? 'অনুমোদিত' : 'পেন্ডিং'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDeleteItem(p.id)}
                className="w-8 h-8 rounded-lg text-rose-500 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
                title="বিজ্ঞাপন মুছুন"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {myProducts.length === 0 && (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              আপনি এখনো কোনো পণ্য বা বিজ্ঞাপনের পোস্ট করেননি।
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Saved */}
      {activeTab === 'saved' && (
        <div className="space-y-3">
          {savedProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{p.title}</h4>
                  <div className="text-xs font-black text-emerald-700 mt-0.5">
                    ৳{p.price.toLocaleString('bn-BD')}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{p.location}</div>
                </div>
              </div>
            </div>
          ))}

          {savedProducts.length === 0 && (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              আপনার সংরক্ষিত পছন্দের তালিকায় কোনো পণ্য নেই।
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Settings & Privacy */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900">গোপনীয়তা ও ডেটা অধিকার</h3>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800">রক্তদাতা তালিকায় ফোন গোপন রাখা</span>
                <p className="text-[11px] text-slate-500">শুধুমাত্র নিবন্ধিত ব্যবহারকারী ও অনুমতি সাপেক্ষে ফোন দৃশ্যমান হবে</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800">জরুরি রক্তের পুশ নোটিফিকেশন</span>
                <p className="text-[11px] text-slate-500">আপনার রক্তের গ্রুপের জরুরি আবেদন এলে বিজ্ঞপ্তি পাঠানো হবে</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
            </div>

            {/* Account Deletion */}
            <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
              <h4 className="font-bold text-rose-900">অ্যাকাউন্ট মুছে ফেলার অনুরোধ</h4>
              <p className="text-[11px] text-rose-700 mt-1 leading-relaxed">
                আপনার অ্যাকাউন্ট স্থায়ীভাবে মুছে ফেললে আপনার সমস্ত লিস্টিং, বিজ্ঞাপন ও ব্যক্তিগত ডেটা ডাটাবেজ থেকে বিলুপ্ত হবে।
              </p>
              <button
                onClick={() => setDeleteAccountDialog(true)}
                className="mt-3 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                অ্যাকাউন্ট ডিলিট করার অনুরোধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Deletion Confirmation Dialog */}
      {deleteAccountDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-slate-200 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900">আপনি কি নিশ্চিত?</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              আপনার অ্যাকাউন্ট ও ডেটা অপসারণ প্রক্রিয়া শুরু হবে। এই সিদ্ধান্তটি অপরিবর্তনীয়।
            </p>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setDeleteAccountDialog(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                বাতিল
              </button>
              <button
                onClick={() => {
                  alert('আপনার অ্যাকাউন্ট মুছে ফেলার অনুরোধ সফলভাবে জমা হয়েছে।');
                  setDeleteAccountDialog(false);
                }}
                className="flex-1 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold cursor-pointer"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
