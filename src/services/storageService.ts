import {
  District,
  Upazila,
  MarketplaceProduct,
  BusinessListing,
  BloodDonor,
  BloodRequest,
  JobListing,
  Doctor,
  HealthcareFacility,
  LocalServiceProvider,
  RentalListing,
  Advertisement,
  LocalNews,
  EmergencyContact,
  PricingPlan,
  User,
  AppNotification,
  UserReport,
  AuditLog,
  ApprovalStatus,
} from '../types';
import { INITIAL_DISTRICTS, INITIAL_UPAZILAS } from '../data/districtsAndUpazilas';
import {
  INITIAL_USERS,
  INITIAL_PRODUCTS,
  INITIAL_BUSINESSES,
  INITIAL_BLOOD_DONORS,
  INITIAL_BLOOD_REQUESTS,
  INITIAL_JOBS,
  INITIAL_DOCTORS,
  INITIAL_FACILITIES,
  INITIAL_SERVICES,
  INITIAL_RENTALS,
  INITIAL_NEWS,
  INITIAL_ADVERTISEMENTS,
  INITIAL_EMERGENCY_CONTACTS,
  INITIAL_PRICING_PLANS,
} from '../data/seedData';

const STORAGE_KEYS = {
  DISTRICTS: 'amader_upazila_districts_v1',
  UPAZILAS: 'amader_upazila_upazilas_v1',
  USERS: 'amader_upazila_users_v1',
  CURRENT_USER: 'amader_upazila_current_user_v1',
  PRODUCTS: 'amader_upazila_products_v1',
  BUSINESSES: 'amader_upazila_businesses_v1',
  BLOOD_DONORS: 'amader_upazila_donors_v1',
  BLOOD_REQUESTS: 'amader_upazila_blood_requests_v1',
  JOBS: 'amader_upazila_jobs_v1',
  DOCTORS: 'amader_upazila_doctors_v1',
  FACILITIES: 'amader_upazila_facilities_v1',
  SERVICES: 'amader_upazila_services_v1',
  RENTALS: 'amader_upazila_rentals_v1',
  NEWS: 'amader_upazila_news_v1',
  ADS: 'amader_upazila_ads_v1',
  EMERGENCY: 'amader_upazila_emergency_v1',
  PRICING: 'amader_upazila_pricing_v1',
  NOTIFICATIONS: 'amader_upazila_notifications_v1',
  REPORTS: 'amader_upazila_reports_v1',
  AUDIT_LOGS: 'amader_upazila_audit_logs_v1',
  SHOW_DEMO_BADGES: 'amader_upazila_show_demo_badges_v1',
};

// Safe JSON storage wrapper
function getStored<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

// Initial bootstrap
export function initStorage(): void {
  if (!localStorage.getItem(STORAGE_KEYS.DISTRICTS)) {
    setStored(STORAGE_KEYS.DISTRICTS, INITIAL_DISTRICTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.UPAZILAS)) {
    setStored(STORAGE_KEYS.UPAZILAS, INITIAL_UPAZILAS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    setStored(STORAGE_KEYS.USERS, INITIAL_USERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
    // Default logged in as Super Admin so the user can test all features immediately
    setStored(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0]);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    setStored(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.BUSINESSES)) {
    setStored(STORAGE_KEYS.BUSINESSES, INITIAL_BUSINESSES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOOD_DONORS)) {
    setStored(STORAGE_KEYS.BLOOD_DONORS, INITIAL_BLOOD_DONORS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOOD_REQUESTS)) {
    setStored(STORAGE_KEYS.BLOOD_REQUESTS, INITIAL_BLOOD_REQUESTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.JOBS)) {
    setStored(STORAGE_KEYS.JOBS, INITIAL_JOBS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.DOCTORS)) {
    setStored(STORAGE_KEYS.DOCTORS, INITIAL_DOCTORS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.FACILITIES)) {
    setStored(STORAGE_KEYS.FACILITIES, INITIAL_FACILITIES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    setStored(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.RENTALS)) {
    setStored(STORAGE_KEYS.RENTALS, INITIAL_RENTALS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.NEWS)) {
    setStored(STORAGE_KEYS.NEWS, INITIAL_NEWS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ADS)) {
    setStored(STORAGE_KEYS.ADS, INITIAL_ADVERTISEMENTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.EMERGENCY)) {
    setStored(STORAGE_KEYS.EMERGENCY, INITIAL_EMERGENCY_CONTACTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRICING)) {
    setStored(STORAGE_KEYS.PRICING, INITIAL_PRICING_PLANS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    const defaultNotifs: AppNotification[] = [
      {
        id: 'notif_welcome',
        userId: 'user_super_admin',
        title: 'আমাদের উপজেলায় স্বাগতম!',
        message: 'ময়মনসিংহ ও নেত্রকোনা জেলার সকল উপজেলা এখন আপনার হাতের মুঠোয়। আপনার জেলা ও উপজেলা সিলেক্ট করে শুরু করুন।',
        type: 'admin',
        read: false,
        createdAt: '২০২৬-০৩-৩০T০৮:০০:০০Z',
      },
      {
        id: 'notif_blood_alert',
        userId: 'user_super_admin',
        title: 'জরুরি রক্তের আবেদন (B+)',
        message: 'ময়মনসিংহ মেডিকেল কলেজ হাসপাতালে ২ ব্যাগ B+ রক্তের জরুরি প্রয়োজন।',
        type: 'blood',
        read: false,
        createdAt: '২০২৬-০৪-০২T০৮:৩০:০০Z',
      },
    ];
    setStored(STORAGE_KEYS.NOTIFICATIONS, defaultNotifs);
  }
  if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
    const defaultLogs: AuditLog[] = [
      {
        id: 'log_init',
        adminId: 'user_super_admin',
        adminName: 'তানভীর আহমেদ',
        action: 'SYSTEM_BOOTSTRAP',
        targetType: 'SYSTEM',
        targetId: 'amader-upazila-core',
        details: 'ময়মনসিংহ ও নেত্রকোনা জেলার ২৩টি উপজেলার ডেটাসেট ইনিশিয়ালাইজেশন সম্পন্ন হয়েছে।',
        timestamp: new Date().toISOString(),
      },
    ];
    setStored(STORAGE_KEYS.AUDIT_LOGS, defaultLogs);
  }
}

export const StorageService = {
  // Districts & Upazilas
  getDistricts(): District[] {
    return getStored<District[]>(STORAGE_KEYS.DISTRICTS, INITIAL_DISTRICTS);
  },
  saveDistrict(district: District): void {
    const list = this.getDistricts();
    const idx = list.findIndex((d) => d.id === district.id);
    if (idx >= 0) {
      list[idx] = district;
    } else {
      list.push(district);
    }
    setStored(STORAGE_KEYS.DISTRICTS, list);
  },
  getUpazilas(): Upazila[] {
    return getStored<Upazila[]>(STORAGE_KEYS.UPAZILAS, INITIAL_UPAZILAS);
  },
  saveUpazila(upazila: Upazila): void {
    const list = this.getUpazilas();
    const idx = list.findIndex((u) => u.id === upazila.id);
    if (idx >= 0) {
      list[idx] = upazila;
    } else {
      list.push(upazila);
    }
    setStored(STORAGE_KEYS.UPAZILAS, list);
  },

  // Auth & Users
  getUsers(): User[] {
    return getStored<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  },
  getCurrentUser(): User {
    return getStored<User>(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0]);
  },
  setCurrentUser(user: User): void {
    setStored(STORAGE_KEYS.CURRENT_USER, user);
  },
  updateUser(updated: User): void {
    const users = this.getUsers().map((u) => (u.id === updated.id ? updated : u));
    setStored(STORAGE_KEYS.USERS, users);
    const current = this.getCurrentUser();
    if (current.id === updated.id) {
      setStored(STORAGE_KEYS.CURRENT_USER, updated);
    }
  },
  switchUserRole(role: User['role'], assignedDistrict?: string, assignedUpazila?: string): User {
    const current = this.getCurrentUser();
    const updated: User = {
      ...current,
      role,
      assignedDistrictId: assignedDistrict || current.assignedDistrictId,
      assignedUpazilaId: assignedUpazila || current.assignedUpazilaId,
    };
    this.updateUser(updated);
    return updated;
  },

  // Products
  getProducts(): MarketplaceProduct[] {
    return getStored<MarketplaceProduct[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  },
  saveProduct(item: MarketplaceProduct): void {
    const list = this.getProducts();
    const idx = list.findIndex((p) => p.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.unshift(item);
    }
    setStored(STORAGE_KEYS.PRODUCTS, list);
  },
  deleteProduct(id: string): void {
    const list = this.getProducts().filter((p) => p.id !== id);
    setStored(STORAGE_KEYS.PRODUCTS, list);
  },
  updateProductStatus(id: string, status: ApprovalStatus, adminName: string): void {
    const list = this.getProducts().map((p) => (p.id === id ? { ...p, approvalStatus: status } : p));
    setStored(STORAGE_KEYS.PRODUCTS, list);
    this.addAuditLog(adminName, `PRODUCT_${status.toUpperCase()}`, 'product', id, `Status updated to ${status}`);
  },

  // Businesses
  getBusinesses(): BusinessListing[] {
    return getStored<BusinessListing[]>(STORAGE_KEYS.BUSINESSES, INITIAL_BUSINESSES);
  },
  saveBusiness(biz: BusinessListing): void {
    const list = this.getBusinesses();
    const idx = list.findIndex((b) => b.id === biz.id);
    if (idx >= 0) {
      list[idx] = biz;
    } else {
      list.unshift(biz);
    }
    setStored(STORAGE_KEYS.BUSINESSES, list);
  },
  deleteBusiness(id: string): void {
    const list = this.getBusinesses().filter((b) => b.id !== id);
    setStored(STORAGE_KEYS.BUSINESSES, list);
  },
  updateBusinessStatus(id: string, status: ApprovalStatus, adminName: string): void {
    const list = this.getBusinesses().map((b) => (b.id === id ? { ...b, approvalStatus: status } : b));
    setStored(STORAGE_KEYS.BUSINESSES, list);
    this.addAuditLog(adminName, `BUSINESS_${status.toUpperCase()}`, 'business', id, `Status updated to ${status}`);
  },

  // Blood Donors
  getBloodDonors(): BloodDonor[] {
    return getStored<BloodDonor[]>(STORAGE_KEYS.BLOOD_DONORS, INITIAL_BLOOD_DONORS);
  },
  saveBloodDonor(donor: BloodDonor): void {
    const list = this.getBloodDonors();
    const idx = list.findIndex((d) => d.id === donor.id);
    if (idx >= 0) {
      list[idx] = donor;
    } else {
      list.unshift(donor);
    }
    setStored(STORAGE_KEYS.BLOOD_DONORS, list);
  },

  // Blood Requests
  getBloodRequests(): BloodRequest[] {
    return getStored<BloodRequest[]>(STORAGE_KEYS.BLOOD_REQUESTS, INITIAL_BLOOD_REQUESTS);
  },
  saveBloodRequest(req: BloodRequest): void {
    const list = this.getBloodRequests();
    const idx = list.findIndex((r) => r.id === req.id);
    if (idx >= 0) {
      list[idx] = req;
    } else {
      list.unshift(req);
    }
    setStored(STORAGE_KEYS.BLOOD_REQUESTS, list);
  },
  updateBloodRequestStatus(id: string, status: ApprovalStatus, adminName: string): void {
    const list = this.getBloodRequests().map((r) => (r.id === id ? { ...r, approvalStatus: status } : r));
    setStored(STORAGE_KEYS.BLOOD_REQUESTS, list);
    this.addAuditLog(adminName, `BLOOD_REQUEST_${status.toUpperCase()}`, 'blood_request', id, `Status updated to ${status}`);
  },

  // Jobs
  getJobs(): JobListing[] {
    return getStored<JobListing[]>(STORAGE_KEYS.JOBS, INITIAL_JOBS);
  },
  saveJob(job: JobListing): void {
    const list = this.getJobs();
    const idx = list.findIndex((j) => j.id === job.id);
    if (idx >= 0) {
      list[idx] = job;
    } else {
      list.unshift(job);
    }
    setStored(STORAGE_KEYS.JOBS, list);
  },
  deleteJob(id: string): void {
    const list = this.getJobs().filter((j) => j.id !== id);
    setStored(STORAGE_KEYS.JOBS, list);
  },
  updateJobStatus(id: string, status: ApprovalStatus, adminName: string): void {
    const list = this.getJobs().map((j) => (j.id === id ? { ...j, approvalStatus: status } : j));
    setStored(STORAGE_KEYS.JOBS, list);
    this.addAuditLog(adminName, `JOB_${status.toUpperCase()}`, 'job', id, `Status updated to ${status}`);
  },

  // Doctors & Facilities
  getDoctors(): Doctor[] {
    return getStored<Doctor[]>(STORAGE_KEYS.DOCTORS, INITIAL_DOCTORS);
  },
  saveDoctor(doc: Doctor): void {
    const list = this.getDoctors();
    const idx = list.findIndex((d) => d.id === doc.id);
    if (idx >= 0) {
      list[idx] = doc;
    } else {
      list.unshift(doc);
    }
    setStored(STORAGE_KEYS.DOCTORS, list);
  },
  getFacilities(): HealthcareFacility[] {
    return getStored<HealthcareFacility[]>(STORAGE_KEYS.FACILITIES, INITIAL_FACILITIES);
  },
  saveFacility(fac: HealthcareFacility): void {
    const list = this.getFacilities();
    const idx = list.findIndex((f) => f.id === fac.id);
    if (idx >= 0) {
      list[idx] = fac;
    } else {
      list.unshift(fac);
    }
    setStored(STORAGE_KEYS.FACILITIES, list);
  },

  // Services
  getServices(): LocalServiceProvider[] {
    return getStored<LocalServiceProvider[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  },
  saveService(srv: LocalServiceProvider): void {
    const list = this.getServices();
    const idx = list.findIndex((s) => s.id === srv.id);
    if (idx >= 0) {
      list[idx] = srv;
    } else {
      list.unshift(srv);
    }
    setStored(STORAGE_KEYS.SERVICES, list);
  },

  // Rentals
  getRentals(): RentalListing[] {
    return getStored<RentalListing[]>(STORAGE_KEYS.RENTALS, INITIAL_RENTALS);
  },
  saveRental(rental: RentalListing): void {
    const list = this.getRentals();
    const idx = list.findIndex((r) => r.id === rental.id);
    if (idx >= 0) {
      list[idx] = rental;
    } else {
      list.unshift(rental);
    }
    setStored(STORAGE_KEYS.RENTALS, list);
  },
  deleteRental(id: string): void {
    const list = this.getRentals().filter((r) => r.id !== id);
    setStored(STORAGE_KEYS.RENTALS, list);
  },

  // News
  getNews(): LocalNews[] {
    return getStored<LocalNews[]>(STORAGE_KEYS.NEWS, INITIAL_NEWS);
  },
  saveNews(news: LocalNews): void {
    const list = this.getNews();
    const idx = list.findIndex((n) => n.id === news.id);
    if (idx >= 0) {
      list[idx] = news;
    } else {
      list.unshift(news);
    }
    setStored(STORAGE_KEYS.NEWS, list);
  },

  // Advertisements
  getAds(): Advertisement[] {
    return getStored<Advertisement[]>(STORAGE_KEYS.ADS, INITIAL_ADVERTISEMENTS);
  },
  saveAd(ad: Advertisement): void {
    const list = this.getAds();
    const idx = list.findIndex((a) => a.id === ad.id);
    if (idx >= 0) {
      list[idx] = ad;
    } else {
      list.unshift(ad);
    }
    setStored(STORAGE_KEYS.ADS, list);
  },

  // Emergency Contacts
  getEmergencyContacts(): EmergencyContact[] {
    return getStored<EmergencyContact[]>(STORAGE_KEYS.EMERGENCY, INITIAL_EMERGENCY_CONTACTS);
  },
  saveEmergencyContact(contact: EmergencyContact): void {
    const list = this.getEmergencyContacts();
    const idx = list.findIndex((c) => c.id === contact.id);
    if (idx >= 0) {
      list[idx] = contact;
    } else {
      list.unshift(contact);
    }
    setStored(STORAGE_KEYS.EMERGENCY, list);
  },
  deleteEmergencyContact(id: string): void {
    const list = this.getEmergencyContacts().filter((c) => c.id !== id);
    setStored(STORAGE_KEYS.EMERGENCY, list);
  },

  // Pricing Plans
  getPricingPlans(): PricingPlan[] {
    return getStored<PricingPlan[]>(STORAGE_KEYS.PRICING, INITIAL_PRICING_PLANS);
  },
  savePricingPlan(plan: PricingPlan): void {
    const list = this.getPricingPlans();
    const idx = list.findIndex((p) => p.id === plan.id);
    if (idx >= 0) {
      list[idx] = plan;
    } else {
      list.unshift(plan);
    }
    setStored(STORAGE_KEYS.PRICING, list);
  },

  // Notifications
  getNotifications(userId: string): AppNotification[] {
    const all = getStored<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    return all.filter((n) => n.userId === userId || n.userId === 'all');
  },
  addNotification(notif: AppNotification): void {
    const list = getStored<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    list.unshift(notif);
    setStored(STORAGE_KEYS.NOTIFICATIONS, list);
  },
  markNotificationAsRead(id: string): void {
    const list = getStored<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n));
    setStored(STORAGE_KEYS.NOTIFICATIONS, updated);
  },

  // Reports
  getReports(): UserReport[] {
    return getStored<UserReport[]>(STORAGE_KEYS.REPORTS, []);
  },
  submitReport(report: UserReport): void {
    const list = this.getReports();
    list.unshift(report);
    setStored(STORAGE_KEYS.REPORTS, list);
  },
  updateReportStatus(id: string, status: UserReport['status']): void {
    const list = this.getReports().map((r) => (r.id === id ? { ...r, status } : r));
    setStored(STORAGE_KEYS.REPORTS, list);
  },

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return getStored<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, []);
  },
  addAuditLog(adminName: string, action: string, targetType: string, targetId: string, details: string): void {
    const current = this.getCurrentUser();
    const list = this.getAuditLogs();
    const log: AuditLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      adminId: current.id,
      adminName: adminName || current.name,
      action,
      targetType,
      targetId,
      details,
      timestamp: new Date().toISOString(),
    };
    list.unshift(log);
    setStored(STORAGE_KEYS.AUDIT_LOGS, list.slice(0, 100)); // Keep latest 100
  },

  // Saved / Favorite items
  toggleSaveItem(itemId: string): boolean {
    const user = this.getCurrentUser();
    const saved = user.savedItemIds || [];
    let isSavedNow = false;
    let newSaved: string[];
    if (saved.includes(itemId)) {
      newSaved = saved.filter((id) => id !== itemId);
      isSavedNow = false;
    } else {
      newSaved = [...saved, itemId];
      isSavedNow = true;
    }
    const updatedUser: User = { ...user, savedItemIds: newSaved };
    this.updateUser(updatedUser);
    return isSavedNow;
  },

  // Demo Data Controls
  isDemoBadgesVisible(): boolean {
    return getStored<boolean>(STORAGE_KEYS.SHOW_DEMO_BADGES, true);
  },
  setDemoBadgesVisible(visible: boolean): void {
    setStored(STORAGE_KEYS.SHOW_DEMO_BADGES, visible);
  },
  purgeDemoData(): void {
    const filterOutDemo = <T extends { isDemo?: boolean }>(items: T[]): T[] => items.filter((i) => !i.isDemo);
    setStored(STORAGE_KEYS.PRODUCTS, filterOutDemo(this.getProducts()));
    setStored(STORAGE_KEYS.BUSINESSES, filterOutDemo(this.getBusinesses()));
    setStored(STORAGE_KEYS.BLOOD_DONORS, filterOutDemo(this.getBloodDonors()));
    setStored(STORAGE_KEYS.BLOOD_REQUESTS, filterOutDemo(this.getBloodRequests()));
    setStored(STORAGE_KEYS.JOBS, filterOutDemo(this.getJobs()));
    setStored(STORAGE_KEYS.DOCTORS, filterOutDemo(this.getDoctors()));
    setStored(STORAGE_KEYS.FACILITIES, filterOutDemo(this.getFacilities()));
    setStored(STORAGE_KEYS.SERVICES, filterOutDemo(this.getServices()));
    setStored(STORAGE_KEYS.RENTALS, filterOutDemo(this.getRentals()));
    setStored(STORAGE_KEYS.NEWS, filterOutDemo(this.getNews()));
    setStored(STORAGE_KEYS.ADS, filterOutDemo(this.getAds()));
    setStored(STORAGE_KEYS.EMERGENCY, filterOutDemo(this.getEmergencyContacts()));
  },
  restoreSeedData(): void {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.BUSINESSES);
    localStorage.removeItem(STORAGE_KEYS.BLOOD_DONORS);
    localStorage.removeItem(STORAGE_KEYS.BLOOD_REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.JOBS);
    localStorage.removeItem(STORAGE_KEYS.DOCTORS);
    localStorage.removeItem(STORAGE_KEYS.FACILITIES);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.RENTALS);
    localStorage.removeItem(STORAGE_KEYS.NEWS);
    localStorage.removeItem(STORAGE_KEYS.ADS);
    localStorage.removeItem(STORAGE_KEYS.EMERGENCY);
    initStorage();
  },
};
