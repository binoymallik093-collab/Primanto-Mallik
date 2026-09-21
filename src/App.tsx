import React, { useState } from 'react';
import { 
  Tutor, 
  TuitionJob, 
  TuitionRequest, 
  TutorApplication,
  ApplicationStatus,
  NIDVerificationRecord,
  NIDVerificationStatus
} from './types';
import { 
  INITIAL_TUTORS, 
  INITIAL_TUITION_JOBS, 
  INITIAL_TUITION_REQUESTS, 
  INITIAL_APPLICATIONS,
  INITIAL_NID_RECORDS
} from './data/initialData';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { CategoriesSection } from './components/CategoriesSection';
import { VerificationSection } from './components/VerificationSection';
import { HowItWorks } from './components/HowItWorks';
import { TuitionJobsBoard } from './components/TuitionJobsBoard';
import { TutorsDirectory } from './components/TutorsDirectory';
import { AdmissionPrepSection } from './components/AdmissionPrepSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FindTutorForm } from './components/FindTutorForm';
import { BecomeTutorForm } from './components/BecomeTutorForm';
import { TutorProfileModal } from './components/TutorProfileModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { QuickContactFloating } from './components/QuickContactFloating';
import { Footer } from './components/Footer';

export function App() {
  // Global View Navigation: 'home' | 'tutors' | 'jobs' | 'admission' | 'verification' | 'how-it-works' | 'about' | 'contact' | 'find-tutor' | 'become-tutor'
  const [activeTab, setActiveTab] = useState<string>('home');

  // Application Data States
  const [tutors, setTutors] = useState<Tutor[]>(INITIAL_TUTORS);
  const [jobs, setJobs] = useState<TuitionJob[]>(INITIAL_TUITION_JOBS);
  const [requests, setRequests] = useState<TuitionRequest[]>(INITIAL_TUITION_REQUESTS);
  const [applications, setApplications] = useState<TutorApplication[]>(INITIAL_APPLICATIONS);
  const [nidRecords, setNidRecords] = useState<NIDVerificationRecord[]>(INITIAL_NID_RECORDS);

  // Modals & Selections
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [requestedTutorName, setRequestedTutorName] = useState<string | undefined>(undefined);

  // Toast notifications for user feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Switch to Find Tutor Form (Optionally prefilling a specific tutor)
  const handleOpenFindTutor = (tutorName?: string) => {
    setRequestedTutorName(tutorName);
    setActiveTab('find-tutor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch to Become Tutor Form
  const handleOpenBecomeTutor = () => {
    setActiveTab('become-tutor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Search from Hero
  const handleHeroSearch = (_filters: { classLevel: string; subject: string; area: string }) => {
    setActiveTab('tutors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Parent Tuition Request Submission
  const handleSubmitRequest = (requestData: Omit<TuitionRequest, 'id' | 'createdAt' | 'status'>): string => {
    const nextIdNumber = 1030 + requests.length + 1;
    const generatedTuitionId = `T-${nextIdNumber}`;

    const newRequest: TuitionRequest = {
      ...requestData,
      id: `req-${Date.now()}`,
      tuitionJobId: generatedTuitionId,
      status: 'New',
      createdAt: 'Just now'
    };

    // Also auto-generate an active listing on the Tuition Jobs Board
    const newJob: TuitionJob = {
      id: generatedTuitionId,
      title: `${requestData.studentClass} ${requestData.subjects}`,
      studentClass: requestData.studentClass,
      curriculum: requestData.curriculum,
      subjects: requestData.subjects.split(',').map(s => s.trim()).filter(Boolean),
      location: requestData.preferredLocation,
      district: 'Dhaka',
      daysPerWeek: parseInt(requestData.daysPerWeek) || 3,
      preferredDays: requestData.preferredDays,
      preferredTime: requestData.preferredTime,
      salary: parseInt(requestData.monthlyBudget) || 8000,
      preferredGender: requestData.preferredGender,
      preferredTutorCriteria: 'University of Dhaka student or graduate preferred',
      mode: requestData.mode === 'Home' ? 'Home Tuition' : requestData.mode === 'Online' ? 'Online Tuition' : 'Home/Online',
      postedAt: 'Just now',
      applicationsCount: 0,
      status: 'Available',
      parentPhoneMasked: requestData.parentPhone.slice(0, 7) + '***' + requestData.parentPhone.slice(-2),
      guardianNidVerified: false
    };

    const newGuardianNidRecord: NIDVerificationRecord = {
      id: `vr-g-${Date.now()}`,
      userId: generatedTuitionId,
      userName: requestData.parentName || 'Parent / Guardian',
      userType: 'Parent/Guardian',
      phone: requestData.parentPhone,
      nidMasked: '•••• •••• 8841',
      dob: '1982-04-10',
      nidFrontUploaded: true,
      nidBackUploaded: true,
      submittedAt: 'Just now',
      status: 'Pending',
      notes: `Parent/Guardian verification for Tuition ID ${generatedTuitionId} in ${requestData.preferredLocation}.`
    };

    setRequests([newRequest, ...requests]);
    setJobs([newJob, ...jobs]);
    setNidRecords([newGuardianNidRecord, ...nidRecords]);
    showToast(`Tuition Request ${generatedTuitionId} registered & posted to board!`);
    return generatedTuitionId;
  };

  // Handle Tutor Registration Submission
  const handleRegisterTutor = (tutorData: Omit<Tutor, 'id' | 'rating' | 'reviewsCount' | 'reviews'>) => {
    const newTutor: Tutor = {
      ...tutorData,
      id: `tutor-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      reviews: []
    };

    const newTutorNidRecord: NIDVerificationRecord = {
      id: `vr-${Date.now()}`,
      userId: newTutor.id,
      userName: newTutor.name,
      userType: 'Tutor/Teacher',
      phone: newTutor.phone,
      nidMasked: newTutor.nidMasked || '•••• •••• 9901',
      dob: newTutor.nidDob || '2001-05-12',
      nidFrontUploaded: true,
      nidBackUploaded: true,
      academicProofUploaded: true,
      institution: newTutor.university,
      department: newTutor.department,
      submittedAt: 'Just now',
      status: 'Pending',
      notes: 'New tutor registration awaiting admin NID and DU student ID card validation.'
    };

    setTutors([newTutor, ...tutors]);
    setNidRecords([newTutorNidRecord, ...nidRecords]);
    showToast(`Registration received! Profile submitted for Step 2 verification.`);
  };

  // Handle Tutor Application on Jobs Board
  const handleApplyForJob = (applicationData: Omit<TutorApplication, 'id' | 'appliedAt' | 'status'>) => {
    const targetJob = jobs.find(j => j.id === applicationData.jobId);
    const newApp: TutorApplication = {
      ...applicationData,
      id: `app-${Date.now()}`,
      appliedAt: 'Just now',
      status: 'Pending',
      subject: applicationData.subject || (targetJob ? targetJob.subjects.slice(0, 2).join(', ') : 'Academic Subjects'),
      location: applicationData.location || (targetJob ? targetJob.location : 'Dhaka'),
      whatsappAlertSent: true,
      emailAlertSent: true
    };

    setApplications([newApp, ...applications]);

    // Increment application count on the job
    setJobs(jobs.map(j => j.id === applicationData.jobId ? { ...j, applicationsCount: j.applicationsCount + 1 } : j));
    showToast(`Tuition Application for ${applicationData.jobId} submitted to Admin Panel!`);
  };

  // Admin actions
  const handleToggleVerifyTutor = (tutorId: string) => {
    setTutors(tutors.map(t => {
      if (t.id === tutorId) {
        const newVerified = !t.verified;
        return {
          ...t,
          verified: newVerified,
          isIdentityVerified: newVerified,
          isAcademicVerified: newVerified,
          isPlatformVerified: newVerified,
          verificationStep: newVerified ? 6 : 2
        };
      }
      return t;
    }));
    showToast('Tutor verification status updated in registry.');
  };

  const handleToggleTutorBadge = (tutorId: string, badgeType: 'identity' | 'academic' | 'platform') => {
    setTutors(tutors.map(t => {
      if (t.id === tutorId) {
        if (badgeType === 'identity') {
          const nextVal = !t.isIdentityVerified;
          return { ...t, isIdentityVerified: nextVal, verified: nextVal || !!t.isAcademicVerified || !!t.isPlatformVerified };
        }
        if (badgeType === 'academic') {
          const nextVal = !t.isAcademicVerified;
          return { ...t, isAcademicVerified: nextVal, verified: !!t.isIdentityVerified || nextVal || !!t.isPlatformVerified };
        }
        if (badgeType === 'platform') {
          const nextVal = !t.isPlatformVerified;
          return { ...t, isPlatformVerified: nextVal, verified: !!t.isIdentityVerified || !!t.isAcademicVerified || nextVal };
        }
      }
      return t;
    }));
    showToast(`Updated tutor verification badge (${badgeType}).`);
  };

  const handleUpdateNIDStatus = (recordId: string, newStatus: NIDVerificationStatus) => {
    setNidRecords(nidRecords.map(r => {
      if (r.id === recordId) {
        return { ...r, status: newStatus };
      }
      return r;
    }));

    // Synchronize tutor badge if the NID record belongs to a tutor
    const record = nidRecords.find(r => r.id === recordId);
    if (record && record.userId && record.userType === 'Tutor/Teacher') {
      setTutors(tutors.map(t => {
        if (t.id === record.userId) {
          if (newStatus === 'Identity Verified') {
            return { ...t, isIdentityVerified: true, verified: true };
          } else if (newStatus === 'Academic Verified') {
            return { ...t, isIdentityVerified: true, isAcademicVerified: true, verified: true };
          } else if (newStatus === 'Fully Platform Verified') {
            return { ...t, isIdentityVerified: true, isAcademicVerified: true, isPlatformVerified: true, verified: true, verificationStep: 6 };
          } else if (newStatus === 'Pending' || newStatus === 'Rejected') {
            return { ...t, isIdentityVerified: false, isAcademicVerified: false, isPlatformVerified: false, verified: false };
          }
        }
        return t;
      }));
    }

    // Synchronize parent request if the NID record belongs to a parent
    if (record && record.userId && record.userType === 'Parent/Guardian') {
      const isVerified = newStatus === 'Identity Verified' || newStatus === 'Academic Verified' || newStatus === 'Fully Platform Verified';
      setJobs(jobs.map(j => {
        if (j.id === record.userId) {
          return { ...j, guardianNidVerified: isVerified };
        }
        return j;
      }));
    }

    showToast(`Verification status set to "${newStatus}".`);
  };

  const handleUpdateJobStatus = (jobId: string, status: 'Available' | 'Under Review' | 'Filled') => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, status } : j));
    showToast(`Job ${jobId} status updated to ${status}.`);
  };

  const handleUpdateRequestStatus = (requestId: string, status: any) => {
    setRequests(requests.map(r => r.id === requestId ? { ...r, status } : r));
    showToast(`Tuition request status updated.`);
  };

  const handleAddNewJob = (newJobData: Omit<TuitionJob, 'postedAt' | 'applicationsCount'>) => {
    const job: TuitionJob = {
      ...newJobData,
      postedAt: 'Just now',
      applicationsCount: 0
    };
    setJobs([job, ...jobs]);
    showToast(`New Tuition Post ${job.id} created successfully.`);
  };

  const handleUpdateApplicationStatus = (
    appId: string, 
    status: ApplicationStatus, 
    notes?: string,
    moreInfoPrompt?: string
  ) => {
    setApplications(applications.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status,
          adminNotes: notes !== undefined ? notes : a.adminNotes,
          moreInfoRequestedPrompt: moreInfoPrompt !== undefined ? moreInfoPrompt : a.moreInfoRequestedPrompt,
          adminDecisionAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })
        };
      }
      return a;
    }));
    showToast(`Application marked as ${status}.`);
  };

  const activeJobsCount = jobs.filter(j => j.status === 'Available').length;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#0f294a] text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400/40 text-xs sm:text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Responsive Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openFindTutor={() => handleOpenFindTutor()}
        openBecomeTutor={handleOpenBecomeTutor}
        openAdminModal={() => setIsAdminOpen(true)}
        activeJobsCount={activeJobsCount}
      />

      {/* Dynamic Content Views */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE (Complete overview showcasing all core modules) */}
        {activeTab === 'home' && (
          <div className="space-y-0">
            {/* Hero Section */}
            <Hero
              openFindTutor={() => handleOpenFindTutor()}
              openBecomeTutor={handleOpenBecomeTutor}
              onSearch={handleHeroSearch}
              onNavigateToJobs={() => {
                setActiveTab('jobs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Core Services Section */}
            <ServicesSection
              onSelectService={(_name) => handleOpenFindTutor()}
              openFindTutor={() => handleOpenFindTutor()}
            />

            {/* 6-Step Verification System Showcase */}
            <VerificationSection
              openBecomeTutor={handleOpenBecomeTutor}
              openFindTutor={() => handleOpenFindTutor()}
            />

            {/* Top Featured Verified Tutors Preview */}
            <TutorsDirectory
              tutors={tutors}
              onSelectTutor={(tutor) => setSelectedTutor(tutor)}
              onRequestTutor={(tutor: Tutor) => handleOpenFindTutor(tutor.name)}
              openBecomeTutor={handleOpenBecomeTutor}
            />

            {/* Live Tuition Jobs Board Preview */}
            <TuitionJobsBoard
              jobs={jobs}
              onApplyForJob={handleApplyForJob}
              openFindTutor={() => handleOpenFindTutor()}
            />

            {/* Tuition Categories */}
            <CategoriesSection
              onSelectCategory={(_cat) => handleOpenFindTutor()}
              openFindTutor={() => handleOpenFindTutor()}
            />

            {/* How It Works (Students vs Tutors) */}
            <HowItWorks
              openFindTutor={() => handleOpenFindTutor()}
              openBecomeTutor={handleOpenBecomeTutor}
            />

            {/* Admission Guidance Section */}
            <AdmissionPrepSection
              openFindTutor={() => handleOpenFindTutor()}
              openBecomeTutor={handleOpenBecomeTutor}
            />

            {/* About Platform & Vision */}
            <AboutSection
              openFindTutor={() => handleOpenFindTutor()}
              openBecomeTutor={handleOpenBecomeTutor}
            />

            {/* Direct Contact & Instant Inquiry Form */}
            <ContactSection openFindTutor={() => handleOpenFindTutor()} />
          </div>
        )}

        {/* VIEW 2: TUTORS DIRECTORY */}
        {activeTab === 'tutors' && (
          <div className="py-6">
            <TutorsDirectory
              tutors={tutors}
              onSelectTutor={(tutor) => setSelectedTutor(tutor)}
              onRequestTutor={(tutor: Tutor) => handleOpenFindTutor(tutor.name)}
              openBecomeTutor={handleOpenBecomeTutor}
            />
          </div>
        )}

        {/* VIEW 3: LIVE TUITION JOBS BOARD */}
        {activeTab === 'jobs' && (
          <div className="py-6">
            <TuitionJobsBoard
              jobs={jobs}
              onApplyForJob={handleApplyForJob}
              openFindTutor={() => handleOpenFindTutor()}
            />
          </div>
        )}

        {/* VIEW 4: UNIVERSITY ADMISSION & MENTORSHIP */}
        {activeTab === 'admission' && (
          <div className="py-6">
            <AdmissionPrepSection
              openFindTutor={() => handleOpenFindTutor()}
              openBecomeTutor={handleOpenBecomeTutor}
            />
          </div>
        )}

        {/* VIEW 5: VERIFICATION PIPELINE */}
        {activeTab === 'verification' && (
          <div className="py-6">
            <VerificationSection
              openBecomeTutor={handleOpenBecomeTutor}
              openFindTutor={() => handleOpenFindTutor()}
            />
          </div>
        )}

        {/* VIEW 6: HOW IT WORKS */}
        {activeTab === 'how-it-works' && (
          <div className="py-6">
            <HowItWorks
              openFindTutor={() => handleOpenFindTutor()}
              openBecomeTutor={handleOpenBecomeTutor}
            />
          </div>
        )}

        {/* VIEW 7: ABOUT US & VISION */}
        {activeTab === 'about' && (
          <div className="py-6">
            <AboutSection
              openFindTutor={() => handleOpenFindTutor()}
              openBecomeTutor={handleOpenBecomeTutor}
            />
          </div>
        )}

        {/* VIEW 8: CONTACT */}
        {activeTab === 'contact' && (
          <div className="py-6">
            <ContactSection openFindTutor={() => handleOpenFindTutor()} />
          </div>
        )}

        {/* VIEW 9: REQUEST A TUTOR FORM */}
        {activeTab === 'find-tutor' && (
          <FindTutorForm
            onSubmitRequest={handleSubmitRequest}
            onCancel={() => setActiveTab('home')}
            preselectedTutorName={requestedTutorName}
          />
        )}

        {/* VIEW 10: BECOME A TUTOR FORM */}
        {activeTab === 'become-tutor' && (
          <BecomeTutorForm
            onRegisterTutor={handleRegisterTutor}
            onCancel={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Floating Action Concierge (Call & WhatsApp) */}
      <QuickContactFloating openFindTutor={() => handleOpenFindTutor()} />

      {/* Detailed Tutor Profile & Review Modal */}
      <TutorProfileModal
        tutor={selectedTutor}
        onClose={() => setSelectedTutor(null)}
        onRequestTutor={(tutor: Tutor) => {
          setSelectedTutor(null);
          handleOpenFindTutor(tutor.name);
        }}
      />

      {/* Administrative Control Dashboard */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        tutors={tutors}
        jobs={jobs}
        requests={requests}
        applications={applications}
        nidRecords={nidRecords}
        onToggleVerifyTutor={handleToggleVerifyTutor}
        onToggleTutorBadge={handleToggleTutorBadge}
        onUpdateNIDStatus={handleUpdateNIDStatus}
        onUpdateJobStatus={handleUpdateJobStatus}
        onUpdateRequestStatus={handleUpdateRequestStatus}
        onAddNewJob={handleAddNewJob}
        onUpdateApplicationStatus={handleUpdateApplicationStatus}
      />

      {/* Platform Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openFindTutor={() => handleOpenFindTutor()}
        openBecomeTutor={handleOpenBecomeTutor}
        openAdmin={() => setIsAdminOpen(true)}
      />
    </div>
  );
}

export default App;
