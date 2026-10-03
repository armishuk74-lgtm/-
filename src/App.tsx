/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  District,
  Upazila,
  MarketplaceProduct,
  BusinessListing,
  JobListing,
  BloodDonor,
  BloodRequest,
  Doctor,
  HealthcareFacility,
  LocalServiceProvider,
  RentalListing,
  LocalNews,
  Advertisement,
  EmergencyContact,
  PricingPlan,
  User,
  AppNotification,
} from './types';
import { StorageService, initStorage } from './services/storageService';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HeroBanner } from './components/HeroBanner';
import { CategoryGrid } from './components/CategoryGrid';
import { EmergencyQuickBar } from './components/EmergencyQuickBar';
import { UpazilaSelectorModal } from './components/UpazilaSelectorModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { PostCreateModal } from './components/PostCreateModal';
import { PricingModal } from './components/PricingModal';
import { DocumentationModal } from './components/DocumentationModal';
import { ReportModal } from './components/ReportModal';
import { NotificationsModal } from './components/NotificationsModal';
import { MarketplaceView } from './components/views/MarketplaceView';
import { BloodDonorView } from './components/views/BloodDonorView';
import { BusinessDirectoryView } from './components/views/BusinessDirectoryView';
import { DoctorHospitalView } from './components/views/DoctorHospitalView';
import { JobsView } from './components/views/JobsView';
import { ServicesView } from './components/views/ServicesView';
import { RentalsView } from './components/views/RentalsView';
import { NewsView } from './components/views/NewsView';
import { AdvertisementsView } from './components/views/AdvertisementsView';
import { EmergencyContactsView } from './components/views/EmergencyContactsView';
import { AgriMarketView } from './components/views/AgriMarketView';
import { TransportView } from './components/views/TransportView';
import { GovtEducationPlacesView } from './components/views/GovtEducationPlacesView';
import { UserProfileView } from './components/UserProfileView';
import { AdminDashboardView } from './components/AdminDashboardView';
import {
  BookOpen,
  Shield,
  HelpCircle,
  Tag,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export default function App() {
  // Initialize storage once on mount
  useEffect(() => {
    initStorage();
  }, []);

  // Datasets from storage
  const [districts, setDistricts] = useState<District[]>(StorageService.getDistricts());
  const [upazilas, setUpazilas] = useState<Upazila[]>(StorageService.getUpazilas());
  const [currentUser, setCurrentUser] = useState<User>(StorageService.getCurrentUser());
  const [products, setProducts] = useState<MarketplaceProduct[]>(StorageService.getProducts());
  const [businesses, setBusinesses] = useState<BusinessListing[]>(StorageService.getBusinesses());
  const [jobs, setJobs] = useState<JobListing[]>(StorageService.getJobs());
  const [bloodDonors, setBloodDonors] = useState<BloodDonor[]>(StorageService.getBloodDonors());
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>(StorageService.getBloodRequests());
  const [doctors, setDoctors] = useState<Doctor[]>(StorageService.getDoctors());
  const [facilities, setFacilities] = useState<HealthcareFacility[]>(StorageService.getFacilities());
  const [services, setServices] = useState<LocalServiceProvider[]>(StorageService.getServices());
  const [rentals, setRentals] = useState<RentalListing[]>(StorageService.getRentals());
  const [news, setNews] = useState<LocalNews[]>(StorageService.getNews());
  const [ads, setAds] = useState<Advertisement[]>(StorageService.getAds());
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(
    StorageService.getEmergencyContacts()
  );
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(StorageService.getPricingPlans());
  const [notifications, setNotifications] = useState<AppNotification[]>(
    StorageService.getNotifications(currentUser.id)
  );
  const [reports, setReports] = useState(StorageService.getReports());
  const [auditLogs, setAuditLogs] = useState(StorageService.getAuditLogs());
  const [showDemoBadges, setShowDemoBadges] = useState(StorageService.isDemoBadgesVisible());

  // Location filter state
  const [currentDistrict, setCurrentDistrict] = useState<District>(
    districts.find((d) => d.id === 'mymensingh') || districts[0]
  );
  const [currentUpazila, setCurrentUpazila] = useState<Upazila | null>(
    upazilas.find((u) => u.id === 'muktagachha') || null
  );

  // Navigation & View state
  const [activeView, setActiveView] = useState<string>('home');
  const [bottomNavTab, setBottomNavTab] = useState<
    'home' | 'search' | 'create' | 'notifications' | 'profile'
  >('home');

  // Modals state
  const [isUpazilaModalOpen, setIsUpazilaModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [reportModalData, setReportModalData] = useState<{
    isOpen: boolean;
    type: 'marketplace' | 'business' | 'job' | 'service' | 'rental' | 'user';
    id: string;
    title: string;
  }>({
    isOpen: false,
    type: 'marketplace',
    id: '',
    title: '',
  });

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Reload data from storage
  const refreshAllData = () => {
    setDistricts(StorageService.getDistricts());
    setUpazilas(StorageService.getUpazilas());
    setCurrentUser(StorageService.getCurrentUser());
    setProducts(StorageService.getProducts());
    setBusinesses(StorageService.getBusinesses());
    setJobs(StorageService.getJobs());
    setBloodDonors(StorageService.getBloodDonors());
    setBloodRequests(StorageService.getBloodRequests());
    setDoctors(StorageService.getDoctors());
    setFacilities(StorageService.getFacilities());
    setServices(StorageService.getServices());
    setRentals(StorageService.getRentals());
    setNews(StorageService.getNews());
    setAds(StorageService.getAds());
    setEmergencyContacts(StorageService.getEmergencyContacts());
    setPricingPlans(StorageService.getPricingPlans());
    setNotifications(StorageService.getNotifications(currentUser.id));
    setReports(StorageService.getReports());
    setAuditLogs(StorageService.getAuditLogs());
  };

  // Location selector change handler
  const handleSelectLocation = (dist: District, upz: Upazila | null) => {
    setCurrentDistrict(dist);
    setCurrentUpazila(upz);
    showToast(
      upz
        ? `${upz.nameBn} উপজেলা নির্বাচিত হয়েছে`
        : `${dist.nameBn} জেলা (সকল এলাকা) নির্বাচিত হয়েছে`
    );
  };

  // Saved items toggle
  const handleToggleSave = (id: string) => {
    const isNowSaved = StorageService.toggleSaveItem(id);
    setCurrentUser(StorageService.getCurrentUser());
    showToast(isNowSaved ? 'পণ্যটি পছন্দের তালিকায় সংরক্ষিত হয়েছে' : 'পণ্যটি তালিকা থেকে সরানো হয়েছে');
    return isNowSaved;
  };

  // Bottom Nav switcher
  const handleBottomNavChange = (tab: 'home' | 'search' | 'create' | 'notifications' | 'profile') => {
    setBottomNavTab(tab);
    if (tab === 'home') {
      setActiveView('home');
    } else if (tab === 'search') {
      setIsSearchModalOpen(true);
    } else if (tab === 'create') {
      setIsCreateModalOpen(true);
    } else if (tab === 'notifications') {
      setIsNotificationsModalOpen(true);
    } else if (tab === 'profile') {
      setActiveView('profile');
    }
  };

  // Category counts
  const categoryCounts: Record<string, number> = {
    marketplace: products.filter(
      (p) =>
        p.districtId === currentDistrict.id &&
        (!currentUpazila || p.upazilaId === currentUpazila.id) &&
        p.approvalStatus === 'approved'
    ).length,
    blood: bloodDonors.filter(
      (d) =>
        d.districtId === currentDistrict.id && (!currentUpazila || d.upazilaId === currentUpazila.id)
    ).length,
    jobs: jobs.filter(
      (j) =>
        j.districtId === currentDistrict.id &&
        (!currentUpazila || j.upazilaId === currentUpazila.id) &&
        j.approvalStatus === 'approved'
    ).length,
    business: businesses.filter(
      (b) =>
        b.districtId === currentDistrict.id &&
        (!currentUpazila || b.upazilaId === currentUpazila.id) &&
        b.approvalStatus === 'approved'
    ).length,
    healthcare:
      doctors.filter(
        (d) =>
          d.districtId === currentDistrict.id && (!currentUpazila || d.upazilaId === currentUpazila.id)
      ).length +
      facilities.filter(
        (f) =>
          f.districtId === currentDistrict.id && (!currentUpazila || f.upazilaId === currentUpazila.id)
      ).length,
    rentals: rentals.filter(
      (r) =>
        r.districtId === currentDistrict.id &&
        (!currentUpazila || r.upazilaId === currentUpazila.id) &&
        r.approvalStatus === 'approved'
    ).length,
    services: services.filter(
      (s) =>
        s.districtId === currentDistrict.id &&
        (!currentUpazila || s.upazilaId === currentUpazila.id) &&
        s.approvalStatus === 'approved'
    ).length,
    news: news.filter(
      (n) =>
        n.districtId === currentDistrict.id &&
        (!currentUpazila || n.upazilaId === currentUpazila.id) &&
        n.isPublished
    ).length,
    ads: ads.filter(
      (a) =>
        a.targetDistrictId === currentDistrict.id &&
        (!currentUpazila || a.targetUpazilaId === 'all' || a.targetUpazilaId === currentUpazila.id) &&
        a.status === 'active'
    ).length,
    emergency: emergencyContacts.filter(
      (c) =>
        (c.districtId === currentDistrict.id || c.districtId === 'all') &&
        (!currentUpazila || c.upazilaId === 'all' || c.upazilaId === currentUpazila.id)
    ).length,
  };

  const activeBloodRequestsCount = bloodRequests.filter(
    (r) =>
      r.districtId === currentDistrict.id &&
      (!currentUpazila || r.upazilaId === currentUpazila.id) &&
      r.approvalStatus === 'approved' &&
      r.isEmergency
  ).length;

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 md:pb-12 flex flex-col font-sans">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-800 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        currentDistrict={currentDistrict}
        currentUpazila={currentUpazila}
        onOpenUpazilaSelector={() => setIsUpazilaModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenCreate={() => setIsCreateModalOpen(true)}
        onOpenNotifications={() => setIsNotificationsModalOpen(true)}
        onOpenProfile={() => setActiveView('profile')}
        onOpenAdmin={() => setActiveView('admin')}
        onOpenEmergency={() => setActiveView('emergency')}
        currentUser={currentUser}
        unreadCount={unreadNotificationsCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Breadcrumb or Back navigation when outside home */}
        {activeView !== 'home' && (
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => setActiveView('home')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-emerald-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>হোমপেজে ফেরত যান</span>
            </button>
            <span className="text-xs text-slate-500 font-medium capitalize">
              {currentUpazila ? currentUpazila.nameBn : currentDistrict.nameBn} &middot; {activeView}
            </span>
          </div>
        )}

        {/* View Routing */}
        {activeView === 'home' && (
          <>
            {/* Hero Section */}
            <HeroBanner
              currentDistrict={currentDistrict}
              currentUpazila={currentUpazila}
              onOpenSearch={() => setIsSearchModalOpen(true)}
              onOpenUpazilaSelector={() => setIsUpazilaModalOpen(true)}
              activeBloodRequestsCount={activeBloodRequestsCount}
              onOpenBloodSection={() => setActiveView('blood')}
            />

            {/* Quick Emergency Hotlines Bar */}
            <EmergencyQuickBar
              contacts={emergencyContacts}
              onOpenEmergencyModal={() => setActiveView('emergency')}
            />

            {/* 20 Main Categories Grid */}
            <CategoryGrid
              onSelectCategory={(catId) => setActiveView(catId)}
              categoryCounts={categoryCounts}
            />

            {/* Featured Marketplace Highlights */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    সাম্প্রতিক কেনাবেচা বিজ্ঞাপন
                  </h3>
                  <p className="text-xs text-slate-500">
                    {currentUpazila ? currentUpazila.nameBn : currentDistrict.nameBn} এলাকার সর্বশেষ পণ্য
                  </p>
                </div>
                <button
                  onClick={() => setActiveView('marketplace')}
                  className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>সব দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products
                  .filter(
                    (p) =>
                      p.districtId === currentDistrict.id &&
                      (!currentUpazila || p.upazilaId === currentUpazila.id) &&
                      p.approvalStatus === 'approved'
                  )
                  .slice(0, 3)
                  .map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => setActiveView('marketplace')}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="aspect-16/10 bg-slate-100 overflow-hidden relative">
                        <img
                          src={prod.images[0]}
                          alt={prod.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute top-2 left-2 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                          {prod.category}
                        </span>
                      </div>
                      <div className="p-3.5">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700">
                          {prod.title}
                        </h4>
                        <div className="text-sm font-extrabold text-emerald-700 mt-1 tabular-nums">
                          ৳{prod.price.toLocaleString('bn-BD')}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-1">
                          {prod.location}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            {/* Featured Local Businesses */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    জনপ্রিয় ও ঐতিহ্যবাহী ব্যবসা প্রতিষ্ঠান
                  </h3>
                  <p className="text-xs text-slate-500">
                    মুক্তাগাছার মণ্ডা, নেত্রকোনার বালিশ মিষ্টি ও স্থানীয় শীর্ষ সেবা
                  </p>
                </div>
                <button
                  onClick={() => setActiveView('business')}
                  className="text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>সকল ব্যবসা</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businesses
                  .filter(
                    (b) =>
                      b.districtId === currentDistrict.id &&
                      (!currentUpazila || b.upazilaId === currentUpazila.id) &&
                      b.approvalStatus === 'approved'
                  )
                  .slice(0, 2)
                  .map((biz) => (
                    <div
                      key={biz.id}
                      onClick={() => setActiveView('business')}
                      className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5"
                    >
                      <img
                        src={biz.photos[0]}
                        alt={biz.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{biz.name}</h4>
                        <div className="text-xs text-amber-700 font-medium">{biz.category}</div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{biz.address}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </>
        )}

        {/* Dedicated Views */}
        {activeView === 'marketplace' && (
          <MarketplaceView
            products={products}
            currentDistrict={currentDistrict}
            currentUpazila={currentUpazila}
            onSaveToggle={handleToggleSave}
            savedItemIds={currentUser.savedItemIds || []}
            onReportItem={(type, id, title) =>
              setReportModalData({ isOpen: true, type, id, title })
            }
            onOpenCreate={() => setIsCreateModalOpen(true)}
            showDemoBadges={showDemoBadges}
          />
        )}

        {activeView === 'blood' && (
          <BloodDonorView
            donors={bloodDonors}
            requests={bloodRequests}
            currentDistrict={currentDistrict}
            currentUpazila={currentUpazila}
            currentUser={currentUser}
            onOpenCreateRequest={() => setIsCreateModalOpen(true)}
            onOpenRegisterDonor={() => {
              StorageService.saveBloodDonor({
                id: `donor_${Date.now()}`,
                name: currentUser.name,
                bloodGroup: 'B+',
                districtId: currentDistrict.id,
                upazilaId: currentUpazila ? currentUpazila.id : 'mymensingh-sadar',
                area: `${currentDistrict.nameBn} সদর এলাকা`,
                phone: currentUser.phone,
                lastDonationDate: '২০২৬-০৩-০১',
                isAvailable: true,
                privacySettings: 'public',
                consentGiven: true,
                userId: currentUser.id,
                isDemo: false,
                createdAt: new Date().toISOString(),
              });
              refreshAllData();
              showToast('রক্তদাতা হিসেবে সফলভাবে তালিকাভুক্ত হয়েছেন! ধন্যবাদ!');
            }}
            showDemoBadges={showDemoBadges}
          />
        )}

        {activeView === 'business' && (
          <BusinessDirectoryView
            businesses={businesses}
            currentDistrict={currentDistrict}
            currentUpazila={currentUpazila}
            onOpenCreate={() => setIsCreateModalOpen(true)}
            showDemoBadges={showDemoBadges}
          />
        )}

        {activeView === 'healthcare' && (
          <DoctorHospitalView
            doctors={doctors}
            facilities={facilities}
            currentDistrict={currentDistrict}
            currentUpazila={currentUpazila}
            onOpenCreate={() => setIsCreateModalOpen(true)}
            showDemoBadges={showDemoBadges}
          />
        )}

        {activeView === 'jobs' && (
          <JobsView
            jobs={jobs}
            currentDistrict={currentDistrict}
            currentUpazila={currentUpazila}
            onOpenCreate={() => setIsCreateModalOpen(true)}
            showDemoBadges={showDemoBadges}
          />
        )}

        {activeView === 'services' && (
          <ServicesView
            services={services}
            currentDistrict={currentDistrict}
            currentUpazila={currentUpazila}
            onOpenCreate={() => setIsCreateModalOpen(true)}
            showDemoBadges={showDemoBadges}
          />
        )}

        {activeView === 'rentals' && (
          <RentalsView
            rentals={rentals}
            currentDistrict={currentDistrict}
            currentUpazila={currentUpazila}
            onOpenCreate={() => setIsCreateModalOpen(true)}
            showDemoBadges={showDemoBadges}
          />
        )}

        {activeView === 'news' && (
          <NewsView
            news={news}
            currentDistrict={currentDistrict}
            currentUpazila={currentUpazila}
            onOpenCreate={() => setIsCreateModalOpen(true)}
            showDemoBadges={showDemoBadges}
          />
        )}

        {activeView === 'ads' && (
          <AdvertisementsView
            ads={ads}
            currentDistrict={currentDistrict}
            currentUpazila={currentUpazila}
            onOpenPricing={() => setIsPricingModalOpen(true)}
            onOpenCreate={() => setIsCreateModalOpen(true)}
            showDemoBadges={showDemoBadges}
          />
        )}

        {activeView === 'emergency' && (
          <EmergencyContactsView
            contacts={emergencyContacts}
            currentDistrict={currentDistrict}
            currentUpazila={currentUpazila}
            showDemoBadges={showDemoBadges}
          />
        )}

        {activeView === 'agriculture' && (
          <AgriMarketView currentDistrict={currentDistrict} currentUpazila={currentUpazila} />
        )}

        {activeView === 'transport' && (
          <TransportView currentDistrict={currentDistrict} currentUpazila={currentUpazila} />
        )}

        {[
          'education',
          'places',
          'banks',
          'pharmacies',
          'mosques',
          'govt',
          'petrol',
          'food',
        ].includes(activeView) && (
          <GovtEducationPlacesView
            category={activeView as any}
            currentDistrict={currentDistrict}
            currentUpazila={currentUpazila}
          />
        )}

        {activeView === 'profile' && (
          <UserProfileView
            currentUser={currentUser}
            districts={districts}
            upazilas={upazilas}
            products={products}
            savedItemIds={currentUser.savedItemIds || []}
            onRoleChanged={(u) => {
              setCurrentUser(u);
              refreshAllData();
              showToast(`রোল পরিবর্তন করা হয়েছে: ${u.role}`);
            }}
            onOpenNotifications={() => setIsNotificationsModalOpen(true)}
            onDeleteItem={(id) => {
              StorageService.deleteProduct(id);
              refreshAllData();
              showToast('বিজ্ঞাপন সফলভাবে মুছে ফেলা হয়েছে');
            }}
          />
        )}

        {activeView === 'admin' && (
          <AdminDashboardView
            currentUser={currentUser}
            districts={districts}
            upazilas={upazilas}
            products={products}
            businesses={businesses}
            jobs={jobs}
            bloodRequests={bloodRequests}
            emergencyContacts={emergencyContacts}
            pricingPlans={pricingPlans}
            reports={reports}
            auditLogs={auditLogs}
            onRefreshData={refreshAllData}
            showDemoBadges={showDemoBadges}
            onToggleDemoBadges={(show) => {
              setShowDemoBadges(show);
              StorageService.setDemoBadgesVisible(show);
              showToast(show ? 'ডেমো ব্যাজ প্রদর্শিত হচ্ছে' : 'ডেমো ব্যাজ লুকানো হয়েছে');
            }}
          />
        )}
      </main>

      {/* Global Modals */}
      <UpazilaSelectorModal
        isOpen={isUpazilaModalOpen}
        onClose={() => setIsUpazilaModalOpen(false)}
        districts={districts}
        upazilas={upazilas}
        currentDistrict={currentDistrict}
        currentUpazila={currentUpazila}
        onSelect={handleSelectLocation}
      />

      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        products={products}
        businesses={businesses}
        jobs={jobs}
        bloodDonors={bloodDonors}
        doctors={doctors}
        services={services}
        rentals={rentals}
        news={news}
        currentDistrict={currentDistrict}
        currentUpazila={currentUpazila}
        onSelectResult={(type, id) => {
          setActiveView(type);
        }}
      />

      <PostCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        currentDistrict={currentDistrict}
        currentUpazila={currentUpazila}
        upazilas={upazilas}
        currentUser={currentUser}
        onPostSuccess={(msg) => {
          refreshAllData();
          showToast(msg);
        }}
      />

      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        pricingPlans={pricingPlans}
      />

      <DocumentationModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} />

      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
        notifications={notifications}
        onMarkRead={(id) => {
          StorageService.markNotificationAsRead(id);
          refreshAllData();
        }}
      />

      <ReportModal
        isOpen={reportModalData.isOpen}
        onClose={() => setReportModalData((prev) => ({ ...prev, isOpen: false }))}
        targetType={reportModalData.type}
        targetId={reportModalData.id}
        targetTitle={reportModalData.title}
        currentUser={currentUser}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentTab={bottomNavTab}
        onChangeTab={handleBottomNavChange}
        unreadCount={unreadNotificationsCount}
      />

      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              উ
            </div>
            <span className="font-bold text-slate-800">আমাদের উপজেলা &middot; Amader Upazila</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsDocModalOpen(true)}
              className="text-emerald-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>প্রযুক্তিগত স্থাপত্য ও গাইডবুক</span>
            </button>
            <button
              onClick={() => setIsPricingModalOpen(true)}
              className="hover:text-slate-900 cursor-pointer"
            >
              বিজ্ঞাপন ও মূল্যতালিকা
            </button>
            <button onClick={() => setActiveView('admin')} className="hover:text-slate-900 cursor-pointer">
              প্রশাসনিক লগইন
            </button>
            <button
              onClick={() => {
                if (window.confirm('সকল ডেমো ডেটা পুনরায় লোড করতে চান?')) {
                  StorageService.restoreSeedData();
                  refreshAllData();
                  showToast('ডেমো ডেটাসেট সফলভাবে রিসেট করা হয়েছে!');
                }
              }}
              className="hover:text-slate-900 cursor-pointer"
            >
              সিড ডেটা রিলোড
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
