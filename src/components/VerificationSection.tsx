import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  GraduationCap, 
  IdCard, 
  Video, 
  CheckCircle2, 
  Award,
  AlertCircle,
  Lock,
  UserCheck,
  Check,
  ChevronRight,
  EyeOff,
  Database
} from 'lucide-react';

interface VerificationSectionProps {
  openBecomeTutor: () => void;
  openFindTutor: () => void;
}

export const VerificationSection: React.FC<VerificationSectionProps> = ({
  openBecomeTutor,
  openFindTutor
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'parent' | 'privacy'>('overview');

  const verificationBadges = [
    {
      badge: '🟢 Identity Verified',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      icon: UserCheck,
      iconColor: 'text-emerald-600',
      title: 'NID & Identity Verified',
      subtitle: 'Government Smart NID / National Identity Checked',
      desc: 'National ID number, date of birth, photo match, and official government identity documents validated by our safety team.',
      target: 'Both Parents/Guardians & Tutors'
    },
    {
      badge: '🔵 Academic Verified',
      color: 'bg-blue-50 text-blue-800 border-blue-300',
      icon: GraduationCap,
      iconColor: 'text-blue-600',
      title: 'University & Academic Credentials Verified',
      subtitle: 'Dhaka University / Institution ID & Transcripts Checked',
      desc: 'University Student ID, department enrollment, Hall registration, and SSC/HSC board GPA results physically or digitally verified.',
      target: 'Tutors & Subject Mentors'
    },
    {
      badge: '⭐ Platform Verified Tutor',
      color: 'bg-amber-50 text-amber-900 border-amber-300',
      icon: Award,
      iconColor: 'text-amber-600',
      title: 'Comprehensive Platform Verified Tutor',
      subtitle: 'Identity + Academic + Pedagogy Screening Completed',
      desc: 'Achieved only after NID identity clearance, academic credential audit, past student feedback review, and coordinator safety screening.',
      target: 'Elite & Trusted Tutors'
    }
  ];

  const parentSteps = [
    {
      step: '01',
      title: 'Account & Guardian Details',
      desc: 'Parent or adult guardian enters full legal name, active mobile number, and student details.'
    },
    {
      step: '02',
      title: 'NID Document Submission',
      desc: 'Encrypted upload of National ID card (Front & Back) along with Date of Birth and guardian photo.'
    },
    {
      step: '03',
      title: 'Safety Verification Cell Review',
      desc: 'Coordinator checks the NID document against the residential tuition location.'
    },
    {
      step: '04',
      title: '🟢 NID Verified Guardian Badge',
      desc: 'Tuition post displays "Guardian NID Verified", attracting the most qualified DU tutors immediately.'
    }
  ];

  return (
    <section id="verification" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Core Brand Promise Banner */}
        <div className="bg-[#0f294a] text-white rounded-3xl p-6 sm:p-10 mb-12 shadow-xl border border-blue-900/50 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Safety & Trust Standard</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
              "A trusted tuition platform built around verified identities, qualified tutors, and safer connections between students, parents and teachers."
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We separate <strong className="text-emerald-400 font-semibold">Identity Verification</strong> from <strong className="text-blue-400 font-semibold">Academic Verification</strong>. 
              NID verification proves identity and guarantees family safety; academic verification certifies subject mastery and teaching capability.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('badges')}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition flex items-center gap-1.5 shadow-md"
              >
                <span>Explore 3 Verification Badges</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition border border-white/20 flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-amber-300" />
                <span>NID Privacy & Encryption Policy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900 mb-2">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>Dual-Sided NID Verification Framework</span>
          </div>
          <h3 className="text-3xl font-extrabold text-[#0f294a]">
            How We Verify Both Families & Educators
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Choose a perspective to explore how our verification protocols protect your household and educational career.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'overview'
                ? 'bg-[#0f294a] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🛡️ 6-Step Tutor Pipeline
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'badges'
                ? 'bg-[#0f294a] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🏷️ The 3 Verification Badges
          </button>
          <button
            onClick={() => setActiveTab('parent')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'parent'
                ? 'bg-[#0f294a] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            👨‍👩‍👧 Student & Parent Verification
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'privacy'
                ? 'bg-[#0f294a] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🔒 NID Privacy & Safety
          </button>
        </div>

        {/* TAB 1: 6-STEP TUTOR PIPELINE */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  step: 1,
                  title: '1. Identity & NID Check',
                  badge: '🟢 Identity Verified',
                  icon: IdCard,
                  desc: 'Tutor submits full name, mobile, Date of Birth, and National ID Card (front and back). Verified against Bangladesh Election Commission database.'
                },
                {
                  step: 2,
                  title: '2. Academic Credential Audit',
                  badge: '🔵 Academic Verified',
                  icon: GraduationCap,
                  desc: 'Submission of Dhaka University Student ID Card, department enrollment slip, Hall membership, and SSC/HSC GPA certificates.'
                },
                {
                  step: 3,
                  title: '3. Department Cross-Check',
                  badge: 'Campus Validation',
                  icon: Database,
                  desc: 'Verification with DU departmental rolls or alumni registers to eliminate fabricated resumes or false identity claims.'
                },
                {
                  step: 4,
                  title: '4. Pedagogy & Safety Interview',
                  badge: 'Interview Screened',
                  icon: Video,
                  desc: 'Coordinator interview to evaluate teaching approach, communication skills, ethical conduct, and background safety.'
                },
                {
                  step: 5,
                  title: '5. Media Board Clearance',
                  badge: 'Admin Approved',
                  icon: CheckCircle2,
                  desc: 'Formal media coordinator sign-off and logging into the encrypted verification register with unique audit trail.'
                },
                {
                  step: 6,
                  title: '6. Platform Verified Badge',
                  badge: '⭐ Platform Verified',
                  icon: Award,
                  desc: 'Tutor receives public trust badges on their profile and gains privileged access to apply for premium home tuition postings.'
                }
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div 
                    key={s.step} 
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition group space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center group-hover:bg-[#0f294a] group-hover:text-white transition">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {s.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#0f294a]">
                      {s.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: THE 3 VERIFICATION BADGES */}
        {activeTab === 'badges' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 sm:p-5 text-xs text-blue-900 leading-relaxed">
              <strong className="font-bold">Why Distinct Badges Matter:</strong> We reject generic "verified" stamps that hide whether a tutor is only identity-checked or academically vetted. Our 3 distinct badges provide transparent, granular clarity to parents and students.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {verificationBadges.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-400 transition">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${b.color}`}>
                          {b.badge}
                        </span>
                        <div className={`p-2 rounded-xl bg-slate-50 ${b.iconColor}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-[#0f294a]">
                        {b.title}
                      </h4>
                      <div className="text-[11px] font-semibold text-slate-500">
                        {b.subtitle}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {b.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-semibold text-slate-400 block">Applies To</span>
                      <span className="text-xs font-bold text-slate-800">{b.target}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: STUDENT & PARENT VERIFICATION */}
        {activeTab === 'parent' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                For Minors: Parent/Guardian Account Holder Standard
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-[#0f294a]">
                Student & Parent NID Verification Process
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To safeguard university tutors visiting homes and protect minor students, our platform requires the <strong>parent or legal guardian</strong> to complete NID verification rather than the school child.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {parentSteps.map((ps) => (
                <div key={ps.step} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                  <span className="text-xl font-black text-emerald-600">{ps.step}</span>
                  <h5 className="text-xs sm:text-sm font-bold text-[#0f294a]">{ps.title}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">{ps.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-emerald-950 space-y-1">
                <strong className="text-sm font-bold block text-emerald-900">
                  Ready to post a tuition request with a Verified Guardian Badge?
                </strong>
                <span>Tutors respond 3x faster to requests with verified parent credentials.</span>
              </div>

              <button
                onClick={openFindTutor}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm shrink-0"
              >
                Post Verified Tuition Request
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: NID PRIVACY & STRICT SECURITY */}
        {activeTab === 'privacy' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold">
                <EyeOff className="w-3.5 h-3.5 text-purple-600" />
                Data Minimization & Strict Confidentiality
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-[#0f294a]">
                How We Protect Sensitive National ID (NID) Information
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                National Identity Documents are highly sensitive. We follow a strict security policy designed from the ground up to prevent identity exposure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                  <Lock className="w-4 h-4 text-rose-600" />
                  What Is NEVER Displayed Publicly
                </div>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span><strong>NID numbers</strong> are completely masked (e.g., •••• •••• 9104) and never revealed publicly.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span><strong>NID card front and back photos</strong> are never accessible on public tutor profiles or job boards.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>Public viewers only see the earned badges: <strong className="text-emerald-700">🟢 Identity Verified</strong> and <strong className="text-blue-700">🔵 Academic Verified</strong>.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <Database className="w-4 h-4 text-blue-700" />
                  Restricted Admin Access & Audit Trail
                </div>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>NID documents reside in restricted, admin-only storage requiring multi-factor authentication.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>Strict audit logs record every coordinator who views or verifies an identity document.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>Users provide explicit opt-in consent before uploading, with the right to update or revoke records.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Action Callout */}
        <div className="mt-8 bg-amber-50 rounded-2xl p-5 sm:p-6 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-950">
                Verified Community Standards
              </h4>
              <p className="text-xs text-amber-900 mt-0.5 leading-relaxed">
                Whether you are a university tutor seeking legitimate tuition jobs or a parent welcoming a teacher into your home, our NID verification guarantees accountability for both parties.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={openBecomeTutor}
              className="flex-1 sm:flex-initial bg-[#0f294a] hover:bg-[#1e3a8a] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
            >
              Get Verified as a Tutor
            </button>
            <button
              onClick={openFindTutor}
              className="flex-1 sm:flex-initial bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
            >
              Hire a Verified Tutor
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
