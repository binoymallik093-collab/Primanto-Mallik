import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Clock, 
  Banknote, 
  CheckCircle, 
  Filter, 
  Search, 
  User, 
  ArrowRight,
  Send,
  X,
  AlertCircle,
  Building,
  GraduationCap,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { TuitionJob, TutorApplication } from '../types';
import { DHAKA_AREAS, CLASSES_LIST } from '../data/initialData';

interface TuitionJobsBoardProps {
  jobs: TuitionJob[];
  onApplyForJob: (application: Omit<TutorApplication, 'id' | 'appliedAt' | 'status'>) => void;
  openFindTutor: () => void;
}

export const TuitionJobsBoard: React.FC<TuitionJobsBoardProps> = ({
  jobs,
  onApplyForJob,
  openFindTutor
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedArea, setSelectedArea] = useState('All Dhaka Areas');
  const [applyingJob, setApplyingJob] = useState<TuitionJob | null>(null);

  // Application form state
  const [tutorName, setTutorName] = useState('');
  const [tutorUniversity, setTutorUniversity] = useState('University of Dhaka');
  const [tutorDepartment, setTutorDepartment] = useState('');
  const [academicYear, setAcademicYear] = useState('3rd Year (Honours)');
  const [tutorPhone, setTutorPhone] = useState('');
  const [tutorEmail, setTutorEmail] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [experienceSummary, setExperienceSummary] = useState('');
  const [message, setMessage] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [lastSubmittedApp, setLastSubmittedApp] = useState<{
    jobId: string;
    tutorName: string;
    tutorUniversity: string;
    subject: string;
    location: string;
  } | null>(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesQuery = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = selectedClass === 'All Classes' || job.studentClass === selectedClass;
    const matchesArea = selectedArea === 'All Dhaka Areas' || job.location.toLowerCase().includes(selectedArea.toLowerCase());

    return matchesQuery && matchesClass && matchesArea;
  });

  const handleOpenApplyModal = (job: TuitionJob) => {
    setApplyingJob(job);
    setExpectedSalary(`৳${job.salary.toLocaleString()}/month`);
    setSubmittedSuccess(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob) return;

    const primarySubject = applyingJob.subjects[0] || 'English & Academics';
    const primaryLocation = applyingJob.location || 'Dhaka';

    onApplyForJob({
      jobId: applyingJob.id,
      jobTitle: `${applyingJob.title} (${applyingJob.location})`,
      subject: primarySubject,
      location: primaryLocation,
      tutorName,
      tutorUniversity,
      tutorDepartment,
      academicYear,
      tutorPhone,
      tutorEmail,
      expectedSalary,
      experienceSummary,
      message
    });

    setLastSubmittedApp({
      jobId: applyingJob.id,
      tutorName,
      tutorUniversity,
      subject: primarySubject,
      location: primaryLocation
    });

    setSubmittedSuccess(true);
  };

  const handleCloseApplyModal = () => {
    setSubmittedSuccess(false);
    setApplyingJob(null);
    setLastSubmittedApp(null);
    setTutorName('');
    setTutorDepartment('');
    setTutorPhone('');
    setTutorEmail('');
    setExperienceSummary('');
    setMessage('');
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              Live Tuition Request Board
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f294a] tracking-tight">
              Latest Tuition Opportunities in Dhaka
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Apply directly with your university credentials. Our administration reviews all submissions promptly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openFindTutor}
              className="bg-[#0f294a] hover:bg-[#1e3a8a] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <span>Parents: Post a Tuition</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Tuition ID (e.g. T-1025), subject, area..."
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Class filter */}
            <div>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                {CLASSES_LIST.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Area filter */}
            <div>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                {DHAKA_AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 font-medium px-1">
            <span>Showing <strong className="text-slate-800">{filteredJobs.length}</strong> available tuition jobs</span>
            {(searchQuery || selectedClass !== 'All Classes' || selectedArea !== 'All Dhaka Areas') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedClass('All Classes');
                  setSelectedArea('All Dhaka Areas');
                }}
                className="text-blue-700 hover:underline font-semibold cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Jobs Listing */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 p-8">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-700">No matching tuition jobs found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try selecting different search terms or clear your location filter to view all Dhaka postings.
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all hover:border-blue-300 flex flex-col md:flex-row md:items-center justify-between gap-5 group"
              >
                {/* Left Info */}
                <div className="space-y-2.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Tuition ID Badge */}
                    <span className="font-mono text-xs font-black bg-blue-900 text-white px-2.5 py-1 rounded-md tracking-wider">
                      Tuition ID: {job.id}
                    </span>
                    <span className="bg-blue-50 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                      {job.studentClass}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      {job.curriculum}
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      {job.mode}
                    </span>
                    {job.guardianNidVerified && (
                      <span className="bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1 shadow-2xs" title="Parent/Guardian identity checked with National ID">
                        <span>🟢</span> Guardian NID Verified
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400 font-medium ml-auto sm:ml-0">
                      Posted {job.postedAt}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0f294a] group-hover:text-blue-800 transition-colors">
                    {job.title}
                  </h3>

                  {/* Subjects Chips */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-500">Subjects:</span>
                    {job.subjects.map((s, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-800 text-xs font-medium px-2 py-0.5 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="font-semibold text-slate-800">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{job.daysPerWeek} days/week</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{job.preferredTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Tutor: {job.preferredGender}</span>
                    </div>
                  </div>

                  {/* Preferred Tutor Criteria */}
                  <div className="bg-slate-50 rounded-lg p-2.5 text-xs text-slate-700 border border-slate-100">
                    <strong className="text-slate-900 font-semibold">Preferred Tutor: </strong> 
                    {job.preferredTutorCriteria}
                  </div>
                </div>

                {/* Right Action & Salary */}
                <div className="md:w-56 shrink-0 flex flex-col md:items-end justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block md:text-right">
                      Monthly Salary
                    </span>
                    <div className="text-2xl font-black text-emerald-700 md:text-right flex items-baseline gap-1 md:justify-end">
                      <span>৳{job.salary.toLocaleString()}</span>
                      <span className="text-xs font-normal text-slate-500">/mo</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 w-full">
                    <button
                      onClick={() => handleOpenApplyModal(job)}
                      className="w-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Apply for Tuition</span>
                    </button>
                    <span className="text-[11px] text-slate-500 text-center">
                      {job.applicationsCount} tutors applied
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Application Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150 my-6">
            <button
              onClick={handleCloseApplyModal}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedSuccess && lastSubmittedApp ? (
              <div className="py-4 space-y-5">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Application Submitted to Admin!</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Your application for <strong className="font-bold text-slate-800">Tuition #{lastSubmittedApp.jobId}</strong> has been received into the administrative review queue.
                  </p>
                </div>

                {/* 3-Channel Notification Status */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                    <span>📡 Three-Channel Notification Dispatched</span>
                  </div>

                  {/* Channel 1: Admin Panel */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 text-sm">
                      🖥️
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="font-bold text-slate-900">Admin Control Panel Logged</div>
                      <div className="text-slate-500 mt-0.5">
                        Status set to <span className="bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded text-[11px]">🟡 Pending</span>. Awaiting administrative vetting.
                      </div>
                    </div>
                  </div>

                  {/* Channel 2: WhatsApp Notification */}
                  <div className="bg-white p-3 rounded-xl border border-emerald-200 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-sm">
                      📱
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="font-bold text-emerald-950 flex items-center justify-between">
                        <span>WhatsApp Alert Prepared for Admin (+880 1614-599107)</span>
                        <a
                          href={`https://wa.me/8801614599107?text=${encodeURIComponent(`🔔 *New Tuition Application*\nTuition ID: ${lastSubmittedApp.jobId}\nTutor: ${lastSubmittedApp.tutorName}\nUniversity: ${lastSubmittedApp.tutorUniversity}\nSubject: ${lastSubmittedApp.subject}\nLocation: ${lastSubmittedApp.location}\n\nPlease log in to the Admin Panel to review and approve the application.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open in WhatsApp</span>
                        </a>
                      </div>
                      <div className="font-mono text-[11px] bg-slate-900 text-emerald-400 p-2.5 rounded-lg mt-2 leading-relaxed">
                        🔔 *New Tuition Application*<br/>
                        Tuition ID: {lastSubmittedApp.jobId}<br/>
                        Tutor: {lastSubmittedApp.tutorName}<br/>
                        University: {lastSubmittedApp.tutorUniversity}<br/>
                        Subject: {lastSubmittedApp.subject}<br/>
                        Location: {lastSubmittedApp.location}<br/>
                        <span className="text-slate-400">Please log in to the Admin Panel to review and approve the application.</span>
                      </div>
                    </div>
                  </div>

                  {/* Channel 3: Email Notification */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center shrink-0 text-sm">
                      📧
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        <span>Backup Email Alert (dutuitionmedia@gmail.com)</span>
                        <a
                          href={`mailto:dutuitionmedia@gmail.com?subject=${encodeURIComponent(`🔔 New Tuition Application [${lastSubmittedApp.jobId}] - Tutor: ${lastSubmittedApp.tutorName}`)}&body=${encodeURIComponent(`Tuition ID: ${lastSubmittedApp.jobId}\nTutor: ${lastSubmittedApp.tutorName}\nUniversity: ${lastSubmittedApp.tutorUniversity}\nSubject: ${lastSubmittedApp.subject}\nLocation: ${lastSubmittedApp.location}\nStatus: Pending`)}`}
                          className="text-[11px] font-bold text-blue-700 hover:underline cursor-pointer"
                        >
                          <span>Send Email</span>
                        </a>
                      </div>
                      <div className="text-slate-500 mt-0.5">
                        Backup dispatch recorded for tuition registry archives.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Authority Note */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Admin Verification Policy:</strong> All applications remain strictly confidential with the administrator. No contact details are shared with the parent or student until you are approved by the platform administration.
                  </p>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={handleCloseApplyModal}
                    className="w-full bg-[#0f294a] hover:bg-[#1e3a8a] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition cursor-pointer"
                  >
                    Done & Return to Live Job Board
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Tuition ID: #{applyingJob.id}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      • {applyingJob.studentClass}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-[#0f294a] mt-1">
                    Apply for Tuition Job #{applyingJob.id}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {applyingJob.title} • {applyingJob.location} • <strong className="text-slate-900">৳{applyingJob.salary.toLocaleString()}/mo</strong>
                  </p>
                </div>

                {/* Important Admin Authority Warning */}
                <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 mb-4 flex items-start gap-2 text-xs text-blue-900 leading-relaxed">
                  <Lock className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Administrative Authority:</strong> All applications must be reviewed and approved by the platform administrator before client matching. No unreviewed tutor is forwarded directly to the student or parent.
                  </span>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={tutorName}
                      onChange={(e) => setTutorName(e.target.value)}
                      placeholder="e.g. Premanto Mallik"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        University / Institution *
                      </label>
                      <input
                        type="text"
                        required
                        value={tutorUniversity}
                        onChange={(e) => setTutorUniversity(e.target.value)}
                        placeholder="e.g. University of Dhaka"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Department *
                      </label>
                      <input
                        type="text"
                        required
                        value={tutorDepartment}
                        onChange={(e) => setTutorDepartment(e.target.value)}
                        placeholder="e.g. Department of English"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Academic Year *
                      </label>
                      <select
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-medium"
                      >
                        <option value="1st Year (Honours)">1st Year (Honours)</option>
                        <option value="2nd Year (Honours)">2nd Year (Honours)</option>
                        <option value="3rd Year (Honours)">3rd Year (Honours)</option>
                        <option value="4th Year (Honours)">4th Year (Honours)</option>
                        <option value="Masters (1st Year)">Masters (1st Year)</option>
                        <option value="Masters / Completed">Masters / Completed</option>
                        <option value="Graduate / Alumni">Graduate / Alumni</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Expected Monthly Salary *
                      </label>
                      <input
                        type="text"
                        required
                        value={expectedSalary}
                        onChange={(e) => setExpectedSalary(e.target.value)}
                        placeholder="e.g. ৳8,000/month"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={tutorPhone}
                        onChange={(e) => setTutorPhone(e.target.value)}
                        placeholder="01614599107"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={tutorEmail}
                        onChange={(e) => setTutorEmail(e.target.value)}
                        placeholder="premanto.mallik@du.ac.bd"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Teaching Experience & Track Record *
                    </label>
                    <input
                      type="text"
                      required
                      value={experienceSummary}
                      onChange={(e) => setExperienceSummary(e.target.value)}
                      placeholder="e.g. 4 years of English teaching for HSC students with 100% board GPA 5 rate"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Short Message to Student/Parent (Submitted for Admin Review)
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Mention your living location, hall proximity, and availability..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  {/* NID & Safety Commitment */}
                  <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="nidAgreement"
                      required
                      defaultChecked
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="nidAgreement" className="text-[11px] text-emerald-900 leading-tight">
                      <strong>Verification Agreement:</strong> I confirm my credentials and agree to provide my Dhaka University Student ID and National ID (NID) to the administrator prior to tuition assignment.
                    </label>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCloseApplyModal}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#0f294a] hover:bg-[#1e3a8a] text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold shadow-xs transition flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Application to Admin</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
