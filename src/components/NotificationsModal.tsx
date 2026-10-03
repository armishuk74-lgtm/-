import React from 'react';
import { X, Bell, Droplet, Briefcase, Tag, Shield, CheckCircle } from 'lucide-react';
import { AppNotification } from '../types';
import { StorageService } from '../services/storageService';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkRead: (id: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkRead,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'blood':
        return <Droplet className="w-4 h-4 text-rose-600" />;
      case 'job':
        return <Briefcase className="w-4 h-4 text-blue-600" />;
      case 'marketplace':
        return <Tag className="w-4 h-4 text-emerald-600" />;
      default:
        return <Shield className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[80vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">বিজ্ঞপ্তি ও নোটিফিকেশন</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onMarkRead(notif.id)}
              className={`p-3 rounded-2xl border transition-colors cursor-pointer flex items-start gap-3 ${
                notif.read
                  ? 'bg-white border-slate-100 text-slate-600'
                  : 'bg-emerald-50/60 border-emerald-200 text-slate-900 shadow-2xs'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold truncate">{notif.title}</h4>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{notif.message}</p>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="py-10 text-center text-xs text-slate-400">
              কোনো নতুন বিজ্ঞপ্তি নেই।
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
