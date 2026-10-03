import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  Phone,
  DollarSign,
  Building,
  CheckCircle2,
  Calendar,
  Search,
  PlusCircle,
  Share2,
  X,
  Sparkles,
} from 'lucide-react';
import { JobListing, District, Upazila } from '../../types';
import { JOB_CATEGORIES } from '../../data/categories';

interface JobsViewProps {
  jobs: JobListing[];
  currentDistrict: District;
  currentUpazila: Upazila | null;
  onOpenCreate: () => void;
  showDemoBadges: boolean;
}

export const JobsView: React.FC<JobsViewProps> = ({
  jobs,
  currentDistrict,
  currentUpazila,
  onOpenCreate,
  showDemoBadges,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  const filtered = jobs.filter((j) => {
    if (j.districtId !== currentDistrict.id) return false;
    if (currentUpazila && j.upazilaId !== currentUpazila.id) return false;
    if (j.approvalStatus !== 'approved') return false;

    if (selectedCategory !== 'all' && j.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = j.title.toLowerCase().includes(q);
      const matchComp = j.company.toLowerCase().includes(q);
      const matchDesc = j.description.toLowerCase().includes(q);
      if (!matchTitle && !matchComp && !matchDesc) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">স্থানীয় চাকরির খবর</h2>
            <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
              {currentUpazila ? currentUpazila.nameBn : currentDistrict.nameBn}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            উপজেলার ফ্যাক্টরি, দোকানপাট, শোরুম, অফিস ও ড্রাইভিং এর সর্বশেষ নিয়োগ বিজ্ঞপ্তি
          </p>
        </div>
        <button
          onClick={onOpenCreate}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          + চাকরির নিয়োগ পোস্ট করুন
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="চাকরির পদ বা কোম্পানির নাম লিখে খুঁজুন (যেমন: ম্যানেজার, সেলস, ড্রাইভার, কিউসি...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
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
            সকল সেক্টর
          </button>
          {JOB_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors font-medium ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((job) => (
          <div
            key={job.id}
            onClick={() => setSelectedJob(job)}
            className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    {job.jobType}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1.5">{job.title}</h3>
                  <div className="text-xs font-medium text-slate-600 flex items-center gap-1 mt-0.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.company}</span>
                  </div>
                </div>

                {showDemoBadges && job.isDemo && (
                  <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded shrink-0">
                    ডেমো বিজ্ঞপ্তি
                  </span>
                )}
              </div>

              <div className="my-3 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">বেতন:</span>
                <span className="font-bold text-emerald-700">{job.salary}</span>
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="line-clamp-1">{job.location}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">আবেদনের শেষ: {job.deadline}</span>
              <span className="text-blue-600 font-semibold hover:underline">বিস্তারিত দেখুন &rarr;</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-700">কোনো চাকরি পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            আপনার প্রতিষ্ঠানে জনবল প্রয়োজন হলে এখানে বিনামূল্যে চাকরির বিজ্ঞপ্তি পোস্ট করুন।
          </p>
          <button
            onClick={onOpenCreate}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            + চাকরির বিজ্ঞপ্তি দিন
          </button>
        </div>
      )}

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 relative">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              {selectedJob.category} &middot; {selectedJob.jobType}
            </span>

            <h2 className="text-lg font-bold text-slate-900 mt-2">{selectedJob.title}</h2>
            <div className="text-xs font-semibold text-slate-700 mt-0.5">{selectedJob.company}</div>

            <div className="my-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
              <span className="text-emerald-800 font-medium">মাসিক বেতন:</span>
              <span className="text-base font-extrabold text-emerald-950">{selectedJob.salary}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-1">কাজের বিবরণ</h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedJob.description}
                </p>
              </div>

              {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-1">প্রয়োজনীয় যোগ্যতা</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center gap-1.5 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>কর্মস্থল: {selectedJob.location}</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>আবেদনের শেষ তারিখ: {selectedJob.deadline}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href={`tel:${selectedJob.contact.replace(/[^0-9]/g, '')}`}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>আবেদন করতে যোগাযোগ করুন ({selectedJob.contact})</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
