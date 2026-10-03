import React, { useState } from 'react';
import {
  Tag,
  Search,
  Filter,
  Phone,
  Bookmark,
  Share2,
  AlertTriangle,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowUpDown,
  X,
  MessageCircle,
} from 'lucide-react';
import { MarketplaceProduct, District, Upazila } from '../../types';
import { MARKETPLACE_CATEGORIES } from '../../data/categories';

interface MarketplaceViewProps {
  products: MarketplaceProduct[];
  currentDistrict: District;
  currentUpazila: Upazila | null;
  onSaveToggle: (id: string) => boolean;
  savedItemIds: string[];
  onReportItem: (type: 'marketplace', id: string, title: string) => void;
  onOpenCreate: () => void;
  showDemoBadges: boolean;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  products,
  currentDistrict,
  currentUpazila,
  onSaveToggle,
  savedItemIds,
  onReportItem,
  onOpenCreate,
  showDemoBadges,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high'>('newest');
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);
  const [revealedPhone, setRevealedPhone] = useState(false);

  // Filter products by district, upazila, category, condition, and search
  const filtered = products.filter((p) => {
    // Upazila & District check
    if (p.districtId !== currentDistrict.id) return false;
    if (currentUpazila && p.upazilaId !== currentUpazila.id) return false;

    // Only approved products visible
    if (p.approvalStatus !== 'approved') return false;

    // Category
    if (selectedCategory !== 'all' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }

    // Condition
    if (selectedCondition !== 'all' && p.condition !== selectedCondition) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchLoc) return false;
    }

    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'price_low') {
      return a.price - b.price;
    }
    if (sortBy === 'price_high') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">কেনাবেচা মার্কেটপ্লেস</h2>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
              {currentUpazila ? currentUpazila.nameBn : currentDistrict.nameBn}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            স্থানীয় ব্যবহৃত ও নতুন পণ্য সরাসরি কেনাবেচা করুন কোনো প্রকার মধ্যস্বত্বভোগী ছাড়া
          </p>
        </div>
        <button
          onClick={onOpenCreate}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          + পণ্য বিক্রির বিজ্ঞাপন দিন
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="পণ্য খুঁজুন (যেমন: মোবাইল, বাইক, আসবাবপত্র, ফ্রিজ...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        {/* Categories horizontal scroll tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors font-medium ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            সকল ক্যাটাগরি
          </button>
          {MARKETPLACE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors font-medium ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Condition & Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          {/* Condition tabs */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400 mr-1 text-[11px]">অবস্থা:</span>
            {['all', 'used', 'new'].map((cond) => (
              <button
                key={cond}
                onClick={() => setSelectedCondition(cond)}
                className={`px-2.5 py-1 rounded-md cursor-pointer capitalize font-medium ${
                  selectedCondition === cond
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {cond === 'all' ? 'সব' : cond === 'used' ? 'ব্যবহৃত' : 'নতুন'}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5 text-slate-600">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none cursor-pointer"
            >
              <option value="newest">সর্বশেষ যুক্ত</option>
              <option value="price_low">কম দাম থেকে বেশি</option>
              <option value="price_high">বেশি দাম থেকে কম</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sorted.map((prod) => {
          const isSaved = savedItemIds.includes(prod.id);
          return (
            <div
              key={prod.id}
              onClick={() => {
                setSelectedProduct(prod);
                setRevealedPhone(false);
              }}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Image banner */}
              <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                <img
                  src={prod.images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600'}
                  alt={prod.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {prod.isFeatured && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      ফিচার্ড
                    </span>
                  )}
                  {showDemoBadges && prod.isDemo && (
                    <span className="bg-slate-800/80 backdrop-blur-xs text-slate-200 text-[9px] px-1.5 py-0.5 rounded">
                      ডেমো লিস্টিং
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSaveToggle(prod.id);
                  }}
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-white/80 text-slate-700 hover:bg-white'
                  }`}
                  title={isSaved ? 'সংরক্ষিত' : 'সংরক্ষণ করুন'}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Body */}
              <div className="p-3.5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>{prod.category}</span>
                    <span>{prod.condition === 'used' ? 'ব্যবহৃত' : 'নতুন'}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    {prod.title}
                  </h3>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100">
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-extrabold text-emerald-700 tabular-nums">
                      ৳{prod.price.toLocaleString('bn-BD')}
                    </span>
                    {prod.isNegotiable && (
                      <span className="text-[10px] text-slate-500">আলোচনা সাপেক্ষে</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-1">
                    {prod.location}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {sorted.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Tag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-700">কোনো পণ্য পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            আপনার নির্বাচিত উপজেলা ও ফিল্টারে বর্তমানে কোনো বিজ্ঞাপন নেই। আপনি নিজেই প্রথম বিজ্ঞাপনটি পোস্ট করুন!
          </p>
          <button
            onClick={onOpenCreate}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            + বিজ্ঞাপন তৈরি করুন
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:bg-white flex items-center justify-center shadow-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo */}
            <div className="relative aspect-16/10 bg-slate-100">
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span>{selectedProduct.category}</span>
                  <span>&middot;</span>
                  <span>{selectedProduct.condition === 'used' ? 'ব্যবহৃত' : 'নতুন'}</span>
                  <span>&middot;</span>
                  <span>{selectedProduct.date}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">{selectedProduct.title}</h2>
                <div className="text-2xl font-extrabold text-emerald-700 mt-2 tabular-nums">
                  ৳{selectedProduct.price.toLocaleString('bn-BD')}
                  {selectedProduct.isNegotiable && (
                    <span className="text-xs font-normal text-slate-500 ml-2">(দাম আলোচনা সাপেক্ষে)</span>
                  )}
                </div>
              </div>

              {/* Location & Seller Info */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">বিক্রেতা:</span>
                  <span className="font-semibold text-slate-800">{selectedProduct.sellerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ঠিকানা:</span>
                  <span className="font-semibold text-slate-800 text-right">{selectedProduct.location}</span>
                </div>
                {selectedProduct.isDemo && (
                  <div className="text-[10px] text-amber-700 bg-amber-50 p-1.5 rounded border border-amber-200 mt-2">
                    ⚠ তথ্য যাচাই করা হয়নি (ডেমো লিস্টিং)। প্রকৃত পণ্য লেনদেনের সময় সামনাসামনি যাচাই করুন।
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">বিস্তারিত বিবরণ</h4>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Contact Actions */}
              <div className="space-y-2 pt-2">
                {revealedPhone ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                    <div className="text-xs text-emerald-800 font-medium">মোবাইল নম্বর:</div>
                    <div className="text-base font-bold text-emerald-950 font-mono mt-0.5">
                      {selectedProduct.phone}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setRevealedPhone(true)}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>বিক্রেতার ফোন নম্বর দেখুন</span>
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSaveToggle(selectedProduct.id)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>{savedItemIds.includes(selectedProduct.id) ? 'সংরক্ষিত' : 'সেভ করুন'}</span>
                  </button>

                  <button
                    onClick={() => {
                      onReportItem('marketplace', selectedProduct.id, selectedProduct.title);
                      setSelectedProduct(null);
                    }}
                    className="py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-medium flex items-center justify-center gap-1 cursor-pointer"
                    title="অনুপযুক্ত বা ভুয়া লিস্টিং রিপোর্ট করুন"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>রিপোর্ট</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
