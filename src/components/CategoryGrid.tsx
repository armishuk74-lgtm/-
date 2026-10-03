import React from 'react';
import {
  ShoppingCart,
  Briefcase,
  Droplet,
  HeartPulse,
  Store,
  Home,
  Wrench,
  Utensils,
  Car,
  Sprout,
  Megaphone,
  Newspaper,
  PhoneCall,
  GraduationCap,
  Landmark,
  Pill,
  Fuel,
  Building,
  ShieldCheck,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { MAIN_CATEGORIES, CategoryItem } from '../data/categories';

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
  activeCategoryId?: string;
  categoryCounts?: Record<string, number>;
}

const ICON_MAP: Record<string, React.ElementType> = {
  ShoppingCart,
  Briefcase,
  Droplet,
  Cross: HeartPulse,
  Store,
  Home,
  Wrench,
  Utensils,
  Car,
  Wheat: Sprout,
  Megaphone,
  Newspaper,
  PhoneCall,
  GraduationCap,
  Landmark,
  Pill,
  Fuel,
  Building,
  ShieldCheck,
  MapPin,
};

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory,
  activeCategoryId,
  categoryCounts = {},
}) => {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            মূল সেবাসমূহ ও ক্যাটাগরি
          </h2>
          <p className="text-xs text-slate-500">
            উপজেলার সকল তথ্য, পণ্য ও জরুরি সেবা ব্রাউজ করুন
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-3">
        {MAIN_CATEGORIES.map((cat: CategoryItem) => {
          const IconComponent = ICON_MAP[cat.iconName] || ShoppingCart;
          const isSelected = activeCategoryId === cat.id;
          const count = categoryCounts[cat.id];

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/30'
                  : 'bg-white hover:bg-slate-50/80 border-slate-200/90 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between w-full mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : `${cat.bgColor} ${cat.color}`
                  }`}
                >
                  <IconComponent className="w-5 h-5 stroke-[2]" />
                </div>
                {count !== undefined && count > 0 && (
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </div>

              <div>
                <h3
                  className={`text-xs sm:text-sm font-bold leading-tight ${
                    isSelected ? 'text-white' : 'text-slate-800 group-hover:text-emerald-700'
                  }`}
                >
                  {cat.nameBn}
                </h3>
                <p
                  className={`text-[10px] mt-0.5 line-clamp-1 ${
                    isSelected ? 'text-emerald-100' : 'text-slate-600'
                  }`}
                >
                  {cat.descriptionBn}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
