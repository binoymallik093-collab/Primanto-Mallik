import React, { useState } from 'react';
import { 
  X, 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileCheck, 
  ShieldCheck, 
  CheckCircle, 
  AlertCircle, 
  Trash2, 
  Edit3, 
  Plus, 
  Search, 
  Send,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Lock,
  UserCheck,
  Award,
  GraduationCap,
  CheckCircle2,
  Eye,
  ShieldAlert,
  MessageSquare,
  Filter,
  Copy,
  Check,
  MessageCircle,
  Share2
} from 'lucide-react';
import { 
  Tutor, 
  TuitionJob, 
  TuitionRequest, 
  TutorApplication, 
  ApplicationStatus, 
  NIDVerificationRecord, 
  NIDVerificationStatus 
} from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutors: Tutor[];
  jobs: TuitionJob[];
  requests: TuitionRequest[];
  applications: TutorApplication[];
  nidRecords?: NIDVerificationRecord[];
  onToggleVerifyTutor: (tutorId: string) => void;
  onToggleTutorBadge?: (tutorId: string, badgeType: 'identity' | 'academic' | 'platform') => void;
  onUpdateNIDStatus?: (recordId: string, newStatus: NIDVerificationStatus) => void;
  onUpdateJobStatus: (jobId: string, status: 'Available' | 'Under Review' | 'Filled') => void;
  onUpdateRequestStatus: (requestId: string, status: 'New' | 'Verified & Posted' | 'Tutor Assigned' | 'Completed') => void;
  onAddNewJob: (job: Omit<TuitionJob, 'postedAt' | 'applicationsCount'>) => void;
  onUpdateApplicationStatus: (appId: string, status: ApplicationStatus, notes?: string, prompt?: string) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  tutors,
  jobs,
  requests,
  applications,
  nidRecords = [],
  onToggleVerifyTutor,
  onToggleTutorBadge,
  onUpdateNIDStatus,
  onUpdateJobStatus,
  onUpdateRequestStatus,
  onAddNewJob,
  onUpdateApplicationStatus
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'verifications' | 'requests' | 'tutors' | 'jobs' | 'applications' | 'revenue'>('overview');
  const [nidUserFilter, setNidUserFilter] = useState<'All' | 'Tutor/Teacher' | 'Parent/Guardian'>('All');

  // Application Review & Filter States
  const [selectedAppForReview, setSelectedAppForReview] = useState<TutorApplication | null>(null);
  const [appFilterStatus, setAppFilterStatus] = useState<'All' | ApplicationStatus>('All');
  const [appSearchQuery, setAppSearchQuery] = useState('');
  const [copiedAppId, setCopiedAppId] = useState<string | null>(null);
  const [moreInfoModalApp, setMoreInfoModalApp] = useState<TutorApplication | null>(null);
  const [moreInfoPromptText, setMoreInfoPromptText] = useState('Please provide your university student ID card copy and confirm your hall residency in Dhaka.');
  const [reviewAdminNotes, setReviewAdminNotes] = useState('');

  // New Job Creation Form State
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [newJobId, setNewJobId] = useState(`TU-${1030 + jobs.length}`);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobClass, setNewJobClass] = useState('HSC 1st Year');
  const [newJobSubjects, setNewJobSubjects] = useState('');
  const [newJobLocation, setNewJobLocation] = useState('Dhanmondi');
  const [newJobDays, setNewJobDays] = useState(3);
  const [newJobSalary, setNewJobSalary] = useState(8500);
  const [newJobGender, setNewJobGender] = useState<'Any' | 'Male' | 'Female'>('Any');
  const [newJobCriteria, setNewJobCriteria] = useState('University of Dhaka student preferred');
  const [newJobMode, setNewJobMode] = useState<'Home Tuition' | 'Online Tuition' | 'Home/Online'>('Home Tuition');

  // WhatsApp & Email Formatters
  const generateWhatsAppNotification = (app: TutorApplication) => {
    return `🔔 *New Tuition Application*\nTuition ID: ${app.jobId}\nTutor: ${app.tutorName}\nUniversity: ${app.tutorUniversity}\nSubject: ${app.subject || 'English / Academics'}\nLocation: ${app.location || 'Dhaka'}\n\nPlease log in to the Admin Panel to review and approve the application.`;
  };

  const getAdminWhatsAppLink = (app: TutorApplication) => {
    const text = generateWhatsAppNotification(app);
    return `https://wa.me/8801614599107?text=${encodeURIComponent(text)}`;
  };

  const getTutorWhatsAppLink = (app: TutorApplication) => {
    const cleanPhone = app.tutorPhone.replace(/[^0-9]/g, '');
    const bdPhone = cleanPhone.startsWith('880') ? cleanPhone : cleanPhone.startsWith('0') ? `88${cleanPhone}` : `880${cleanPhone}`;
    const text = `Hello ${app.tutorName}, this is regarding your application for Tuition ${app.jobId} on Dhaka University Tuition & Tutors Media.`;
    return `https://wa.me/${bdPhone}?text=${encodeURIComponent(text)}`;
  };

  const getAdminEmailLink = (app: TutorApplication) => {
    const subject = `🔔 New Tuition Application [${app.jobId}] - Tutor: ${app.tutorName}`;
    const body = `New Tutor Application Notification
------------------------------------------
Tuition ID: ${app.jobId}
Tutor: ${app.tutorName}
University: ${app.tutorUniversity}
Department: ${app.tutorDepartment}
Academic Year: ${app.academicYear || 'Not specified'}
Subject: ${app.subject || 'Academic Subjects'}
Location: ${app.location || 'Dhaka'}
Phone: ${app.tutorPhone}
Email: ${app.tutorEmail}
Expected Salary: ${app.expectedSalary}
Teaching Experience: ${app.experienceSummary}

Message from Tutor:
"${app.message || 'No additional message'}"

Please review and take an administrative decision in the Admin Control Panel.`;
    return `mailto:dutuitionmedia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const copyNotificationText = (app: TutorApplication) => {
    navigator.clipboard.writeText(generateWhatsAppNotification(app));
    setCopiedAppId(app.id);
    setTimeout(() => setCopiedAppId(null), 2000);
  };

  // Status Styling Configuration
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Pending':
        return {
          label: 'Pending',
          icon: '🟡',
          bg: 'bg-amber-100 text-amber-900 border-amber-300'
        };
      case 'Under Review':
        return {
          label: 'Under Review',
          icon: '🔵',
          bg: 'bg-blue-100 text-blue-900 border-blue-300'
        };
      case 'More Information Required':
        return {
          label: 'More Information Required',
          icon: '🟠',
          bg: 'bg-orange-100 text-orange-900 border-orange-300'
        };
      case 'Approved':
        return {
          label: 'Approved',
          icon: '🟢',
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300'
        };
      case 'Rejected':
        return {
          label: 'Rejected',
          icon: '🔴',
          bg: 'bg-rose-100 text-rose-900 border-rose-300'
        };
      case 'Tuition Filled':
        return {
          label: 'Tuition Filled',
          icon: '⚪',
          bg: 'bg-slate-100 text-slate-800 border-slate-300'
        };
      case 'Cancelled':
        return {
          label: 'Cancelled',
          icon: '⚫',
          bg: 'bg-slate-900 text-slate-100 border-slate-700'
        };
      default:
        return {
          label: status,
          icon: '🟡',
          bg: 'bg-slate-100 text-slate-800 border-slate-300'
        };
    }
  };

  if (!isOpen) return null;

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNewJob({
      id: newJobId,
      title: newJobTitle || `${newJobClass} ${newJobSubjects}`,
      studentClass: newJobClass,
      curriculum: 'Bangla Medium',
      subjects: newJobSubjects.split(',').map(s => s.trim()).filter(Boolean),
      location: newJobLocation,
      district: 'Dhaka',
      daysPerWeek: Number(newJobDays),
      preferredDays: '3 days/week',
      preferredTime: 'Evening Slot',
      salary: Number(newJobSalary),
      preferredGender: newJobGender,
      preferredTutorCriteria: newJobCriteria,
      mode: newJobMode,
      status: 'Available',
      parentPhoneMasked: '+880 1711-***00'
    });

    setShowNewJobModal(false);
    // Reset
    setNewJobTitle('');
    setNewJobSubjects('');
  };

  const verifiedTutorsCount = tutors.filter(t => t.verified).length;
  const pendingTutorsCount = tutors.filter(t => !t.verified).length;
  const pendingNidCount = nidRecords.filter(r => r.status === 'Pending').length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Bar */}
        <div className="bg-[#0f294a] text-white p-5 sm:px-8 flex items-center justify-between border-b border-blue-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black">Admin Management Dashboard</h3>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                  Live Control
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Dhaka University Tuition & Tutors Media Platform Administration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-blue-900/60 text-slate-300 hover:text-white hover:bg-blue-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 px-4 sm:px-8 py-2.5 border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'overview', label: 'Overview Metrics', icon: LayoutDashboard },
            { id: 'verifications', label: `🔐 NID Verifications (${nidRecords.length})`, icon: ShieldCheck, badge: pendingNidCount > 0 ? `${pendingNidCount} Pending` : undefined },
            { id: 'requests', label: `Parent Requests (${requests.length})`, icon: FileCheck },
            { id: 'tutors', label: `Tutors (${tutors.length})`, icon: Users, badge: pendingTutorsCount > 0 ? `${pendingTutorsCount} Pending` : undefined },
            { id: 'jobs', label: `Tuition Job Posts (${jobs.length})`, icon: Briefcase },
            { id: 'applications', label: `Tutor Applications (${applications.length})`, icon: Send, badge: applications.filter(a => a.status === 'Pending').length > 0 ? `${applications.filter(a => a.status === 'Pending').length} Pending` : undefined },
            { id: 'revenue', label: 'Revenue Models (Sec 13)', icon: DollarSign }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition cursor-pointer ${
                  isActive
                    ? 'bg-[#0f294a] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="bg-amber-500 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-extrabold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* 5 Core Benchmark Stat Cards (from Section 6) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                <div className="bg-blue-50/80 border border-blue-200/90 rounded-2xl p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 block">Total Tutors</span>
                  <div className="text-2xl font-black text-blue-950 mt-1">
                    {Math.max(850, 850 + tutors.length - 8)}
                  </div>
                  <span className="text-[11px] text-blue-700 font-medium">Registered database</span>
                </div>

                <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">Verified Tutors</span>
                  <div className="text-2xl font-black text-emerald-950 mt-1">
                    {Math.max(620, 620 + verifiedTutorsCount - 6)}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold">NID & DU Vetted</span>
                </div>

                <div className="bg-cyan-50/80 border border-cyan-200/90 rounded-2xl p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-800 block">Active Tuition Jobs</span>
                  <div className="text-2xl font-black text-cyan-950 mt-1">
                    {Math.max(47, 40 + jobs.filter(j => j.status === 'Available').length)}
                  </div>
                  <span className="text-[11px] text-cyan-700 font-medium">Live on job board</span>
                </div>

                <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-4 relative overflow-hidden">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block">Pending Applications</span>
                  <div className="text-2xl font-black text-amber-950 mt-1 flex items-baseline gap-1">
                    <span>{applications.filter(a => a.status === 'Pending').length}</span>
                    <span className="text-xs text-amber-700 font-bold">awaiting</span>
                  </div>
                  <span className="text-[11px] text-amber-800 font-semibold">Awaiting admin review</span>
                </div>

                <div className="bg-emerald-50/80 border border-emerald-300 rounded-2xl p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">Approved Applications</span>
                  <div className="text-2xl font-black text-emerald-950 mt-1">
                    {applications.filter(a => a.status === 'Approved').length}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold">Cleared for matching</span>
                </div>
              </div>

              {/* Sole Administrative Authority Mandate Box */}
              <div className="bg-gradient-to-r from-[#0f294a] via-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md border border-blue-900/60 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                        Central Platform Mandate
                      </span>
                      <span className="text-xs font-semibold text-blue-200">
                        Sole Administrative Authority & Quality Gate
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                      "All tutor applications must be reviewed and approved by the platform administrator before the tutor is considered for a tuition assignment."
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      The administrator has the sole authority to approve, reject, or request additional information regarding an application. No application automatically goes to the parent/student. You have complete administrative control.
                    </p>
                  </div>

                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <button
                      onClick={() => setActiveTab('applications')}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black shadow-xs transition flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Review Applications</span>
                      <span className="bg-slate-950 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {applications.filter(a => a.status === 'Pending').length}
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab('verifications')}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold transition text-center cursor-pointer"
                    >
                      NID Audit Cell
                    </button>
                  </div>
                </div>
              </div>

              {/* 10-Step Interactive Workflow Pipeline Diagram */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>🔄 Complete Tutor Application & Administrative Approval Workflow</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Visual end-to-end audit lifecycle from student inquiry to trial coordination.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    10-Step Pipeline
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
                  {[
                    { step: '01', title: 'Parent Submits', desc: 'Tuition request submitted', color: 'bg-slate-50 border-slate-200 text-slate-800' },
                    { step: '02', title: 'Admin Publishes', desc: 'Screened & assigned TU-ID', color: 'bg-blue-50 border-blue-200 text-blue-900' },
                    { step: '03', title: 'Tutors Browse', desc: 'Seen on live job board', color: 'bg-slate-50 border-slate-200 text-slate-800' },
                    { step: '04', title: 'Tutor Applies', desc: 'Direct application clicked', color: 'bg-amber-50 border-amber-200 text-amber-900' },
                    { step: '05', title: 'Enters Admin Panel', desc: 'Queued under 🟡 Pending', color: 'bg-amber-100 border-amber-300 text-amber-950 font-bold' },
                    { step: '06', title: 'WhatsApp & Email', desc: 'Instant alerts sent to you', color: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
                    { step: '07', title: 'Admin Reviews', desc: 'Profile, NID & DU verification', color: 'bg-blue-100 border-blue-300 text-blue-950 font-bold' },
                    { step: '08', title: 'Admin Decision', desc: 'Approve / Reject / Request Info', color: 'bg-purple-50 border-purple-200 text-purple-900 font-bold' },
                    { step: '09', title: 'Approved Matched', desc: 'Shortlisted for tuition assignment', color: 'bg-emerald-100 border-emerald-300 text-emerald-950 font-bold' },
                    { step: '10', title: 'Coordinate Demo', desc: 'Admin connects with guardian', color: 'bg-slate-900 border-slate-950 text-white font-bold' }
                  ].map((p) => (
                    <div key={p.step} className={`p-3 rounded-2xl border ${p.color} flex flex-col justify-between`}>
                      <div className="text-[10px] font-black opacity-60">STEP {p.step}</div>
                      <div className="font-bold text-xs mt-1">{p.title}</div>
                      <div className="text-[11px] opacity-80 mt-0.5 leading-tight">{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 🔔 Pending Applications Table (Explicitly Requested by User in Section 6) */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base">🔔</span>
                      <h4 className="text-sm font-black text-slate-900">
                        Pending Tutor Applications Queue
                      </h4>
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-200">
                        {applications.filter(a => a.status === 'Pending').length} Pending Review
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Click <strong>"Review"</strong> to inspect complete tutor profile, DU verification & NID documents before making your decision.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setAppFilterStatus('Pending');
                      setActiveTab('applications');
                    }}
                    className="text-xs text-blue-700 font-bold hover:underline"
                  >
                    View All in Full Manager →
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <tr>
                        <th className="p-3.5">Tuition ID</th>
                        <th className="p-3.5">Tutor Name</th>
                        <th className="p-3.5">University & Dept</th>
                        <th className="p-3.5">Subject & Location</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Administrative Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.filter(a => a.status === 'Pending').length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-6 text-center text-slate-500 italic">
                            No pending tutor applications awaiting screening at this moment.
                          </td>
                        </tr>
                      ) : (
                        applications
                          .filter(a => a.status === 'Pending')
                          .slice(0, 5)
                          .map((app) => (
                            <tr key={app.id} className="hover:bg-slate-50/70 transition">
                              <td className="p-3.5">
                                <span className="font-mono text-xs font-black bg-blue-900 text-white px-2 py-0.5 rounded">
                                  {app.jobId}
                                </span>
                              </td>
                              <td className="p-3.5">
                                <div className="font-bold text-slate-900">{app.tutorName}</div>
                                <div className="text-[11px] text-slate-500">{app.academicYear || 'University Student'}</div>
                              </td>
                              <td className="p-3.5">
                                <div className="font-medium text-slate-800">{app.tutorUniversity}</div>
                                <div className="text-[11px] text-slate-500">{app.tutorDepartment}</div>
                              </td>
                              <td className="p-3.5">
                                <div className="font-semibold text-slate-900">{app.subject || 'Academics'}</div>
                                <div className="text-[11px] text-slate-500">{app.location || 'Dhaka'} • {app.expectedSalary}</div>
                              </td>
                              <td className="p-3.5">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                  <span>🟡</span>
                                  <span>Pending</span>
                                </span>
                              </td>
                              <td className="p-3.5 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => setSelectedAppForReview(app)}
                                    className="bg-[#0f294a] hover:bg-[#1e3a8a] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
                                  >
                                    Review
                                  </button>
                                  <button
                                    onClick={() => onUpdateApplicationStatus(app.id, 'Approved', 'Approved from pending quick table')}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
                                    title="Quick Approve"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => onUpdateApplicationStatus(app.id, 'Rejected', 'Declined from quick queue')}
                                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
                                    title="Quick Reject"
                                  >
                                    Reject
                                  </button>
                                  <a
                                    href={getTutorWhatsAppLink(app)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-1.5 rounded-lg hover:bg-emerald-100 transition cursor-pointer"
                                    title="WhatsApp Tutor"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activity summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Parent Requests */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-800">Latest Parent Tuition Requests</h4>
                    <button onClick={() => setActiveTab('requests')} className="text-xs text-blue-700 font-bold hover:underline cursor-pointer">
                      View All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {requests.slice(0, 3).map((req) => (
                      <div key={req.id} className="bg-white p-3 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">{req.studentName} ({req.studentClass})</div>
                          <div className="text-slate-500">{req.subjects} • {req.preferredLocation}</div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          req.status === 'New' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Latest Tutor Job Applications */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-800">Recent Applications Stream</h4>
                    <button onClick={() => setActiveTab('applications')} className="text-xs text-blue-700 font-bold hover:underline cursor-pointer">
                      View All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {applications.slice(0, 3).map((app) => {
                      const badge = getStatusBadge(app.status);
                      return (
                        <div key={app.id} className="bg-white p-3 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                          <div>
                            <div className="font-bold text-slate-900">{app.tutorName} • {app.tutorDepartment}</div>
                            <div className="text-slate-500">Applied for: {app.jobId} ({app.expectedSalary})</div>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg}`}>
                            {badge.icon} {badge.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: NID VERIFICATIONS (CELL) */}
          {activeTab === 'verifications' && (
            <div className="space-y-6">
              {/* Confidentiality Warning & Protocol Header */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold flex items-center gap-2">
                        <span>Restricted Verification Cell (NID & Academic Audit)</span>
                        <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[10px] font-mono uppercase font-bold border border-red-500/30">
                          Strict Audit Log Active
                        </span>
                      </h4>
                      <p className="text-xs text-slate-300">
                        Government Smart NID documents & university enrollment verification pipeline. Data minimization active: Public profiles display only earned badges.
                      </p>
                    </div>
                  </div>

                  {/* Filter by User Type */}
                  <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
                    {(['All', 'Tutor/Teacher', 'Parent/Guardian'] as const).map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setNidUserFilter(filter)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          nidUserFilter === filter
                            ? 'bg-amber-400 text-slate-950 shadow-sm'
                            : 'text-slate-300 hover:text-white hover:bg-slate-700'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3 Badges Reference strip */}
                <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 flex items-center gap-2">
                    <span className="text-base">🟢</span>
                    <div>
                      <strong className="text-white block font-bold text-[11px]">Identity Verified</strong>
                      <span className="text-slate-400 text-[10px]">Government NID number, DOB & photo checked</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 flex items-center gap-2">
                    <span className="text-base">🔵</span>
                    <div>
                      <strong className="text-white block font-bold text-[11px]">Academic Verified</strong>
                      <span className="text-slate-400 text-[10px]">DU Student ID, department rolls & GPA transcripts</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 flex items-center gap-2">
                    <span className="text-base">⭐</span>
                    <div>
                      <strong className="text-white block font-bold text-[11px]">Platform Verified</strong>
                      <span className="text-slate-400 text-[10px]">Identity + Academic + Pedagogy screening passed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Records List */}
              <div className="space-y-3">
                {nidRecords
                  .filter(r => nidUserFilter === 'All' || r.userType === nidUserFilter)
                  .map((rec) => (
                    <div 
                      key={rec.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-blue-300 transition space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            rec.userType === 'Tutor/Teacher' 
                              ? 'bg-blue-50 text-blue-800 border border-blue-200' 
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}>
                            {rec.userType}
                          </span>
                          <h5 className="font-bold text-sm text-[#0f294a]">
                            {rec.userName}
                          </h5>
                          <span className="text-xs text-slate-500 font-mono">
                            {rec.userPhone}
                          </span>
                        </div>

                        {/* Status Selection */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-500">Status:</span>
                          <select
                            value={rec.status}
                            onChange={(e) => onUpdateNIDStatus?.(rec.id, e.target.value as NIDVerificationStatus)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                              rec.status === 'Fully Platform Verified'
                                ? 'bg-amber-50 text-amber-900 border-amber-300'
                                : rec.status === 'Academic Verified'
                                ? 'bg-blue-50 text-blue-900 border-blue-300'
                                : rec.status === 'Identity Verified'
                                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                : rec.status === 'Pending'
                                ? 'bg-yellow-50 text-yellow-900 border-yellow-300'
                                : 'bg-red-50 text-red-900 border-red-300'
                            }`}
                          >
                            <option value="Pending">🟡 Pending Review</option>
                            <option value="Identity Verified">🟢 1. Identity Verified (NID)</option>
                            <option value="Academic Verified">🔵 2. Academic Verified (DU)</option>
                            <option value="Fully Platform Verified">⭐ 3. Fully Platform Verified</option>
                            <option value="Rejected">🔴 Rejected</option>
                          </select>
                        </div>
                      </div>

                      {/* Detail Metrics */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl">
                        <div>
                          <span className="text-slate-400 block text-[11px] font-semibold">Government NID:</span>
                          <span className="font-mono font-bold text-slate-800">{rec.nidMasked}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px] font-semibold">Date of Birth:</span>
                          <span className="font-semibold text-slate-800">{rec.dob || 'Verified'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px] font-semibold">Institution / Location:</span>
                          <span className="font-semibold text-slate-800 truncate block">{rec.institution}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px] font-semibold">Submitted:</span>
                          <span className="text-slate-700">{rec.submittedAt}</span>
                        </div>
                      </div>

                      {/* Upload Document Badges & Notes */}
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-500 font-semibold">Encrypted Vault Files:</span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 ${
                            rec.hasFrontCard ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <CheckCircle2 className="w-3 h-3" /> NID Front
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 ${
                            rec.hasBackCard ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <CheckCircle2 className="w-3 h-3" /> NID Back
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 ${
                            rec.hasProfilePhoto ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <CheckCircle2 className="w-3 h-3" /> Face Photo
                          </span>
                        </div>

                        {rec.notes && (
                          <div className="text-[11px] text-slate-500 italic max-w-md truncate">
                            Notes: "{rec.notes}"
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 2: PARENT REQUESTS */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-800">
                  Student & Parent Tuition Requests ({requests.length})
                </h4>
                <span className="text-xs text-slate-500">
                  Approve and push requests to the public Tuition Jobs Board
                </span>
              </div>

              <div className="space-y-3">
                {requests.map((req) => (
                  <div key={req.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#0f294a]">
                          {req.studentName} ({req.studentClass})
                        </span>
                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {req.curriculum}
                        </span>
                        {req.tuitionJobId && (
                          <span className="text-xs bg-blue-100 text-blue-900 font-mono font-bold px-2 py-0.5 rounded">
                            {req.tuitionJobId}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={req.status}
                          onChange={(e) => onUpdateRequestStatus(req.id, e.target.value as any)}
                          className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="New">New Request</option>
                          <option value="Verified & Posted">Verified & Posted</option>
                          <option value="Tutor Assigned">Tutor Assigned</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600">
                      <div>
                        <span className="text-slate-400 block">Institution:</span>
                        <strong className="text-slate-800">{req.institution}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Location:</span>
                        <strong className="text-slate-800">{req.preferredLocation}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Subjects:</span>
                        <strong className="text-slate-800">{req.subjects}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Monthly Budget:</span>
                        <strong className="text-emerald-700 font-bold">৳{req.monthlyBudget}/mo</strong>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-700">
                      <div>
                        <span className="font-semibold">Parent Contact: </span>
                        <strong>{req.parentName}</strong> — 
                        <a href={`tel:${req.parentPhone}`} className="text-blue-700 font-mono ml-1 hover:underline">
                          📞 {req.parentPhone}
                        </a>
                        {req.parentWhatsApp && (
                          <a 
                            href={`https://wa.me/88${req.parentWhatsApp.replace(/^0/, '')}`}
                            target="_blank" 
                            rel="noreferrer"
                            className="text-emerald-700 font-mono ml-2 hover:underline"
                          >
                            💬 WhatsApp
                          </a>
                        )}
                      </div>
                      {req.additionalRequirements && (
                        <div>
                          <span className="font-semibold">Notes: </span>
                          <span className="italic">"{req.additionalRequirements}"</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TUTORS & VERIFICATION */}
          {activeTab === 'tutors' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-800">
                    Tutors Roster & Verification Management ({tutors.length})
                  </h4>
                  <p className="text-xs text-slate-500">
                    Review submitted student IDs and grant the official 6-Step Verified DU Badge.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {tutors.map((tutor) => (
                  <div key={tutor.id} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <img
                        src={tutor.avatar}
                        alt={tutor.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                      />
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h5 className="font-bold text-slate-900 text-sm">{tutor.name}</h5>
                          {tutor.isIdentityVerified && (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              🟢 NID Verified
                            </span>
                          )}
                          {tutor.isAcademicVerified && (
                            <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              🔵 Academic Verified
                            </span>
                          )}
                          {tutor.isPlatformVerified && (
                            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              ⭐ Platform Verified
                            </span>
                          )}
                          {!tutor.isIdentityVerified && !tutor.isAcademicVerified && (
                            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              Step 2: Unverified
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-blue-900 font-medium">
                          {tutor.department} • {tutor.university} ({tutor.yearSemester})
                        </p>
                        <div className="text-xs text-slate-500 flex flex-wrap gap-2">
                          <span>Phone: {tutor.phone}</span>
                          <span>•</span>
                          <span>ID: {tutor.duStudentId || 'Uploaded'}</span>
                          <span>•</span>
                          <span>NID Vault: <strong className="font-mono text-slate-700">{tutor.nidMasked || '•••• •••• 9901'}</strong></span>
                          <span>•</span>
                          <span>Rate: {tutor.expectedSalary}</span>
                        </div>
                      </div>
                    </div>

                    {/* 3-Tier Badges Toggle Bar */}
                    <div className="flex flex-wrap items-center gap-1.5 self-end md:self-auto">
                      <button
                        type="button"
                        onClick={() => onToggleTutorBadge?.(tutor.id, 'identity')}
                        title="Toggle Government NID Verification"
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer border ${
                          tutor.isIdentityVerified
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span>🟢 NID {tutor.isIdentityVerified ? '✓' : '+'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onToggleTutorBadge?.(tutor.id, 'academic')}
                        title="Toggle University Academic Verification"
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer border ${
                          tutor.isAcademicVerified
                            ? 'bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span>🔵 Academic {tutor.isAcademicVerified ? '✓' : '+'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onToggleTutorBadge?.(tutor.id, 'platform')}
                        title="Toggle Platform Vetted Top Badge"
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer border ${
                          tutor.isPlatformVerified
                            ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span>⭐ Platform {tutor.isPlatformVerified ? '✓' : '+'}</span>
                      </button>

                      <button
                        onClick={() => onToggleVerifyTutor(tutor.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                          tutor.verified
                            ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                            : 'bg-[#0f294a] text-white hover:bg-blue-900'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{tutor.verified ? 'Revoke All' : 'Grant All'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TUITION JOBS MANAGER */}
          {activeTab === 'jobs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-800">
                    Tuition Jobs Board Management ({jobs.length})
                  </h4>
                  <p className="text-xs text-slate-500">
                    Control active postings, change tuition status, or add new customized posts.
                  </p>
                </div>

                <button
                  onClick={() => setShowNewJobModal(true)}
                  className="bg-[#0f294a] hover:bg-[#1e3a8a] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Tuition Post</span>
                </button>
              </div>

              {/* Jobs Table */}
              <div className="space-y-3">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black bg-blue-900 text-white px-2 py-0.5 rounded">
                          {job.id}
                        </span>
                        <strong className="text-slate-900 text-sm">{job.title}</strong>
                        <span className="text-xs text-slate-500">({job.location})</span>
                      </div>
                      <div className="text-xs text-slate-600 flex flex-wrap gap-2">
                        <span>Salary: <strong>৳{job.salary.toLocaleString()}</strong></span>
                        <span>•</span>
                        <span>{job.daysPerWeek} days/week</span>
                        <span>•</span>
                        <span>{job.mode}</span>
                        <span>•</span>
                        <span>{job.applicationsCount} applicants</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={job.status}
                        onChange={(e) => onUpdateJobStatus(job.id, e.target.value as any)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:ring-2 ${
                          job.status === 'Available'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : job.status === 'Under Review'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="Available">Available</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Filled">Filled / Closed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TUTOR APPLICATIONS & ADMIN APPROVAL WORKFLOW */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              
              {/* Top Banner: Administrative Authority & Workflow Summary */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#0f294a] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                        Sole Approval Authority
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-slate-900">
                        Tutor Application & Admin Screening Management
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                      All tutor applications must be reviewed and approved by the platform administrator before the tutor is considered for a tuition assignment. No application is automatically forwarded to the parent/student. You have complete administrative control to approve, reject, or request additional info.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-xl">
                      🟡 {applications.filter(a => a.status === 'Pending').length} Pending Review
                    </span>
                    <span className="text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-300 px-3 py-1.5 rounded-xl">
                      🟢 {applications.filter(a => a.status === 'Approved').length} Approved
                    </span>
                  </div>
                </div>

                {/* 3-Channel Notification System Reminder Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-lg">🖥️</span>
                    <div>
                      <div className="font-bold text-slate-900">1. Admin Control Panel</div>
                      <div className="text-[11px] text-slate-500">Live centralized review dashboard</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <span className="text-lg">📱</span>
                    <div>
                      <div className="font-bold text-emerald-950">2. WhatsApp Admin Alert</div>
                      <div className="text-[11px] text-emerald-800 font-mono">+880 1614-599107</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-blue-50/70 border border-blue-200">
                    <span className="text-lg">📧</span>
                    <div>
                      <div className="font-bold text-blue-950">3. Admin Email Dispatch</div>
                      <div className="text-[11px] text-blue-800">dutuitionmedia@gmail.com</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={appSearchQuery}
                      onChange={(e) => setAppSearchQuery(e.target.value)}
                      placeholder="Search by Tuition ID (e.g. TU-1025), tutor name, subject, university, or location..."
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  {appSearchQuery && (
                    <button
                      onClick={() => setAppSearchQuery('')}
                      className="text-xs text-slate-500 hover:text-slate-800 font-bold px-2 py-1 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
                  <span className="text-slate-400 text-[11px] mr-1 flex items-center gap-1 shrink-0">
                    <Filter className="w-3.5 h-3.5" /> Filter:
                  </span>
                  {[
                    { key: 'All', label: 'All Applications', count: applications.length },
                    { key: 'Pending', label: '🟡 Pending', count: applications.filter(a => a.status === 'Pending').length },
                    { key: 'Under Review', label: '🔵 Under Review', count: applications.filter(a => a.status === 'Under Review').length },
                    { key: 'More Information Required', label: '🟠 More Info Req.', count: applications.filter(a => a.status === 'More Information Required').length },
                    { key: 'Approved', label: '🟢 Approved', count: applications.filter(a => a.status === 'Approved').length },
                    { key: 'Rejected', label: '🔴 Rejected', count: applications.filter(a => a.status === 'Rejected').length },
                    { key: 'Tuition Filled', label: '⚪ Filled', count: applications.filter(a => a.status === 'Tuition Filled').length },
                    { key: 'Cancelled', label: '⚫ Cancelled', count: applications.filter(a => a.status === 'Cancelled').length }
                  ].map((filter) => {
                    const isActive = appFilterStatus === filter.key;
                    return (
                      <button
                        key={filter.key}
                        onClick={() => setAppFilterStatus(filter.key as any)}
                        className={`px-3 py-1.5 rounded-xl shrink-0 transition text-xs cursor-pointer ${
                          isActive
                            ? 'bg-[#0f294a] text-white shadow-2xs font-bold'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <span>{filter.label}</span>
                        <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800 font-bold'
                        }`}>
                          {filter.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Applications List */}
              <div className="space-y-4">
                {applications
                  .filter((app) => {
                    // Status filter
                    if (appFilterStatus !== 'All' && app.status !== appFilterStatus) {
                      return false;
                    }
                    // Search filter
                    if (appSearchQuery.trim()) {
                      const q = appSearchQuery.toLowerCase();
                      const matchId = app.jobId.toLowerCase().includes(q);
                      const matchName = app.tutorName.toLowerCase().includes(q);
                      const matchUni = app.tutorUniversity.toLowerCase().includes(q);
                      const matchDept = app.tutorDepartment.toLowerCase().includes(q);
                      const matchSubj = (app.subject || '').toLowerCase().includes(q);
                      const matchLoc = (app.location || '').toLowerCase().includes(q);
                      const matchPhone = (app.tutorPhone || '').includes(q);
                      return matchId || matchName || matchUni || matchDept || matchSubj || matchLoc || matchPhone;
                    }
                    return true;
                  })
                  .map((app) => {
                    const statusInfo = getStatusBadge(app.status);
                    return (
                      <div 
                        key={app.id} 
                        className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs hover:shadow-xs transition space-y-4"
                      >
                        {/* Application Header Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-black bg-blue-950 text-white px-2.5 py-1 rounded-lg">
                              {app.jobId}
                            </span>
                            <h5 className="font-black text-slate-900 text-base">
                              {app.tutorName}
                            </h5>
                            <span className="text-xs text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full font-semibold">
                              {app.tutorUniversity}
                            </span>
                            <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                              {app.tutorDepartment} {app.academicYear ? `• ${app.academicYear}` : ''}
                            </span>
                          </div>

                          {/* Status Pill & Selector */}
                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border ${statusInfo.bg}`}>
                              <span>{statusInfo.icon}</span>
                              <span>{statusInfo.label}</span>
                            </span>

                            {/* Status Change Dropdown */}
                            <select
                              value={app.status}
                              onChange={(e) => {
                                const newStatus = e.target.value as ApplicationStatus;
                                if (newStatus === 'More Information Required') {
                                  setMoreInfoModalApp(app);
                                } else {
                                  onUpdateApplicationStatus(
                                    app.id, 
                                    newStatus, 
                                    `Status updated to ${newStatus} via Admin Control Panel`
                                  );
                                }
                              }}
                              className="text-xs font-bold bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl px-2.5 py-1.5 text-slate-800 cursor-pointer focus:ring-2 focus:ring-blue-600"
                            >
                              <option value="Pending">🟡 Pending</option>
                              <option value="Under Review">🔵 Under Review</option>
                              <option value="More Information Required">🟠 More Info Required</option>
                              <option value="Approved">🟢 Approved</option>
                              <option value="Rejected">🔴 Rejected</option>
                              <option value="Tuition Filled">⚪ Tuition Filled</option>
                              <option value="Cancelled">⚫ Cancelled</option>
                            </select>
                          </div>
                        </div>

                        {/* Application Core Details Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Tuition Subject</span>
                            <span className="font-bold text-slate-900 mt-0.5 block">{app.subject || 'All Academic Subjects'}</span>
                            <span className="text-slate-500 text-[11px]">{app.location || 'Dhaka'}</span>
                          </div>

                          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Expected Salary</span>
                            <span className="font-black text-blue-950 mt-0.5 block">{app.expectedSalary}</span>
                            <span className="text-slate-500 text-[11px]">Requested by tutor</span>
                          </div>

                          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Teaching Experience</span>
                            <span className="font-semibold text-slate-900 mt-0.5 block line-clamp-1">{app.experienceSummary}</span>
                            <span className="text-slate-500 text-[11px]">Track record</span>
                          </div>

                          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Direct Contact</span>
                            <a href={`tel:${app.tutorPhone}`} className="font-bold text-blue-800 hover:underline block mt-0.5">
                              📞 {app.tutorPhone}
                            </a>
                            <span className="text-slate-500 text-[11px] truncate block">{app.tutorEmail}</span>
                          </div>
                        </div>

                        {/* Verification Badges Row */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                          <span className="text-slate-500 font-bold text-[11px]">Verification Status:</span>
                          {app.isIdentityVerified ? (
                            <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              🟢 NID Verified
                            </span>
                          ) : (
                            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              🟡 NID Verification Pending
                            </span>
                          )}

                          {app.isAcademicVerified ? (
                            <span className="bg-blue-100 text-blue-900 border border-blue-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              🔵 Academic Verified (DU)
                            </span>
                          ) : (
                            <span className="bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium px-2 py-0.5 rounded-full">
                              Academic Audit Needed
                            </span>
                          )}

                          {app.isPlatformVerified && (
                            <span className="bg-purple-100 text-purple-900 border border-purple-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              ⭐ Platform Vetted
                            </span>
                          )}

                          <span className="text-slate-400 text-[11px] ml-auto">
                            Applied: {new Date(app.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        {/* Tutor's Note to Student/Parent */}
                        {app.message && (
                          <div className="p-3.5 bg-blue-50/50 rounded-2xl text-xs text-slate-800 border border-blue-100 space-y-1">
                            <span className="font-bold text-blue-900 block text-[11px]">
                              💬 Tutor's Message to Parent / Student:
                            </span>
                            <p className="italic leading-relaxed text-slate-700">
                              "{app.message}"
                            </p>
                          </div>
                        )}

                        {/* Admin Notes & More Info Feedback Banners */}
                        {app.adminNotes && (
                          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200 flex items-start gap-2">
                            <span className="text-slate-500 font-bold shrink-0">📝 Admin Notes:</span>
                            <span className="text-slate-800">{app.adminNotes}</span>
                          </div>
                        )}

                        {app.moreInfoRequestedPrompt && (
                          <div className="p-3 bg-orange-50 rounded-xl text-xs text-orange-950 border border-orange-200 flex items-start gap-2">
                            <span className="text-orange-700 font-bold shrink-0">⚠️ Requested Documents / Info:</span>
                            <span className="text-orange-900">{app.moreInfoRequestedPrompt}</span>
                          </div>
                        )}

                        {/* Action Buttons Bar matching user requirements */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                          {/* Core Decision Controls */}
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => setSelectedAppForReview(app)}
                              className="bg-[#0f294a] hover:bg-[#1e3a8a] text-white px-3.5 py-2 rounded-xl text-xs font-black shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Review Application</span>
                            </button>

                            <button
                              onClick={() => onUpdateApplicationStatus(
                                app.id, 
                                'Approved', 
                                'Tutor approved and cleared for tuition assignment'
                              )}
                              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                                app.status === 'Approved'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-black'
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                              }`}
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>{app.status === 'Approved' ? 'Approved ✓' : 'Approve'}</span>
                            </button>

                            <button
                              onClick={() => onUpdateApplicationStatus(
                                app.id, 
                                'Rejected', 
                                'Application declined after administrative review'
                              )}
                              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                                app.status === 'Rejected'
                                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                              }`}
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>{app.status === 'Rejected' ? 'Rejected' : 'Reject'}</span>
                            </button>

                            <button
                              onClick={() => setMoreInfoModalApp(app)}
                              className="bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-200 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Request Info</span>
                            </button>
                          </div>

                          {/* Direct Communication & Alert Tools */}
                          <div className="flex items-center gap-1.5">
                            <a
                              href={getTutorWhatsAppLink(app)}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                              title="Chat with tutor on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">WhatsApp Tutor</span>
                            </a>

                            <a
                              href={`tel:${app.tutorPhone}`}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                              title="Call tutor directly"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Call</span>
                            </a>

                            <button
                              onClick={() => copyNotificationText(app)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl transition cursor-pointer"
                              title="Copy WhatsApp alert format for this application"
                            >
                              {copiedAppId === app.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            <a
                              href={getAdminWhatsAppLink(app)}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl transition cursor-pointer"
                              title="Test send WhatsApp alert to Admin (+880 1614-599107)"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </a>

                            <a
                              href={getAdminEmailLink(app)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl transition cursor-pointer"
                              title="Draft email alert to dutuitionmedia@gmail.com"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {applications.filter((app) => {
                  if (appFilterStatus !== 'All' && app.status !== appFilterStatus) return false;
                  if (appSearchQuery.trim()) {
                    const q = appSearchQuery.toLowerCase();
                    return (
                      app.jobId.toLowerCase().includes(q) ||
                      app.tutorName.toLowerCase().includes(q) ||
                      app.tutorUniversity.toLowerCase().includes(q) ||
                      (app.subject || '').toLowerCase().includes(q)
                    );
                  }
                  return true;
                }).length === 0 && (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                    <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                      <Send className="w-6 h-6" />
                    </div>
                    <h5 className="font-bold text-slate-800 text-sm">No Applications Found</h5>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      No tutor applications match the selected filter <strong>"{appFilterStatus}"</strong> or search query.
                    </p>
                    <button
                      onClick={() => {
                        setAppFilterStatus('All');
                        setAppSearchQuery('');
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: REVENUE MODELS (Section 13) */}
          {activeTab === 'revenue' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-slate-800">
                  Platform Revenue Models (Business Brief Section 13)
                </h4>
                <p className="text-xs text-slate-600">
                  Recommended monetization models for Dhaka University Tuition & Tutors Media.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase">Model A (Standard)</span>
                  <h5 className="font-bold text-slate-900 text-sm">Tuition Commission</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Platform takes 30% - 50% commission only on the <strong>first month's salary</strong> once tuition is successfully placed. Parents pay 0% fee.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-blue-700 uppercase">Model B</span>
                  <h5 className="font-bold text-slate-900 text-sm">Tutor ID Verification Fee</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tutors pay a nominal one-time processing charge (e.g. ৳200) for student card background check and physical document validation.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-amber-700 uppercase">Model C</span>
                  <h5 className="font-bold text-slate-900 text-sm">Featured Profile Promotion</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Qualified tutors can promote their profile to the top of search rankings and the homepage for a fixed weekly fee.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-8 bg-slate-50 border-t border-slate-200 shrink-0 flex items-center justify-between text-xs text-slate-500">
          <span>Dhaka University Tuition & Tutors Media • System v1.0</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition cursor-pointer"
          >
            Exit Dashboard
          </button>
        </div>
      </div>

      {/* Nested New Job Modal */}
      {showNewJobModal && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-base">Create New Tuition Job</h4>
              <button onClick={() => setShowNewJobModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Tuition ID</label>
                <input
                  type="text"
                  value={newJobId}
                  onChange={(e) => setNewJobId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-slate-50 font-mono font-bold"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Class</label>
                <input
                  type="text"
                  value={newJobClass}
                  onChange={(e) => setNewJobClass(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Subject(s)</label>
                <input
                  type="text"
                  value={newJobSubjects}
                  onChange={(e) => setNewJobSubjects(e.target.value)}
                  placeholder="e.g. Higher Math, Physics"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Location in Dhaka</label>
                  <input
                    type="text"
                    value={newJobLocation}
                    onChange={(e) => setNewJobLocation(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Monthly Salary (৳)</label>
                  <input
                    type="number"
                    value={newJobSalary}
                    onChange={(e) => setNewJobSalary(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Preferred Tutor Requirement</label>
                <input
                  type="text"
                  value={newJobCriteria}
                  onChange={(e) => setNewJobCriteria(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewJobModal(false)}
                  className="px-3 py-1.5 rounded-lg border cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#0f294a] text-white font-bold cursor-pointer"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 1: FULL APPLICATION REVIEW & AUDIT DIALOG */}
      {selectedAppForReview && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative my-6 max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-black bg-blue-950 text-white px-3 py-1 rounded-xl">
                  {selectedAppForReview.jobId}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    Review Tutor Application
                  </h3>
                  <p className="text-xs text-slate-500">
                    Full verification audit & administrative approval decision
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedAppForReview(null)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto py-5 space-y-5">
              {/* Tutor Profile Header Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-black text-slate-900">
                      {selectedAppForReview.tutorName}
                    </h4>
                    <p className="text-xs text-blue-900 font-semibold mt-0.5">
                      {selectedAppForReview.tutorUniversity} • {selectedAppForReview.tutorDepartment}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Academic Year: {selectedAppForReview.academicYear || 'University Student'}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {(() => {
                      const badge = getStatusBadge(selectedAppForReview.status);
                      return (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border ${badge.bg}`}>
                          <span>{badge.icon}</span>
                          <span>{badge.label}</span>
                        </span>
                      );
                    })()}
                  </div>
                </div>

                {/* Verification Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/70 text-xs">
                  {selectedAppForReview.isIdentityVerified ? (
                    <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px]">
                      🟢 NID Verified
                    </span>
                  ) : (
                    <span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px]">
                      🟡 NID Pending
                    </span>
                  )}

                  {selectedAppForReview.isAcademicVerified ? (
                    <span className="bg-blue-100 text-blue-900 border border-blue-300 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px]">
                      🔵 Academic Verified (DU)
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full text-[11px]">
                      Academic Check Needed
                    </span>
                  )}

                  {selectedAppForReview.isPlatformVerified && (
                    <span className="bg-purple-100 text-purple-900 border border-purple-300 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px]">
                      ⭐ Platform Vetted
                    </span>
                  )}
                </div>
              </div>

              {/* Job Matching Information */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Tuition Subject</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedAppForReview.subject || 'All Academics'}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Target Location</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedAppForReview.location || 'Dhaka'}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Expected Salary</span>
                  <span className="font-black text-blue-950 mt-0.5 block">{selectedAppForReview.expectedSalary}</span>
                </div>
              </div>

              {/* Teaching Experience */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                <span className="font-bold text-slate-700 block text-[11px]">
                  🎓 Teaching Experience & Academic Background:
                </span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {selectedAppForReview.experienceSummary}
                </p>
              </div>

              {/* Tutor's Message to Parent / Student */}
              {selectedAppForReview.message && (
                <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 text-xs space-y-1">
                  <span className="font-bold text-blue-900 block text-[11px]">
                    💬 Tutor's Message to Parent / Student:
                  </span>
                  <p className="italic text-slate-800 leading-relaxed">
                    "{selectedAppForReview.message}"
                  </p>
                </div>
              )}

              {/* Direct Contact Tools */}
              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950">Direct Tutor Contact Channels:</span>
                  <span className="text-[11px] text-emerald-800 font-mono">{selectedAppForReview.tutorPhone}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={getTutorWhatsAppLink(selectedAppForReview)}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Open WhatsApp Chat</span>
                  </a>
                  <a
                    href={`tel:${selectedAppForReview.tutorPhone}`}
                    className="bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Direct Call</span>
                  </a>
                  <a
                    href={`mailto:${selectedAppForReview.tutorEmail}`}
                    className="bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>

              {/* Admin Internal Notes Box */}
              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-slate-800 block">
                  Internal Administrator Notes & Audit Record:
                </label>
                <textarea
                  rows={2}
                  defaultValue={selectedAppForReview.adminNotes || ''}
                  onChange={(e) => setReviewAdminNotes(e.target.value)}
                  placeholder="Enter internal notes, screening feedback, or specific terms regarding this tutor..."
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Status Update Options */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="font-bold text-slate-900 text-xs block">
                  Take Administrative Decision:
                </label>

                {/* 3 Core Decision Buttons (User Specification) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={() => {
                      onUpdateApplicationStatus(
                        selectedAppForReview.id, 
                        'Approved', 
                        reviewAdminNotes || 'Application approved by platform administrator'
                      );
                      setSelectedAppForReview(null);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 px-4 rounded-xl text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve Application</span>
                  </button>

                  <button
                    onClick={() => {
                      onUpdateApplicationStatus(
                        selectedAppForReview.id, 
                        'Rejected', 
                        reviewAdminNotes || 'Application declined by platform administrator'
                      );
                      setSelectedAppForReview(null);
                    }}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold py-2.5 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject Application</span>
                  </button>

                  <button
                    onClick={() => {
                      const targetApp = selectedAppForReview;
                      setSelectedAppForReview(null);
                      setMoreInfoModalApp(targetApp);
                    }}
                    className="bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-300 font-bold py-2.5 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Request More Info</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs shrink-0">
              <span className="text-slate-400">
                Administrative Quality Protection
              </span>
              <button
                onClick={() => setSelectedAppForReview(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition cursor-pointer"
              >
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: REQUEST MORE INFORMATION DIALOG */}
      {moreInfoModalApp && (
        <div className="fixed inset-0 z-70 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <span>🟠 Request More Information</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Tuition ID: <strong className="font-mono text-slate-800">{moreInfoModalApp.jobId}</strong> • Tutor: <strong>{moreInfoModalApp.tutorName}</strong>
                </p>
              </div>
              <button
                onClick={() => setMoreInfoModalApp(null)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600 leading-relaxed">
                Specify what additional credentials or clarification you require from this tutor before considering them for approval:
              </p>

              {/* Quick Preset Prompts */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Quick Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Please submit DU student ID and hall residency clearance.',
                    'Please upload NID card front and back clear photos.',
                    'Please clarify your available weekly days and time slots.',
                    'Please confirm your CGPA and prior English teaching track record.'
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setMoreInfoPromptText(preset)}
                      className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded-lg transition text-left cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">
                  Information / Document Request Prompt:
                </label>
                <textarea
                  rows={3}
                  value={moreInfoPromptText}
                  onChange={(e) => setMoreInfoPromptText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setMoreInfoModalApp(null)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onUpdateApplicationStatus(
                    moreInfoModalApp.id,
                    'More Information Required',
                    'Administrator requested supplementary documents',
                    moreInfoPromptText
                  );
                  setMoreInfoModalApp(null);
                }}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
              >
                Save & Set Status to More Info Required
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
