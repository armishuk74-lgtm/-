import React, { useState } from 'react';
import {
  Newspaper,
  Calendar,
  User,
  Share2,
  Search,
  PlusCircle,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { LocalNews, District, Upazila } from '../../types';
import { NEWS_CATEGORIES } from '../../data/categories';

interface NewsViewProps {
  news: LocalNews[];
  currentDistrict: District;
  currentUpazila: Upazila | null;
  onOpenCreate: () => void;
  showDemoBadges: boolean;
}

export const NewsView: React.FC<NewsViewProps> = ({
  news,
  currentDistrict,
  currentUpazila,
  onOpenCreate,
  showDemoBadges,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = news.filter((n) => {
    if (n.districtId !== currentDistrict.id) return false;
    if (currentUpazila && n.upazilaId !== currentUpazila.id) return false;
    if (!n.isPublished || n.approvalStatus !== 'approved') return false;

    if (selectedCategory !== 'all' && n.category !== selectedCategory) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchDesc = n.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">স্থানীয় সংবাদ ও আপডেট</h2>
            <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-full border border-slate-200">
              {currentUpazila ? currentUpazila.nameBn : currentDistrict.nameBn}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            উপজেলার উন্নয়ন, শিক্ষা, খেলাধুলা ও সামাজিক ঘটনার নির্ভরযোগ্য খবর
          </p>
        </div>
        <button
          onClick={onOpenCreate}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          + সংবাদ পাঠান
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="সংবাদ খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors font-medium ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            সব সংবাদ
          </button>
          {NEWS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors font-medium capitalize ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/10 bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded capitalize">
                  {item.category}
                </span>
                {showDemoBadges && item.isDemo && (
                  <span className="absolute top-2 right-2 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    ডেমো নিউজ
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </span>
                  <span>&middot;</span>
                  <span>{item.source}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-[11px] text-slate-400">প্রতিবেদক: {item.author}</span>
              <span className="text-emerald-700 font-semibold cursor-pointer hover:underline">
                পুরো পড়ুন &rarr;
              </span>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
          কোনো সংবাদ পাওয়া যায়নি।
        </div>
      )}
    </div>
  );
};
