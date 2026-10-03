import React, { useState } from 'react';
import { X, Check, Sparkles, Shield, CreditCard, CheckCircle2, Phone } from 'lucide-react';
import { PricingPlan } from '../types';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricingPlans: PricingPlan[];
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  pricingPlans,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [trxId, setTrxId] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId || !senderPhone) {
      alert('অনুগ্রহ করে প্রেরকের মোবাইল নম্বর এবং TrxID লিখুন।');
      return;
    }
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center max-w-md mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>উপজেলা মনিটাইজেশন ও প্রমোশন প্ল্যান</span>
          </div>
          <h2 className="text-xl font-black text-slate-900">বিজ্ঞাপন ও ফিচার্ড সাবস্ক্রিপশন</h2>
          <p className="text-xs text-slate-500 mt-1">
            আপনার স্থানীয় ব্যবসা বা পণ্যের বিক্রি কয়েক গুণ বাড়িয়ে তুলতে সঠিক প্যাকেজটি বেছে নিন
          </p>
        </div>

        {!selectedPlan ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-2xl border border-slate-200 hover:border-emerald-500 p-4 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between shadow-2xs hover:shadow-md"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{plan.nameBn}</h3>
                  <div className="text-2xl font-black text-emerald-700 my-2 tabular-nums">
                    ৳{plan.price.toLocaleString('bn-BD')}
                    <span className="text-xs font-normal text-slate-500"> / {plan.durationDays} দিন</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">{plan.descriptionBn}</p>

                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {plan.featuresBn.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="mt-5 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs"
                >
                  এই প্ল্যানটি নিন
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            <button
              onClick={() => {
                setSelectedPlan(null);
                setIsSuccess(false);
              }}
              className="text-emerald-700 font-bold hover:underline mb-2 cursor-pointer flex items-center gap-1"
            >
              &larr; প্যাকেজ তালিকায় ফেরত যান
            </button>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
              <span className="text-[11px] text-emerald-800 font-bold">নির্বাচিত প্ল্যান:</span>
              <div className="text-base font-extrabold text-emerald-950 mt-0.5">
                {selectedPlan.nameBn} — ৳{selectedPlan.price.toLocaleString('bn-BD')} ({selectedPlan.durationDays} দিন)
              </div>
            </div>

            {!isSuccess ? (
              <form onSubmit={handlePaymentSubmit} className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-600" />
                    <span>বিকাশ / নগদ পেমেন্ট নির্দেশনা:</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    ১. আপনার বিকাশ বা নগদ অ্যাপ থেকে <strong>"Send Money"</strong> অপশনে যান।<br />
                    ২. আমাদের অফিশিয়াল মার্চেন্ট নম্বরে <strong>৳{selectedPlan.price}</strong> টাকা পাঠান: <strong className="font-mono text-slate-900">01711-000001 (ডেমো নম্বর)</strong><br />
                    ৩. সফল ট্রানজেকশনের পর নিচের ঘরে প্রেরক ফোন ও TrxID লিখে সাবমিট করুন।
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">আপনার বিকাশ/নগদ নম্বর *</label>
                  <input
                    type="text"
                    required
                    placeholder="01XXXXXXXXX"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">ট্রানজেকশন আইডি (TrxID) *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: BL89X4MZ01"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-mono text-xs uppercase"
                  />
                </div>

                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-[11px]">
                  🔒 কোনো ভুয়া পেমেন্ট ট্রানজেকশন গ্রহণ করা হয় না। উপজেলা এডমিন ম্যানুয়ালি ভেরিফাই করে আপনার ফিচার্ড বিজ্ঞাপন একটিভ করবেন।
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer transition-colors shadow-sm"
                >
                  পেমেন্ট তথ্য যাচাইয়ের জন্য জমা দিন
                </button>
              </form>
            ) : (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-950">পেমেন্ট রিকোয়েস্ট সফলভাবে গৃহীত হয়েছে!</h3>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                  TrxID <strong>{trxId}</strong> যাচাই করে পরবর্তী সর্বোচ্চ ৩০ মিনিটের মধ্যে আপনার লিস্টিংটি ফিচার্ড স্ট্যাটাসে আপগ্রেড করা হবে।
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-emerald-700 text-white rounded-xl font-bold text-xs cursor-pointer"
                >
                  সম্পন্ন করুন
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
