import React, { useState } from 'react';
import { 
  PlusCircle, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Clock, 
  Banknote, 
  Phone, 
  User, 
  BookOpen, 
  GraduationCap, 
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Lock,
  Upload
} from 'lucide-react';
import { TuitionRequest, Medium, Gender } from '../types';
import { DHAKA_AREAS, CLASSES_LIST } from '../data/initialData';

interface FindTutorFormProps {
  onSubmitRequest: (request: Omit<TuitionRequest, 'id' | 'createdAt' | 'status'>) => string; // returns new Tuition ID
  onCancel?: () => void;
  preselectedTutorName?: string;
}

export const FindTutorForm: React.FC<FindTutorFormProps> = ({
  onSubmitRequest,
  onCancel,
  preselectedTutorName
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('HSC 1st Year');
  const [institution, setInstitution] = useState('');
  const [subjects, setSubjects] = useState('');
  const [curriculum, setCurriculum] = useState<Medium>('Bangla Medium');
  const [preferredGender, setPreferredGender] = useState<Gender>('Any');
  const [preferredLocation, setPreferredLocation] = useState('Dhanmondi');
  const [mode, setMode] = useState<'Home' | 'Online' | 'Home or Online'>('Home');
  const [daysPerWeek, setDaysPerWeek] = useState('3 days/week');
  const [preferredDays, setPreferredDays] = useState('Sun, Tue, Thu');
  const [preferredTime, setPreferredTime] = useState('5:30 PM - 7:00 PM');
  const [monthlyBudget, setMonthlyBudget] = useState('8000');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentWhatsApp, setParentWhatsApp] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState(
    preselectedTutorName ? `Interested in hiring ${preselectedTutorName} if available.` : ''
  );

  // Guardian NID Verification State
  const [guardianNid, setGuardianNid] = useState('');
  const [guardianDob, setGuardianDob] = useState('');
  const [guardianNidFrontUploaded, setGuardianNidFrontUploaded] = useState(false);
  const [guardianNidBackUploaded, setGuardianNidBackUploaded] = useState(false);

  const [generatedId, setGeneratedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = onSubmitRequest({
      studentName,
      studentClass,
      institution,
      subjects,
      curriculum,
      preferredGender,
      preferredLocation,
      mode,
      daysPerWeek,
      preferredDays,
      preferredTime,
      monthlyBudget,
      parentName,
      parentPhone,
      parentWhatsApp: parentWhatsApp || parentPhone,
      additionalRequirements
    });

    setGeneratedId(newId);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {generatedId ? (
          /* Confirmation Screen */
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                Tuition Request Registered
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f294a]">
                Thank You, {parentName || 'Parent'}!
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Your tuition request has been successfully created. We have generated your unique Tuition Tracking ID:
              </p>
              <div className="inline-block bg-blue-900 text-amber-300 font-mono text-2xl font-black px-6 py-2 rounded-xl tracking-wider shadow-md mt-2">
                {generatedId}
              </div>
            </div>

            {/* Steps next */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left max-w-lg mx-auto space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
                <span>Our Dhaka University coordination team is reviewing your requirements.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>You will receive 2 to 3 verified tutor CV profiles via WhatsApp / SMS within 24 hours.</span>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>You will be entitled to a 100% free trial class before final confirmation.</span>
              </div>
            </div>

            {/* Direct WhatsApp Concierge CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/8801614599107?text=Hello%20DU%20Tuition%20Media,%20I%20just%20submitted%20Tuition%20Request%20${generatedId}%20for%20${encodeURIComponent(studentClass)}%20${encodeURIComponent(subjects)}%20at%20${encodeURIComponent(preferredLocation)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp for Express Placement</span>
              </a>

              {onCancel && (
                <button
                  onClick={onCancel}
                  className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl text-sm transition cursor-pointer"
                >
                  Back to Website
                </button>
              )}
            </div>
          </div>
        ) : (
          /* The Form */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                Parent & Student Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0f294a] mt-2">
                Find a Tutor (Submit Tuition Requirements)
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Tell us about your student's curriculum, subjects, and preferred Dhaka location. 
                We will match you with handpicked, background-verified tutors.
              </p>
              {preselectedTutorName && (
                <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 font-semibold">
                  📌 Direct Request for: <strong>{preselectedTutorName}</strong>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Student Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                  1. Student & Academic Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Student's Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Ahnaf Tahmid"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Class / Academic Level *
                    </label>
                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    >
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10 (SSC Candidate)">Class 10 (SSC Candidate)</option>
                      <option value="HSC 1st Year">HSC 1st Year</option>
                      <option value="HSC 2nd Year">HSC 2nd Year</option>
                      <option value="University Admission (DU Ka)">University Admission (DU Ka-Unit)</option>
                      <option value="University Admission (DU Kha)">University Admission (DU Kha-Unit)</option>
                      <option value="University Admission (DU Ga)">University Admission (DU Ga-Unit)</option>
                      <option value="University Admission (IBA / BBA)">University Admission (IBA / BBA)</option>
                      <option value="Medical Admission (MBBS)">Medical Admission (MBBS)</option>
                      <option value="Engineering Admission (BUET)">Engineering Admission (BUET)</option>
                      <option value="Spoken & Academic English">Spoken & Academic English</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      School / College / Institution *
                    </label>
                    <input
                      type="text"
                      required
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. Notre Dame College / Viqarunnisa / City College"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Curriculum / Medium *
                    </label>
                    <select
                      value={curriculum}
                      onChange={(e) => setCurriculum(e.target.value as Medium)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    >
                      <option value="Bangla Medium">Bangla Medium (NCTB)</option>
                      <option value="English Version">English Version (NCTB)</option>
                      <option value="English Medium">English Medium (Cambridge)</option>
                      <option value="Edexcel / Cambridge">Edexcel / IGCSE / A-Levels</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject(s) Needed *
                  </label>
                  <input
                    type="text"
                    required
                    value={subjects}
                    onChange={(e) => setSubjects(e.target.value)}
                    placeholder="e.g. Higher Math, Physics, Chemistry OR English 1st & 2nd Paper"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Section 2: Tutor & Tuition Preferences */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                  2. Tuition Preferences & Location
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Gender of Tutor *
                    </label>
                    <select
                      value={preferredGender}
                      onChange={(e) => setPreferredGender(e.target.value as Gender)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    >
                      <option value="Any">Any Gender</option>
                      <option value="Male">Male Tutor</option>
                      <option value="Female">Female Tutor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Location / Area in Dhaka *
                    </label>
                    <select
                      value={preferredLocation}
                      onChange={(e) => setPreferredLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    >
                      {DHAKA_AREAS.filter(a => a !== 'All Dhaka Areas').map((area) => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tuition Mode *
                    </label>
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    >
                      <option value="Home">Home Tuition (At Student's Residence)</option>
                      <option value="Online">Online Tuition (Zoom / Meet)</option>
                      <option value="Home or Online">Home or Online (Flexible)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Classes Per Week *
                    </label>
                    <select
                      value={daysPerWeek}
                      onChange={(e) => setDaysPerWeek(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    >
                      <option value="2 days/week">2 days/week</option>
                      <option value="3 days/week">3 days/week</option>
                      <option value="4 days/week">4 days/week</option>
                      <option value="5 days/week">5 days/week</option>
                      <option value="Weekly Crash Course">Weekly Crash Course</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Days
                    </label>
                    <input
                      type="text"
                      value={preferredDays}
                      onChange={(e) => setPreferredDays(e.target.value)}
                      placeholder="e.g. Sat, Mon, Wed"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Time Slot
                    </label>
                    <input
                      type="text"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      placeholder="e.g. 5:30 PM or Evening"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Monthly Budget (in BDT ৳) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">৳</span>
                    <input
                      type="text"
                      required
                      value={monthlyBudget}
                      onChange={(e) => setMonthlyBudget(e.target.value)}
                      placeholder="e.g. 8000"
                      className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Average monthly tuition in Dhaka is ৳6,000 - ৳15,000 depending on class and subjects.
                  </span>
                </div>
              </div>

              {/* Section 3: Parent Contact */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                  3. Parent / Guardian Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. M. Rahman"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp Number (For CVs)
                    </label>
                    <input
                      type="tel"
                      value={parentWhatsApp}
                      onChange={(e) => setParentWhatsApp(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Additional Requirements or Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    placeholder="Specific university department preference, student strengths/weaknesses, address landmark..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Section 4: Parent / Guardian Identity Verification (NID) */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-2 gap-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>4. Parent / Guardian Identity Verification (NID)</span>
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Recommended for Household Trust
                  </span>
                </div>

                {/* Verification Guidance Note */}
                <div className="bg-[#0f294a] text-white p-4 rounded-2xl text-xs space-y-1.5 shadow-sm">
                  <div className="font-bold flex items-center gap-2 text-amber-300">
                    <Lock className="w-4 h-4 text-amber-300" />
                    <span>Safe Home Policy: Parent / Guardian Verified Account</span>
                  </div>
                  <p className="text-blue-100 text-[11px] leading-relaxed">
                    For students under 18, the parent or legal adult guardian acts as the verified account holder. Providing your NID grants your posting the <strong className="text-emerald-300">🟢 Guardian NID Verified</strong> badge, which prioritizes your request and gives DU tutors confidence in household safety.
                  </p>
                  <p className="text-[10px] text-amber-200 font-medium">
                    🔒 Privacy Guarantee: Your NID number and card scans will NEVER be shown publicly. They are strictly retained for admin background verification.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Guardian National ID (NID) Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={guardianNid}
                      onChange={(e) => setGuardianNid(e.target.value)}
                      placeholder="e.g. 2691902488 (10 or 17 digits)"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Protected format: •••• •••• {guardianNid.slice(-4) || 'XXXX'}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Guardian Date of Birth
                    </label>
                    <input
                      type="date"
                      value={guardianDob}
                      onChange={(e) => setGuardianDob(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Upload simulation cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setGuardianNidFrontUploaded(!guardianNidFrontUploaded)}
                    className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-2xl p-4 text-center hover:bg-emerald-50/20 transition cursor-pointer"
                  >
                    <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1.5" />
                    <span className="text-xs font-bold text-slate-800 block">
                      Guardian NID Card (Front)
                    </span>
                    <span className="text-[11px] text-slate-500 block mb-2">
                      Clear photo or scanned PDF
                    </span>
                    <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      guardianNidFrontUploaded ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {guardianNidFrontUploaded ? '✓ Guardian_Front.jpg Attached' : '+ Click to Upload Front'}
                    </span>
                  </div>

                  <div 
                    onClick={() => setGuardianNidBackUploaded(!guardianNidBackUploaded)}
                    className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-2xl p-4 text-center hover:bg-emerald-50/20 transition cursor-pointer"
                  >
                    <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1.5" />
                    <span className="text-xs font-bold text-slate-800 block">
                      Guardian NID Card (Back)
                    </span>
                    <span className="text-[11px] text-slate-500 block mb-2">
                      Showing address & signature
                    </span>
                    <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      guardianNidBackUploaded ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {guardianNidBackUploaded ? '✓ Guardian_Back.jpg Attached' : '+ Click to Upload Back'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Free demo class included. No advance fees charged to parents.</span>
                </div>

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
                    className="w-full sm:w-auto bg-[#d97706] hover:bg-[#b45309] text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request a Tutor</span>
                    <ArrowRight className="w-4 h-4" />
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
