import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { User } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'marketplace' | 'business' | 'job' | 'service' | 'rental' | 'user';
  targetId: string;
  targetTitle: string;
  currentUser: User;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetTitle,
  currentUser,
}) => {
  const [reason, setReason] = useState('ভুয়া বা বিভ্রান্তিকর তথ্য');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.submitReport({
      id: `rep_${Date.now()}`,
      targetType,
      targetId,
      targetTitle,
      reportedByUserId: currentUser.id,
      reason,
      details,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 border border-slate-200 shadow-2xl relative text-xs">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>রিপোর্ট বা অভিযোগ জমা দিন</span>
            </div>
            <p className="text-[11px] text-slate-500">
              অভিযুক্ত লিস্টিং: <strong className="text-slate-800">{targetTitle}</strong>
            </p>

            <div>
              <label className="block font-bold text-slate-700 mb-1">অভিযোগের কারণ</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="ভুয়া বা বিভ্রান্তিকর তথ্য">ভুয়া বা বিভ্রান্তিকর তথ্য</option>
                <option value="পণ্য বা সেবার অতিরিক্ত দাম">পণ্য বা সেবার অতিরিক্ত দাম</option>
                <option value="অনুপযুক্ত বা আপত্তিকর ভাষা">অনুপযুক্ত বা আপত্তিকর ভাষা</option>
                <option value="প্রতারণা বা স্ক্যাম সন্দেহ">প্রতারণা বা স্ক্যাম সন্দেহ</option>
                <option value="অন্যান্য কারণ">অন্যান্য কারণ</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">অতিরিক্ত বিবরণ (ঐচ্ছিক)</label>
              <textarea
                rows={3}
                placeholder="সমস্যা সম্পর্কে বিস্তারিত লিখুন..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl resize-none"
              />
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer"
              >
                রিপোর্ট পাঠান
              </button>
            </div>
          </form>
        ) : (
          <div className="py-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-slate-900 text-sm">আপনার অভিযোগ গৃহীত হয়েছে</h4>
            <p className="text-[11px] text-slate-500">
              আমাদের মডারেশন টিম শীঘ্রই বিষয়টি তদন্ত করে যথাযথ পদক্ষেপ গ্রহণ করবে।
            </p>
            <button
              onClick={onClose}
              className="mt-3 px-4 py-1.5 bg-slate-900 text-white rounded-xl font-bold cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
