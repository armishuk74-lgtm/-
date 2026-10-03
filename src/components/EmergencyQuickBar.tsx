import React from 'react';
import { PhoneCall, Shield, Flame, Ambulance, Heart, AlertOctagon } from 'lucide-react';
import { EmergencyContact } from '../types';

interface EmergencyQuickBarProps {
  contacts: EmergencyContact[];
  onOpenEmergencyModal: () => void;
}

export const EmergencyQuickBar: React.FC<EmergencyQuickBarProps> = ({
  contacts,
  onOpenEmergencyModal,
}) => {
  const quickItems = [
    { label: 'জাতীয় ৯৯৯', phone: '999', icon: PhoneCall, bg: 'bg-red-600', text: 'text-white' },
    { label: 'পুলিশ থানা', phone: contacts.find((c) => c.serviceType === 'police')?.phone || '01713-XXXXXX', icon: Shield, bg: 'bg-blue-600', text: 'text-white' },
    { label: 'ফায়ার সার্ভিস', phone: contacts.find((c) => c.serviceType === 'fire')?.phone || '01711-XXXXXX', icon: Flame, bg: 'bg-amber-600', text: 'text-white' },
    { label: 'অ্যাম্বুলেন্স', phone: contacts.find((c) => c.serviceType === 'ambulance')?.phone || '01715-XXXXXX', icon: Ambulance, bg: 'bg-emerald-600', text: 'text-white' },
    { label: 'জরুরি রক্ত', phone: 'ব্লাড ডিরেক্টরি', icon: Heart, bg: 'bg-rose-600', text: 'text-white', isSpecial: true },
  ];

  return (
    <div className="bg-red-50/70 border border-red-200/80 rounded-2xl p-3.5 mb-6">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-red-800 font-bold text-xs">
          <AlertOctagon className="w-4 h-4 text-red-600 animate-pulse" />
          <span>জরুরি যোগাযোগ (ইমার্জেন্সি হটলাইন)</span>
        </div>
        <button
          onClick={onOpenEmergencyModal}
          className="text-[11px] font-semibold text-red-700 hover:text-red-900 underline cursor-pointer"
        >
          সকল নম্বর দেখুন &rarr;
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {quickItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.phone === '999' ? 'tel:999' : '#emergency'}
              onClick={(e) => {
                if (item.phone !== '999') {
                  e.preventDefault();
                  onOpenEmergencyModal();
                }
              }}
              className="flex items-center gap-2 p-2 rounded-xl bg-white border border-red-100 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className={`w-7 h-7 rounded-lg ${item.bg} ${item.text} flex items-center justify-center shrink-0`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-slate-800 group-hover:text-red-600 truncate">
                  {item.label}
                </div>
                <div className="text-[10px] text-slate-600 font-mono truncate">
                  {item.phone}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
