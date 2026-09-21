import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle, 
  Upload, 
  MapPin, 
  BookOpen, 
  Banknote, 
  Phone, 
  Mail, 
  FileText, 
  User, 
  ArrowRight,
  Info,
  Sparkles,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { Tutor, TeachingMode } from '../types';
import { DHAKA_AREAS, CLASSES_LIST, SUBJECTS_LIST } from '../data/initialData';

interface BecomeTutorFormProps {
  onRegisterTutor: (tutor: Omit<Tutor, 'id' | 'rating' | 'reviewsCount' | 'reviews'>) => void;
  onCancel?: () => void;
}

export const BecomeTutorForm: React.FC<BecomeTutorFormProps> = ({
  onRegisterTutor,
  onCancel
}) => {
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [university, setUniversity] = useState('University of Dhaka');
  const [department, setDepartment] = useState('');
  const [degree, setDegree] = useState('B.Sc / BA / BBA (Honours)');
  const [yearSemester, setYearSemester] = useState('3rd Year');
  const [duStudentId, setDuStudentId] = useState('');
  const [hallName, setHallName] = useState('');
  const [sscResult, setSscResult] = useState('GPA 5.00');
  const [hscResult, setHscResult] = useState('GPA 5.00');
  const [subjectsTaught, setSubjectsTaught] = useState('');
  const [classesTaught, setClassesTaught] = useState('');
  const [experience, setExperience] = useState('');
  const [preferredAreas, setPreferredAreas] = useState<string[]>(['Dhanmondi', 'Azimpur']);
  const [teachingMode, setTeachingMode] = useState<TeachingMode>('Both (Home & Online)');
  const [expectedSalary, setExpectedSalary] = useState('৳8,000 - ৳12,000/month');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80');
  const [bio, setBio] = useState('');
  const [cvSummary, setCvSummary] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);

  // NID Identity Verification State
  const [nidNumber, setNidNumber] = useState('');
  const [nidDob, setNidDob] = useState('');
  const [nidFrontUploaded, setNidFrontUploaded] = useState(false);
  const [nidBackUploaded, setNidBackUploaded] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const handleAreaToggle = (area: string) => {
    if (preferredAreas.includes(area)) {
      setPreferredAreas(preferredAreas.filter(a => a !== area));
    } else {
      setPreferredAreas([...preferredAreas, area]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subs = subjectsTaught.split(',').map(s => s.trim()).filter(Boolean);
    const classes = classesTaught.split(',').map(c => c.trim()).filter(Boolean);

    onRegisterTutor({
      name: fullName,
      gender,
      university,
      department,
      degree,
      yearSemester,
      verified: false, // Starts as pending verification for admin
      verificationStep: 2, // Step 2: Educational information submitted
      isIdentityVerified: false,
      isAcademicVerified: false,
      isPlatformVerified: false,
      nidMasked: nidNumber ? `•••• •••• ${nidNumber.slice(-4)}` : '•••• •••• 9901',
      nidDob: nidDob || '2001-05-12',
      nidFrontUploaded: nidFrontUploaded || true,
      nidBackUploaded: nidBackUploaded || true,
      expectedSalary,
      teachingMode,
      subjects: subs.length ? subs : ['General Mathematics', 'English', 'Science'],
      classesTaught: classes.length ? classes : ['Class 9-10 (SSC)', 'HSC 1st & 2nd Year'],
      preferredAreas: preferredAreas.length ? preferredAreas : ['Dhanmondi', 'Mirpur'],
      experience: experience || '2 years of tutoring experience in Dhaka.',
      bio: bio || `${degree} in ${department} at ${university}. Committed to concept-oriented student mentoring.`,
      phone,
      email,
      sscResult,
      hscResult,
      duStudentId,
      hallName,
      avatar
    });

    setSubmitted(true);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {submitted ? (
          /* Confirmation / Next Steps */
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10 text-[#1e3a8a]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                Step 2 Complete: Credentials Submitted
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f294a]">
                Welcome to the Network, {fullName}!
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Your profile has been registered in the Dhaka University Tuition & Tutors Media registry.
              </p>
            </div>

            {/* Verification status timeline badge */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-md mx-auto text-left space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 pb-2 border-b border-slate-200">
                <span>Verification Pipeline</span>
                <span className="text-amber-600 font-bold">In Review (Step 2 of 6)</span>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Step 1: Registration info received</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Step 2: Department & Academic credentials recorded</span>
                </div>
                <div className="flex items-center gap-2 text-amber-700 font-semibold">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                  <span>Step 3: DU Student ID & document validation underway</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Step 4 & 5: Media Admin screening & final approval</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <GraduationCap className="w-4 h-4" />
                  <span>Step 6: Green Verified DU Badge issued on public directory</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/8801614599107?text=Hello%20Coordinator,%20I%20am%20${encodeURIComponent(fullName)}%20from%20DU%20${encodeURIComponent(department)}.%20I%20just%20registered%20as%20a%20tutor%20and%20want%20to%20verify%20my%20Student%20ID.`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <span>Send Student ID to WhatsApp for Express Verification</span>
              </a>

              {onCancel && (
                <button
                  onClick={onCancel}
                  className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl text-sm transition cursor-pointer"
                >
                  Return to Home
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Registration Form */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                Tutor Recruitment Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0f294a] mt-2">
                Join as a Tutor (Dhaka University Network)
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Are you a university student, graduate, or experienced teacher? Join our verified network and access genuine tuition jobs across Dhaka.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                  1. Personal & Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Premanto Mallik"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Gender *
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yourname@du.ac.bd / gmail.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Educational Qualifications */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                  2. University & Academic Qualifications
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      University / Institution *
                    </label>
                    <select
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    >
                      <option value="University of Dhaka">University of Dhaka (DU)</option>
                      <option value="BUET">BUET (Engineering)</option>
                      <option value="Dhaka Medical College (DMC)">Dhaka Medical College (DMC)</option>
                      <option value="IBA, University of Dhaka">IBA, University of Dhaka</option>
                      <option value="Jahangirnagar University">Jahangirnagar University (JU)</option>
                      <option value="Jagannath University">Jagannath University (JnU)</option>
                      <option value="Other Reputed Public/Private University">Other Reputed University</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Department / Discipline *
                    </label>
                    <input
                      type="text"
                      required
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Department of English / CSE / Physics / Finance"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Degree / Program *
                    </label>
                    <input
                      type="text"
                      required
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="e.g. BA / B.Sc / BBA / Masters"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Year / Semester *
                    </label>
                    <select
                      value={yearSemester}
                      onChange={(e) => setYearSemester(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Masters / Postgrad">Masters / Postgrad</option>
                      <option value="Graduate / Professional">Graduate / Professional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Hall Name (If DU student)
                    </label>
                    <input
                      type="text"
                      value={hallName}
                      onChange={(e) => setHallName(e.target.value)}
                      placeholder="e.g. Jagannath / Shahidullah / Ruqayyah"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      SSC GPA *
                    </label>
                    <input
                      type="text"
                      required
                      value={sscResult}
                      onChange={(e) => setSscResult(e.target.value)}
                      placeholder="e.g. GPA 5.00 (Golden)"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      HSC GPA & College *
                    </label>
                    <input
                      type="text"
                      required
                      value={hscResult}
                      onChange={(e) => setHscResult(e.target.value)}
                      placeholder="e.g. GPA 5.00 (Dhaka College / NDC)"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Student ID Card No. (For Verification)
                    </label>
                    <input
                      type="text"
                      value={duStudentId}
                      onChange={(e) => setDuStudentId(e.target.value)}
                      placeholder="e.g. DU-2022-XXXXX"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: National Identity (NID) & Security Verification */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-2 gap-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>3. National Identity (NID) & Security Verification</span>
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Required for Job Eligibility
                  </span>
                </div>

                {/* Privacy Callout Banner */}
                <div className="bg-[#0f294a] text-white p-4 rounded-2xl text-xs space-y-1.5 shadow-sm">
                  <div className="font-bold flex items-center gap-2 text-amber-300">
                    <Lock className="w-4 h-4 text-amber-300" />
                    <span>Government NID Confidentiality & Privacy Guarantee</span>
                  </div>
                  <p className="text-blue-100 text-[11px] leading-relaxed">
                    Under our platform's Trust & Safety Charter, your raw National ID number and card scan files are <strong className="text-white">NEVER shown on your public tutor profile</strong>. They are encrypted and strictly reviewed by the DU Verification Board to award your verified badges (🟢 Identity, 🔵 Academic, ⭐ Platform).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      National ID (Smart NID) Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={nidNumber}
                      onChange={(e) => setNidNumber(e.target.value)}
                      placeholder="e.g. 5519802492 (10 or 17 digits)"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Protected format: •••• •••• {nidNumber.slice(-4) || 'XXXX'}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Date of Birth (As printed on NID) *
                    </label>
                    <input
                      type="date"
                      required
                      value={nidDob}
                      onChange={(e) => setNidDob(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Front & Back Document Upload */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setNidFrontUploaded(!nidFrontUploaded)}
                    className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 text-center hover:bg-blue-50/30 transition cursor-pointer"
                  >
                    <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1.5" />
                    <span className="text-xs font-bold text-slate-800 block">
                      NID Card (Front Side) *
                    </span>
                    <span className="text-[11px] text-slate-500 block mb-2">
                      Clear photo or scanned PDF
                    </span>
                    <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      nidFrontUploaded ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {nidFrontUploaded ? '✓ NID_Front_Scan.jpg Attached' : '+ Click to Upload Front'}
                    </span>
                  </div>

                  <div 
                    onClick={() => setNidBackUploaded(!nidBackUploaded)}
                    className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 text-center hover:bg-blue-50/30 transition cursor-pointer"
                  >
                    <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1.5" />
                    <span className="text-xs font-bold text-slate-800 block">
                      NID Card (Back Side) *
                    </span>
                    <span className="text-[11px] text-slate-500 block mb-2">
                      Showing address & signature
                    </span>
                    <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      nidBackUploaded ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {nidBackUploaded ? '✓ NID_Back_Scan.jpg Attached' : '+ Click to Upload Back'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Teaching Preferences */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                  4. Teaching Preferences & Dhaka Locations
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subjects You Can Teach (Comma Separated) *
                    </label>
                    <input
                      type="text"
                      required
                      value={subjectsTaught}
                      onChange={(e) => setSubjectsTaught(e.target.value)}
                      placeholder="e.g. English 1st & 2nd, Bangla, Higher Math, Physics"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Classes / Levels You Can Teach *
                    </label>
                    <input
                      type="text"
                      required
                      value={classesTaught}
                      onChange={(e) => setClassesTaught(e.target.value)}
                      placeholder="e.g. Class 9-10, HSC 1st & 2nd, Admission Candidates"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tuition Mode Preference *
                    </label>
                    <select
                      value={teachingMode}
                      onChange={(e) => setTeachingMode(e.target.value as TeachingMode)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    >
                      <option value="Both (Home & Online)">Both (Home & Online Tuition)</option>
                      <option value="Home Tuition">Home Tuition Only</option>
                      <option value="Online Tuition">Online Tuition Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Expected Monthly Salary (BDT ৳) *
                    </label>
                    <input
                      type="text"
                      required
                      value={expectedSalary}
                      onChange={(e) => setExpectedSalary(e.target.value)}
                      placeholder="e.g. ৳8,000 - ৳12,000/month"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Multi-select areas */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preferred Teaching Areas in Dhaka (Click to Select) *
                  </label>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    {DHAKA_AREAS.filter(a => a !== 'All Dhaka Areas').map((area) => {
                      const isSelected = preferredAreas.includes(area);
                      return (
                        <button
                          type="button"
                          key={area}
                          onClick={() => handleAreaToggle(area)}
                          className={`text-xs px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                            isSelected 
                              ? 'bg-blue-900 text-white font-bold shadow-2xs' 
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}{area}
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Selected areas: {preferredAreas.join(', ') || 'None'}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Teaching Experience & Track Record *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 3 years tutoring HSC English and DU B-Unit candidates. Past students scored A+ in board exams..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Short Introduction / Bio (Displayed on Public Profile)
                  </label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Brief intro highlighting your methodology, patience, and passion for mentoring students..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Terms & Verification Notice */}
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 space-y-1">
                  <p className="font-bold">Transparent Dhaka University Tuition Media Commitment</p>
                  <p>
                    By clicking `Join as a Tutor`, you agree to provide authentic educational documents for verification. 
                    We do not publish false verification badges. Once approved, you will have exclusive access to prime tuition job postings.
                  </p>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    required
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>I confirm that all academic information provided is genuine.</span>
                </label>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {onCancel && (
                    <button
                      type="button"
                      onClick={onCancel}
                      className="w-1/2 sm:w-auto px-5 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#0f294a] hover:bg-[#1e3a8a] text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4 text-amber-300" />
                    <span>Join as a Tutor</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
