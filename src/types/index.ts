export type DistrictId = 'mymensingh' | 'netrokona' | string;

export type UpazilaId =
  // Mymensingh Upazilas
  | 'mymensingh-sadar'
  | 'muktagachha'
  | 'bhaluka'
  | 'trishal'
  | 'fulbaria'
  | 'gafargaon'
  | 'gouripur'
  | 'ishwarganj'
  | 'nandail'
  | 'tarakanda'
  | 'fulpur'
  | 'haluaghat'
  | 'dhobaura'
  // Netrokona Upazilas
  | 'netrokona-sadar'
  | 'atpara'
  | 'barhatta'
  | 'durgapur'
  | 'kalmakanda'
  | 'kendua'
  | 'khaliajuri'
  | 'madan'
  | 'mohangonj'
  | 'purbadhala'
  | string;

export interface District {
  id: DistrictId;
  nameBn: string;
  nameEn: string;
  divisionBn: string;
  divisionEn: string;
  totalUpazilas: number;
  descriptionBn: string;
}

export interface Upazila {
  id: UpazilaId;
  districtId: DistrictId;
  nameBn: string;
  nameEn: string;
  descriptionBn: string;
  postalCode?: string;
  policeStation?: string;
  famousForBn?: string;
}

export type UserRole =
  | 'super_admin'
  | 'district_admin'
  | 'upazila_admin'
  | 'moderator'
  | 'business_owner'
  | 'user';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  assignedDistrictId?: DistrictId;
  assignedUpazilaId?: UpazilaId;
  districtId: DistrictId;
  upazilaId: UpazilaId;
  address?: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
  savedItemIds: string[];
}

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface MarketplaceProduct {
  id: string;
  title: string;
  price: number;
  isNegotiable: boolean;
  description: string;
  condition: 'new' | 'used' | 'refurbished';
  category: string;
  districtId: DistrictId;
  upazilaId: UpazilaId;
  location: string;
  phone: string;
  sellerName: string;
  date: string;
  approvalStatus: ApprovalStatus;
  ownerId: string;
  images: string[];
  isFeatured?: boolean;
  isDemo?: boolean;
  dataSource?: 'demo' | 'user';
  verificationStatus?: 'verified' | 'unverified';
  views?: number;
  createdAt: string;
}

export interface BusinessListing {
  id: string;
  name: string;
  category: string;
  districtId: DistrictId;
  upazilaId: UpazilaId;
  address: string;
  phone: string;
  whatsapp?: string;
  openingHours: string;
  description: string;
  photos: string[];
  website?: string;
  socialMedia?: string;
  isFeatured: boolean;
  approvalStatus: ApprovalStatus;
  ownerId: string;
  rating: number;
  reviewCount: number;
  isDemo?: boolean;
  dataSource?: 'demo' | 'user';
  verificationStatus?: 'verified' | 'unverified';
  createdAt: string;
}

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  districtId: DistrictId;
  upazilaId: UpazilaId;
  area: string;
  phone: string;
  lastDonationDate: string;
  isAvailable: boolean;
  privacySettings: 'public' | 'registered_only' | 'hidden';
  consentGiven: boolean;
  userId: string;
  isDemo?: boolean;
  dataSource?: 'demo' | 'user';
  verificationStatus?: 'verified' | 'unverified';
  createdAt: string;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  requiredUnits: number;
  hospital: string;
  districtId: DistrictId;
  upazilaId: UpazilaId;
  location: string;
  contactNumber: string;
  requiredDateTime: string;
  isEmergency: boolean;
  ownerId: string;
  approvalStatus: ApprovalStatus;
  isDemo?: boolean;
  dataSource?: 'demo' | 'user';
  createdAt: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  salary: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Internship';
  category: string;
  districtId: DistrictId;
  upazilaId: UpazilaId;
  location: string;
  description: string;
  requirements: string[];
  contact: string;
  deadline: string;
  ownerId: string;
  approvalStatus: ApprovalStatus;
  isFeatured?: boolean;
  isDemo?: boolean;
  dataSource?: 'demo' | 'user';
  createdAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  degrees: string;
  chamber: string;
  districtId: DistrictId;
  upazilaId: UpazilaId;
  visitingHours: string;
  phone: string;
  address: string;
  appointmentInfo: string;
  consultationFee?: string;
  isVerified: boolean;
  approvalStatus: ApprovalStatus;
  isDemo?: boolean;
  dataSource?: 'demo' | 'user';
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'diagnostic' | 'pharmacy';
  districtId: DistrictId;
  upazilaId: UpazilaId;
  address: string;
  phone: string;
  emergencyService24h: boolean;
  ambulanceAvailable: boolean;
  services: string[];
  isVerified: boolean;
  approvalStatus: ApprovalStatus;
  isDemo?: boolean;
  dataSource?: 'demo' | 'user';
}

export interface LocalServiceProvider {
  id: string;
  name: string;
  serviceType: string;
  districtId: DistrictId;
  upazilaId: UpazilaId;
  area: string;
  phone: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  description: string;
  photos: string[];
  approvalStatus: ApprovalStatus;
  ownerId: string;
  isDemo?: boolean;
  dataSource?: 'demo' | 'user';
}

export interface RentalListing {
  id: string;
  title: string;
  listingType: 'house' | 'flat' | 'room' | 'shop' | 'office' | 'warehouse' | 'land';
  rent: number;
  districtId: DistrictId;
  upazilaId: UpazilaId;
  location: string;
  size: string;
  bedrooms?: number;
  bathrooms?: number;
  photos: string[];
  description: string;
  contact: string;
  isAvailable: boolean;
  ownerId: string;
  approvalStatus: ApprovalStatus;
  isDemo?: boolean;
  dataSource?: 'demo' | 'user';
  createdAt: string;
}

export interface Advertisement {
  id: string;
  title: string;
  description: string;
  image: string;
  targetDistrictId: DistrictId;
  targetUpazilaId?: UpazilaId | 'all';
  adType: 'business_promotion' | 'product_promotion' | 'event' | 'job_ad' | 'service_ad';
  startDate: string;
  endDate: string;
  placement: 'home_hero' | 'category_banner' | 'sidebar' | 'footer_banner';
  pricingPlanId?: string;
  budget?: string;
  status: 'active' | 'pending' | 'expired';
  approvalStatus: ApprovalStatus;
  ownerId: string;
  isFeatured: boolean;
  targetUrl?: string;
  isDemo?: boolean;
  dataSource?: 'demo' | 'user';
}

export interface LocalNews {
  id: string;
  title: string;
  image: string;
  description: string;
  date: string;
  districtId: DistrictId;
  upazilaId: UpazilaId;
  category: 'local' | 'education' | 'business' | 'sports' | 'events' | 'government' | 'community';
  source: string;
  author: string;
  approvalStatus: ApprovalStatus;
  isPublished: boolean;
  isDemo?: boolean;
  dataSource?: 'demo' | 'user';
  createdAt: string;
}

export interface EmergencyContact {
  id: string;
  serviceType: 'police' | 'fire' | 'ambulance' | 'hospital' | 'blood' | 'disaster' | 'uno';
  serviceTypeBn: string;
  contactName: string;
  phone: string;
  districtId: DistrictId;
  upazilaId?: UpazilaId | 'all';
  availability: string;
  isVerified: boolean;
  approvalStatus: ApprovalStatus;
  isDemo?: boolean;
  dataSource?: 'demo' | 'user';
}

export interface PricingPlan {
  id: string;
  nameBn: string;
  nameEn: string;
  descriptionBn: string;
  price: number;
  durationDays: number;
  featuresBn: string[];
  targetType: 'business' | 'marketplace' | 'banner_ad' | 'all';
  isActive: boolean;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'blood' | 'job' | 'marketplace' | 'admin' | 'approval';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface UserReport {
  id: string;
  targetType: 'marketplace' | 'business' | 'job' | 'service' | 'rental' | 'user';
  targetId: string;
  targetTitle: string;
  reportedByUserId: string;
  reason: string;
  details: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
  timestamp: string;
}
