import React, { useState } from 'react';
import {
  Shield,
  CheckCircle,
  XCircle,
  Trash2,
  PlusCircle,
  FileText,
  AlertTriangle,
  Users,
  Settings,
  Database,
  Building,
  Tag,
  DollarSign,
  Activity,
  MapPin,
  RefreshCw,
  Search,
} from 'lucide-react';
import {
  District,
  Upazila,
  MarketplaceProduct,
  BusinessListing,
  JobListing,
  BloodRequest,
  EmergencyContact,
  PricingPlan,
  User,
  UserReport,
  AuditLog,
} from '../types';
import { StorageService } from '../services/storageService';

interface AdminDashboardViewProps {
  currentUser: User;
  districts: District[];
  upazilas: Upazila[];
  products: MarketplaceProduct[];
  businesses: BusinessListing[];
  jobs: JobListing[];
  bloodRequests: BloodRequest[];
  emergencyContacts: EmergencyContact[];
  pricingPlans: PricingPlan[];
  reports: UserReport[];
  auditLogs: AuditLog[];
  onRefreshData: () => void;
  showDemoBadges: boolean;
  onToggleDemoBadges: (show: boolean) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  currentUser,
  districts,
  upazilas,
  products,
  businesses,
  jobs,
  bloodRequests,
  emergencyContacts,
  pricingPlans,
  reports,
  auditLogs,
  onRefreshData,
  showDemoBadges,
  onToggleDemoBadges,
}) => {
  const [activeTab, setActiveTab] = useState<
    'approvals' | 'districts_upazilas' | 'emergency' | 'pricing' | 'audit' | 'demo_data'
  >('approvals');

  // New District / Upazila Form State
  const [newDistNameBn, setNewDistNameBn] = useState('');
  const [newDistNameEn, setNewDistNameEn] = useState('');
  const [newUpzNameBn, setNewUpzNameBn] = useState('');
  const [newUpzNameEn, setNewUpzNameEn] = useState('');
  const [newUpzDistId, setNewUpzDistId] = useState('mymensingh');

  // New Emergency Contact Form State
  const [newEmgType, setNewEmgType] = useState<'police' | 'fire' | 'ambulance' | 'hospital' | 'uno'>('police');
  const [newEmgName, setNewEmgName] = useState('');
  const [newEmgPhone, setNewEmgPhone] = useState('');
  const [newEmgDistId, setNewEmgDistId] = useState('mymensingh');
  const [newEmgUpzId, setNewEmgUpzId] = useState('mymensingh-sadar');

  // Permission Scope Checks
  const isSuperAdmin = currentUser.role === 'super_admin';
  const assignedDist = currentUser.assignedDistrictId;
  const assignedUpz = currentUser.assignedUpazilaId;

  // Filter pending items according to admin boundaries
  const isScoped = (distId: string, upzId?: string) => {
    if (isSuperAdmin) return true;
    if (assignedDist && distId !== assignedDist) return false;
    if (assignedUpz && upzId && upzId !== assignedUpz) return false;
    return true;
  };

  const pendingProducts = products.filter(
    (p) => p.approvalStatus === 'pending' && isScoped(p.districtId, p.upazilaId)
  );
  const pendingBusinesses = businesses.filter(
    (b) => b.approvalStatus === 'pending' && isScoped(b.districtId, b.upazilaId)
  );
  const pendingJobs = jobs.filter(
    (j) => j.approvalStatus === 'pending' && isScoped(j.districtId, j.upazilaId)
  );
  const pendingBloodReqs = bloodRequests.filter(
    (r) => r.approvalStatus === 'pending' && isScoped(r.districtId, r.upazilaId)
  );

  const totalPending =
    pendingProducts.length + pendingBusinesses.length + pendingJobs.length + pendingBloodReqs.length;

  const handleApproveProduct = (id: string) => {
    StorageService.updateProductStatus(id, 'approved', currentUser.name);
    onRefreshData();
  };

  const handleRejectProduct = (id: string) => {
    StorageService.updateProductStatus(id, 'rejected', currentUser.name);
    onRefreshData();
  };

  const handleCreateDistrict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDistNameBn || !newDistNameEn) return;
    const id = newDistNameEn.toLowerCase().replace(/\s+/g, '-');
    StorageService.saveDistrict({
      id,
      nameBn: newDistNameBn,
      nameEn: newDistNameEn,
      divisionBn: 'ময়মনসিংহ',
      divisionEn: 'Mymensingh',
      totalUpazilas: 0,
      descriptionBn: `${newDistNameBn} জেলা প্রশাসন ও স্থানীয় তথ্য।`,
    });
    StorageService.addAuditLog(currentUser.name, 'CREATE_DISTRICT', 'district', id, `Added ${newDistNameBn}`);
    setNewDistNameBn('');
    setNewDistNameEn('');
    onRefreshData();
    alert(`নতুন জেলা "${newDistNameBn}" সফলভাবে তৈরি হয়েছে!`);
  };

  const handleCreateUpazila = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpzNameBn || !newUpzNameEn) return;
    const id = newUpzNameEn.toLowerCase().replace(/\s+/g, '-');
    StorageService.saveUpazila({
      id,
      districtId: newUpzDistId,
      nameBn: newUpzNameBn,
      nameEn: newUpzNameEn,
      descriptionBn: `${newUpzNameBn} উপজেলার সকল স্থানীয় নাগরিক সেবা ও তথ্যাবলী।`,
    });
    StorageService.addAuditLog(currentUser.name, 'CREATE_UPAZILA', 'upazila', id, `Added ${newUpzNameBn}`);
    setNewUpzNameBn('');
    setNewUpzNameEn('');
    onRefreshData();
    alert(`নতুন উপজেলা "${newUpzNameBn}" সফলভাবে তৈরি হয়েছে!`);
  };

  const handleCreateEmergencyContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmgName || !newEmgPhone) return;
    StorageService.saveEmergencyContact({
      id: `emg_${Date.now()}`,
      serviceType: newEmgType,
      serviceTypeBn: newEmgName,
      contactName: newEmgName,
      phone: newEmgPhone,
      districtId: newEmgDistId,
      upazilaId: newEmgUpzId,
      availability: '২৪ ঘণ্টা খোলা',
      isVerified: true,
      approvalStatus: 'approved',
      isDemo: false,
    });
    StorageService.addAuditLog(currentUser.name, 'ADD_EMERGENCY_CONTACT', 'emergency', newEmgName, `Phone: ${newEmgPhone}`);
    setNewEmgName('');
    setNewEmgPhone('');
    onRefreshData();
    alert('জরুরি যোগাযোগ নম্বর সফলভাবে যুক্ত করা হয়েছে!');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>এডমিন কন্ট্রোল সেন্টার &middot; {currentUser.role.replace('_', ' ').toUpperCase()}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">আমাদের উপজেলা প্রশাসনিক ড্যাশবোর্ড</h2>
          <p className="text-xs text-slate-300 mt-1">
            {isSuperAdmin
              ? 'সুপার এডমিন হিসেবে আপনি ময়মনসিংহ ও নেত্রকোনা উভয় জেলার সমস্ত উপজেলার ডেটা সম্পূর্ণ নিয়ন্ত্রণ করতে পারবেন।'
              : `আপনার প্রশাসনিক সীমা: ${assignedDist ? `${assignedDist} জেলা` : ''} ${assignedUpz ? `/ ${assignedUpz} উপজেলা` : ''}`}
          </p>
        </div>

        {/* Quick Stats Summary */}
        <div className="flex gap-2">
          <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-400 block">অপেক্ষমাণ পোস্ট</span>
            <span className="text-xl font-black text-amber-400 tabular-nums">{totalPending}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-400 block">মোট পণ্য</span>
            <span className="text-xl font-black text-emerald-400 tabular-nums">{products.length}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-2xl overflow-x-auto scrollbar-none text-xs">
        <button
          onClick={() => setActiveTab('approvals')}
          className={`py-2 px-3.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'approvals' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>পেন্ডিং অনুমোদন ({totalPending})</span>
        </button>
        <button
          onClick={() => setActiveTab('districts_upazilas')}
          className={`py-2 px-3.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'districts_upazilas' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building className="w-3.5 h-3.5 text-indigo-600" />
          <span>জেলা ও উপজেলা ব্যবস্থাপনা</span>
        </button>
        <button
          onClick={() => setActiveTab('emergency')}
          className={`py-2 px-3.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'emergency' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          <span>জরুরি হটলাইন কনফিগ</span>
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`py-2 px-3.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'pricing' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 text-amber-600" />
          <span>মূল্যতালিকা (Monetization)</span>
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`py-2 px-3.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'audit' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-blue-600" />
          <span>অডিট লগ ও রিপোর্ট ({auditLogs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('demo_data')}
          className={`py-2 px-3.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'demo_data' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-teal-600" />
          <span>ডেমো ডেটা কন্ট্রোল</span>
        </button>
      </div>

      {/* Tab 1: Pending Approvals */}
      {activeTab === 'approvals' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              অনুমোদন অপেক্ষমাণ কেনাবেচা বিজ্ঞাপন ({pendingProducts.length})
            </h3>
            <div className="space-y-2">
              {pendingProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt={p.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900">{p.title}</h4>
                      <div className="text-emerald-700 font-extrabold">৳{p.price}</div>
                      <div className="text-slate-500 text-[11px]">
                        উপজেলা: {p.upazilaId} &middot; বিক্রেতা: {p.sellerName} ({p.phone})
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveProduct(p.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold cursor-pointer transition-colors"
                    >
                      অনুমোদন দিন
                    </button>
                    <button
                      onClick={() => handleRejectProduct(p.id)}
                      className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg font-bold cursor-pointer transition-colors"
                    >
                      প্রত্যাখ্যান
                    </button>
                  </div>
                </div>
              ))}
              {pendingProducts.length === 0 && (
                <div className="py-6 text-center text-xs text-slate-400">
                  বর্তমানে কোনো অনুমোদনের জন্য অপেক্ষমাণ মার্কেটপ্লেস পোস্ট নেই।
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Manage Districts & Upazilas */}
      {activeTab === 'districts_upazilas' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add District */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-600" />
              <span>নতুন জেলা যোগ করুন</span>
            </h3>
            <form onSubmit={handleCreateDistrict} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">জেলার নাম (বাংলায়) *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: জামালপুর"
                  value={newDistNameBn}
                  onChange={(e) => setNewDistNameBn(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">জেলার নাম (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jamalpur"
                  value={newDistNameEn}
                  onChange={(e) => setNewDistNameEn(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer"
              >
                + নতুন জেলা সংরক্ষণ করুন
              </button>
            </form>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block mb-2">বিদ্যমান জেলাসমূহ:</span>
              <div className="space-y-1.5 text-xs">
                {districts.map((d) => (
                  <div key={d.id} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex justify-between">
                    <span className="font-bold text-slate-800">{d.nameBn} জেলা</span>
                    <span className="text-slate-500 font-mono text-[11px]">{d.id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Upazila */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>নতুন উপজেলা যোগ করুন</span>
            </h3>
            <form onSubmit={handleCreateUpazila} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">কোন জেলার অধীনে *</label>
                <select
                  value={newUpzDistId}
                  onChange={(e) => setNewUpzDistId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nameBn} জেলা
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">উপজেলার নাম (বাংলায়) *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ইসলামপুর"
                  value={newUpzNameBn}
                  onChange={(e) => setNewUpzNameBn(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">উপজেলার নাম (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Islampur"
                  value={newUpzNameEn}
                  onChange={(e) => setNewUpzNameEn(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold cursor-pointer"
              >
                + নতুন উপজেলা সংরক্ষণ করুন
              </button>
            </form>

            <div className="pt-3 border-t border-slate-100 max-h-48 overflow-y-auto">
              <span className="text-xs font-bold text-slate-700 block mb-2">
                নিবন্ধিত উপজেলাসমূহ ({upazilas.length}):
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                {upazilas.map((u) => (
                  <div key={u.id} className="p-1.5 rounded bg-slate-50 border border-slate-100 truncate">
                    {u.nameBn}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Emergency Contacts Configuration */}
      {activeTab === 'emergency' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>জরুরি ফোন নম্বর যোগ ও কনফিগারেশন</span>
          </h3>

          <form onSubmit={handleCreateEmergencyContact} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">সেবার নাম (বাংলায়) *</label>
              <input
                type="text"
                required
                placeholder="যেমন: ত্রিশাল থানা ডিউটি অফিসার"
                value={newEmgName}
                onChange={(e) => setNewEmgName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">ফোন নম্বর *</label>
              <input
                type="text"
                required
                placeholder="01713-XXXXXX"
                value={newEmgPhone}
                onChange={(e) => setNewEmgPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold cursor-pointer"
              >
                + জরুরি নম্বর যোগ করুন
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-700 block mb-2">বিদ্যমান জরুরি তালিকাসমূহ:</span>
            <div className="space-y-2">
              {emergencyContacts.map((c) => (
                <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800">{c.serviceTypeBn}</span>
                    <div className="text-slate-500 font-mono text-[11px]">{c.phone}</div>
                  </div>
                  <button
                    onClick={() => {
                      StorageService.deleteEmergencyContact(c.id);
                      onRefreshData();
                    }}
                    className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                    title="মুছুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Monetization Pricing Plans */}
      {activeTab === 'pricing' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-amber-600" />
            <span>উপজেলা বিজ্ঞাপন ও ভিআইপি সাবস্ক্রিপশন মূল্যতালিকা</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricingPlans.map((plan) => (
              <div key={plan.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{plan.nameBn}</h4>
                  <div className="text-xl font-black text-emerald-700 my-2">৳{plan.price} / {plan.durationDays} দিন</div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{plan.descriptionBn}</p>
                  <ul className="space-y-1 text-[11px] text-slate-600">
                    {plan.featuresBn.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-slate-400">স্ট্যাটাস: সক্রিয়</span>
                  <span className="text-emerald-700 font-bold">লাইভ প্ল্যান</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Audit Logs & Reports */}
      {activeTab === 'audit' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <span>প্রশাসনিক অডিট ট্রেইল ও কার্যক্রম লগ</span>
          </h3>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1">
                  <span className="font-bold text-slate-700">{log.adminName}</span>
                  <span className="font-mono">{new Date(log.timestamp).toLocaleString('bn-BD')}</span>
                </div>
                <div className="font-semibold text-slate-800">{log.action} &middot; {log.details}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Demo Data Controls */}
      {activeTab === 'demo_data' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-teal-600" />
            <span>ডেমো/সিড ডেটা নিয়ন্ত্রণ ও সাফাই</span>
          </h3>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-2">
            <p>
              অ্যাপ্লিকেশনটি বর্তমানে ময়মনসিংহ ও নেত্রকোনা জেলার ২৩টি উপজেলার সমৃদ্ধ ডেমো ডেটা দ্বারা পরিচালিত।
            </p>
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="toggleDemo"
                checked={showDemoBadges}
                onChange={(e) => onToggleDemoBadges(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="toggleDemo" className="font-bold cursor-pointer">
                লিস্টিংগুলোতে "ডেমো তথ্য" ট্যাগ প্রদর্শন করুন
              </label>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => {
                if (window.confirm('আপনি কি নিশ্চিত যে সকল ডেমো তথ্য মুছে ফেলবেন?')) {
                  StorageService.purgeDemoData();
                  onRefreshData();
                  alert('সকল ডেমো ডেটা ডাটাবেজ থেকে সফলভাবে মুছে ফেলা হয়েছে।');
                }
              }}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
            >
              সকল ডেমো ডেটা অপসারণ করুন (Purge Demo Data)
            </button>

            <button
              onClick={() => {
                if (window.confirm('সকল ডেমো ডেটা পুনরায় রিসেট করবেন?')) {
                  StorageService.restoreSeedData();
                  onRefreshData();
                  alert('মূল ডেমো ডেটাসেট সফলভাবে পুনরুদ্ধার করা হয়েছে!');
                }
              }}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
            >
              মূল ডেমো ডেটা রিসেট করুন (Restore Seed Data)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
