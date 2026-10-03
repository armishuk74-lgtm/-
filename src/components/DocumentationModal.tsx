import React, { useState } from 'react';
import { X, BookOpen, Copy, Check, Code, Server, Shield, FileText, ChevronRight } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const firestoreRulesCode = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function getUserData() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
    }
    
    function isSuperAdmin() {
      return isAuthenticated() && getUserData().role == 'super_admin';
    }
    
    function isDistrictAdmin(districtId) {
      return isAuthenticated() && (
        isSuperAdmin() || 
        (getUserData().role == 'district_admin' && getUserData().assignedDistrictId == districtId)
      );
    }
    
    function isUpazilaAdmin(districtId, upazilaId) {
      return isAuthenticated() && (
        isDistrictAdmin(districtId) || 
        (getUserData().role == 'upazila_admin' && getUserData().assignedUpazilaId == upazilaId)
      );
    }

    // Public read collections (Districts & Upazilas)
    match /districts/{districtId} {
      allow read: if true;
      allow write: if isSuperAdmin();
    }
    
    match /upazilas/{upazilaId} {
      allow read: if true;
      allow write: if isSuperAdmin() || isDistrictAdmin(request.resource.data.districtId);
    }

    // Marketplace Products
    match /products/{productId} {
      allow read: if resource.data.approvalStatus == 'approved' || 
                     (isAuthenticated() && resource.data.ownerId == request.auth.uid) ||
                     isUpazilaAdmin(resource.data.districtId, resource.data.upazilaId);
      allow create: if isAuthenticated() && request.resource.data.ownerId == request.auth.uid;
      allow update, delete: if isAuthenticated() && (
        resource.data.ownerId == request.auth.uid || 
        isUpazilaAdmin(resource.data.districtId, resource.data.upazilaId)
      );
    }

    // Blood Donors (Privacy protected)
    match /bloodDonors/{donorId} {
      allow read: if true; // Phone exposure governed by privacySettings field
      allow create, update: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
      allow delete: if isAuthenticated() && resource.data.userId == request.auth.uid;
    }

    // Emergency Contacts
    match /emergencyContacts/{contactId} {
      allow read: if true;
      allow write: if isDistrictAdmin(request.resource.data.districtId);
    }

    // Audit logs
    match /auditLogs/{logId} {
      allow read: if isSuperAdmin();
      allow create: if isAuthenticated();
    }
  }
}`;

  const storageRulesCode = `rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /listings/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold">আমাদের উপজেলা — প্রযুক্তিগত স্থাপত্য ও নির্দেশিকা</h2>
              <p className="text-xs text-slate-300">Technical Architecture, Schema & Production Handbook</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar Nav */}
          <div className="w-full md:w-60 bg-slate-50 border-r border-slate-200 p-3 space-y-1 overflow-y-auto text-xs font-semibold text-slate-600">
            {[
              { id: 'overview', label: '১. প্রকল্প রূপরেখা' },
              { id: 'schema', label: '২. ডেটাবেজ স্কিমা' },
              { id: 'firestore_rules', label: '৩. সিকিউরিটি রুলস (Rules)' },
              { id: 'admin_setup', label: '৪. এডমিন ও পারমিশন' },
              { id: 'add_upazila', label: '৫. নতুন জেলা/উপজেলা যোগ' },
              { id: 'payment', label: '৬. পেমেন্ট গেটওয়ে ইন্টিগ্রেশন' },
              { id: 'deployment', label: '৭. বিল্ড ও প্রোডাকশন ডেপ্লয়' },
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full text-left p-2.5 rounded-xl cursor-pointer transition-colors flex items-center justify-between ${
                  activeSection === sec.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'hover:bg-slate-200/60 text-slate-700'
                }`}
              >
                <span>{sec.label}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>

          {/* Main Doc Content */}
          <div className="flex-1 p-6 overflow-y-auto text-xs leading-relaxed text-slate-700 space-y-5">
            {activeSection === 'overview' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">১. স্থাপত্য ও সিস্টেম ডিজাইন</h3>
                <p>
                  <strong>“আমাদের উপজেলা” (Amader Upazila)</strong> ময়মনসিংহ ও নেত্রকোনা জেলার ২৩টি উপজেলার একটি একক, পরিমাপযোগ্য ও মোবাইল-ফার্স্ট প্ল্যাটফর্ম। এতে জেলা ও উপজেলা ভিত্তিক ডেটা আইসোলেশন ও ফিল্টারিং কার্যকর।
                </p>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block mb-1">ময়মনসিংহ জেলা (১৩ উপজেলা)</strong>
                    <p className="text-[11px] text-slate-600">
                      সদর, মুক্তাগাছা, ভালুকা, ত্রিশাল, ফুলবাড়িয়া, গফরগাঁও, গৌরীপুর, ঈশ্বরগঞ্জ, নান্দাইল, তারাকান্দা, ফুলপুর, হালুয়াঘাট, ধোবাউড়া।
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block mb-1">নেত্রকোনা জেলা (১০ উপজেলা)</strong>
                    <p className="text-[11px] text-slate-600">
                      সদর, আটপাড়া, বারহাট্টা, দুর্গাপুর, কলমাকান্দা, কেন্দুয়া, খালিয়াজুড়ি, মদন, মোহনগঞ্জ, পূর্বধলা।
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'schema' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">২. ক্লাউড ফায়ারস্টোর কালেকশন স্কিমা</h3>
                <p>প্রতিটি রেকর্ডে <code>districtId</code> এবং <code>upazilaId</code> বাধ্যতামূলক সূচক (Composite Index):</p>
                <pre className="bg-slate-900 text-emerald-400 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
{`collections:
  - users: { id, name, phone, email, role, assignedDistrictId, assignedUpazilaId, createdAt }
  - districts: { id, nameBn, nameEn, totalUpazilas, divisionBn }
  - upazilas: { id, districtId, nameBn, nameEn, famousForBn, policeStation }
  - products: { id, title, price, isNegotiable, condition, category, districtId, upazilaId, approvalStatus, ownerId }
  - businesses: { id, name, category, districtId, upazilaId, address, phone, isFeatured, approvalStatus }
  - bloodDonors: { id, name, bloodGroup, districtId, upazilaId, phone, isAvailable, privacySettings, consentGiven }
  - bloodRequests: { id, patientName, bloodGroup, requiredUnits, hospital, isEmergency, districtId, upazilaId }
  - jobs: { id, title, company, salary, jobType, category, districtId, upazilaId, deadline }
  - doctors: { id, name, specialty, chamber, visitingHours, phone, districtId, upazilaId }
  - emergencyContacts: { id, serviceType, serviceTypeBn, phone, districtId, upazilaId, isVerified }
  - advertisements: { id, title, image, targetDistrictId, targetUpazilaId, adType, status }
  - auditLogs: { id, adminId, adminName, action, targetType, timestamp }`}
                </pre>
              </div>
            )}

            {activeSection === 'firestore_rules' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">৩. ফায়ারস্টোর ও স্টোরেজ সিকিউরিটি রুলস</h3>
                  <button
                    onClick={() => copyToClipboard(firestoreRulesCode, 'rules')}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    {copiedKey === 'rules' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'rules' ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-[11px] overflow-x-auto max-h-60">
                  {firestoreRulesCode}
                </pre>

                <h4 className="text-xs font-bold text-slate-900 mt-3">Firebase Storage রুলস (৫ মেগাবাইট সর্বোচ্চ লিমিট):</h4>
                <pre className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
                  {storageRulesCode}
                </pre>
              </div>
            )}

            {activeSection === 'admin_setup' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">৪. রোল-বেসড অ্যাক্সেস কন্ট্রোল (RBAC)</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900">Super Admin:</strong> সমস্ত জেলা, উপজেলা, মূল্যতালিকা, ইউজার ব্যান ও অডিট ট্রেইলে পূর্ণ কর্তৃত্ব।
                  </li>
                  <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900">District Admin:</strong> সংশ্লিষ্ট জেলার (যেমন ময়মনসিংহ বা নেত্রকোনা) অধীনস্থ সকল উপজেলার পোস্ট অনুমোদন ও পুলিশ/ফায়ার নম্বর নিয়ন্ত্রণ।
                  </li>
                  <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900">Upazila Admin:</strong> নির্ধারিত উপজেলার (যেমন মুক্তাগাছা বা দুর্গাপুর) স্থানীয় পোস্ট মডারেশন।
                  </li>
                </ul>
              </div>
            )}

            {activeSection === 'add_upazila' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">৫. নতুন জেলা ও উপজেলা সংযোজন</h3>
                <p>
                  অ্যাপটি পুরোপুরি ডায়নামিক। এডমিন প্যানেলের <strong>"জেলা ও উপজেলা ব্যবস্থাপনা"</strong> ট্যাব থেকে সরাসরি যেকোনো নতুন জেলা (যেমন জামালপুর, শেরপুর) বা উপজেলা ফর্ম পূরণ করে মুহূর্তের মধ্যেই লাইভ করা যায়। এছাড়া <code>src/data/districtsAndUpazilas.ts</code> ফাইলে নতুন অবজেক্ট যুক্ত করে স্ট্যাটিক কনফিগারও সম্প্রসারণযোগ্য।
                </p>
              </div>
            )}

            {activeSection === 'payment' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">৬. রিয়েল পেমেন্ট গেটওয়ে ইন্টিগ্রেশন নির্দেশিকা</h3>
                <p>
                  বর্তমানে ম্যানুয়াল TrxID ভেরিফিকেশন চালু আছে। ভবিষ্যতে bKash / Nagad / SSLCommerz সরাসরি যুক্ত করার জন্য:
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div>১. ব্যাকএন্ডে <code>/api/checkout/create-bkash-payment</code> এপিআই এন্ডপয়েন্ট তৈরি করুন।</div>
                  <div>২. গ্রাহকের কার্ট বা বিজ্ঞাপন আইডি সহ <code>app_key</code> এবং <code>app_secret</code> দ্বারা টোকেন গ্রহণ করুন।</div>
                  <div>৩. ফ্রন্টএন্ড থেকে সরাসরি কোনো সিক্রেট পাস না করে শুধুমাত্র ব্যাকএন্ড কলব্যাক যাচাই সম্পন্ন করুন।</div>
                </div>
              </div>
            )}

            {activeSection === 'deployment' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">৭. বিল্ড ও ডেপ্লয়মেন্ট কমান্ড</h3>
                <div className="space-y-2">
                  <div className="p-2.5 bg-slate-900 text-emerald-400 font-mono rounded-xl">
                    npm run build
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Vite দ্বারা অপটিমাইজড অ্যাসেটস <code>dist/</code> ফোল্ডারে বিল্ড হবে এবং Cloud Run বা Vercel/Firebase হোস্টিং-এ ডেপ্লয় করা যাবে।
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
