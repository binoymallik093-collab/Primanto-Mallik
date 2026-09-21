export type TeachingMode = 'Home Tuition' | 'Online Tuition' | 'Both (Home & Online)';
export type Medium = 'Bangla Medium' | 'English Version' | 'English Medium' | 'Edexcel / Cambridge';
export type Gender = 'Male' | 'Female' | 'Any';

export interface Review {
  id: string;
  reviewerName: string;
  reviewerRole: 'Parent' | 'Student';
  studentClass: string;
  rating: number;
  comment: string;
  date: string;
  area: string;
}

export interface Tutor {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  university: string;
  department: string;
  degree: string;
  yearSemester: string;
  verified: boolean;
  // Distinct 3-Tier Verification Badges
  isIdentityVerified: boolean; // 🟢 Identity Verified (NID checked)
  isAcademicVerified: boolean; // 🔵 Academic Verified (University / Institution credentials checked)
  isPlatformVerified: boolean; // ⭐ Platform Verified Tutor (Triple check & screening completed)
  nidMasked?: string; // Strictly admin restricted e.g. "•••• •••• 9104"
  nidDob?: string;
  nidFrontUploaded?: boolean;
  nidBackUploaded?: boolean;
  verificationStep?: number; // 1 to 6
  verifiedDate?: string;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  avatar: string;
  expectedSalary: string;
  teachingMode: TeachingMode;
  subjects: string[];
  classesTaught: string[];
  preferredAreas: string[];
  experience: string;
  bio: string;
  phone: string;
  email: string;
  sscResult: string;
  hscResult: string;
  featured?: boolean;
  duStudentId?: string;
  hallName?: string;
}

export interface TuitionJob {
  id: string; // e.g. T-1025
  title: string;
  studentClass: string;
  curriculum: Medium;
  subjects: string[];
  location: string;
  district: string;
  daysPerWeek: number;
  preferredDays?: string;
  preferredTime: string;
  salary: number; // in BDT ৳
  preferredGender: Gender;
  preferredTutorCriteria: string;
  mode: 'Home Tuition' | 'Online Tuition' | 'Home/Online';
  status: 'Available' | 'Under Review' | 'Filled';
  postedAt: string;
  studentInstitution?: string;
  parentPhoneMasked: string;
  additionalNotes?: string;
  applicationsCount: number;
  guardianNidVerified?: boolean; // 🟢 Guardian NID Verified
}

export interface TuitionRequest {
  id: string;
  tuitionJobId?: string;
  studentName: string;
  studentClass: string;
  institution: string;
  subjects: string;
  curriculum: Medium;
  preferredGender: Gender;
  preferredLocation: string;
  mode: 'Home' | 'Online' | 'Home or Online';
  daysPerWeek: string;
  preferredDays: string;
  preferredTime: string;
  monthlyBudget: string;
  parentName: string;
  parentPhone: string;
  parentWhatsApp?: string;
  additionalRequirements: string;
  status: 'New' | 'Verified & Posted' | 'Tutor Assigned' | 'Completed';
  createdAt: string;
  // Parent/Guardian NID Verification fields
  guardianNidVerified?: boolean;
  guardianNidMasked?: string;
  guardianDob?: string;
  nidConsentAgreed?: boolean;
  isMinorStudent?: boolean;
}

export type NIDVerificationStatus = 'Pending' | 'Identity Verified' | 'Academic Verified' | 'Fully Platform Verified' | 'Rejected';

export interface NIDVerificationRecord {
  id: string;
  userId?: string;
  userType: 'Parent/Guardian' | 'Tutor/Teacher';
  userName: string;
  userPhone?: string;
  phone?: string;
  institution?: string;
  department?: string;
  nidMasked: string;
  dob: string;
  status: NIDVerificationStatus;
  submittedAt: string;
  reviewedBy?: string;
  hasFrontCard?: boolean;
  hasBackCard?: boolean;
  hasProfilePhoto?: boolean;
  nidFrontUploaded?: boolean;
  nidBackUploaded?: boolean;
  academicProofUploaded?: boolean;
  notes?: string;
}

export type ApplicationStatus = 
  | 'Pending' 
  | 'Under Review' 
  | 'More Information Required' 
  | 'Approved' 
  | 'Rejected' 
  | 'Tuition Filled' 
  | 'Cancelled'
  | 'Shortlisted' // backwards compatibility
  | 'Selected'    // backwards compatibility
  | 'Declined';   // backwards compatibility

export interface TutorApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  subject?: string;
  location?: string;
  tutorId?: string;
  tutorName: string;
  tutorPhoto?: string;
  tutorUniversity: string;
  tutorDepartment: string;
  academicYear?: string;
  tutorPhone: string;
  tutorEmail: string;
  expectedSalary: string;
  experienceSummary: string;
  message: string;
  appliedAt: string;
  status: ApplicationStatus;
  verified?: boolean;
  isIdentityVerified?: boolean;
  isAcademicVerified?: boolean;
  isPlatformVerified?: boolean;
  adminNotes?: string;
  adminDecisionAt?: string;
  moreInfoRequestedPrompt?: string;
  whatsappAlertSent?: boolean;
  emailAlertSent?: boolean;
}

export interface AdmissionUnit {
  id: string;
  university: string;
  unit: string;
  title: string;
  description: string;
  subjectsCovered: string[];
  eligibility: string;
  examPattern: string;
  topMentorsCount: number;
}
