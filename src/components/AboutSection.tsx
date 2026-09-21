import React from 'react';
import { 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  HeartHandshake, 
  CheckCircle2, 
  TrendingUp, 
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AboutSectionProps {
  openFindTutor: () => void;
  openBecomeTutor: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  openFindTutor,
  openBecomeTutor
}) => {
  const advantages = [
    {
      title: 'University-Based Tutors',
      desc: 'Our tutor pool primarily comprises meritorious students and graduates from the University of Dhaka, BUET, and top medical colleges.'
    },
    {
      title: 'Rigorous ID Screening',
      desc: 'We verify student ID cards, hall records, and academic marksheets before issuing our green verified credential badge.'
    },
    {
      title: 'Personalized 24-48h Matching',
      desc: 'Instead of random posting, our coordinators analyze the student syllabus and curate 2-3 tailored teacher profiles.'
    },
    {
      title: 'Home & Online Options',
      desc: 'Flexible tutoring arrangements across every district and neighborhood in Dhaka, plus interactive digital classes.'
    },
    {
      title: 'Transparent Public Profiles',
      desc: 'Review real departments, academic backgrounds, expected salaries, and authentic student ratings with zero hidden conditions.'
    },
    {
      title: 'Free Trial Class Included',
      desc: 'Parents and students can assess teaching chemistry with a trial class before finalizing any monthly arrangement.'
    }
  ];

  const visionPhases = [
    { phase: 'Phase 1', title: 'Home & Online Tuition', desc: 'Personalized teacher matching across Dhaka' },
    { phase: 'Phase 2', title: 'Tutor Marketplace & Verified Profiles', desc: 'Transparent ratings and credential verification' },
    { phase: 'Phase 3', title: 'SSC & HSC Academic Resources', desc: 'Chapter-wise test series and creative question banks' },
    { phase: 'Phase 4', title: 'University Admission Mentorship', desc: 'Intensive DU, Medical, and Engineering entrance care' },
    { phase: 'Phase 5', title: 'Online Courses & Community', desc: 'Live masterclasses by top university faculty' },
    { phase: 'Phase 6', title: 'Mobile Application', desc: 'Seamless mobile tracking for parents and tutors' }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Main About Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              About Our Platform
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f294a] tracking-tight leading-tight">
              Dhaka University Tuition & Tutors Media
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              <strong>Dhaka University Tuition & Tutors Media</strong> is an educational platform dedicated to connecting students and parents with qualified, responsible, and background-verified tutors. We aim to make quality education more accessible by creating a trusted, professional bridge between students, guardians, and university tutors.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Founded around the academic culture of the University of Dhaka, our platform focuses on home tuition, online classes, academic mentoring, SSC and HSC board preparation, and competitive university admission guidance.
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-amber-500 space-y-1">
              <h4 className="text-sm font-bold text-slate-900">
                Our Tagline & Commitment:
              </h4>
              <p className="text-sm font-semibold text-amber-800 italic">
                "Quality Tutors. Verified Profiles. Better Learning."
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={openFindTutor}
                className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition"
              >
                Request a Tutor
              </button>
              <button
                onClick={openBecomeTutor}
                className="bg-[#0f294a] hover:bg-[#1e3a8a] text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition"
              >
                Join as a Tutor
              </button>
            </div>
          </div>

          {/* Right Visual / Highlights Card */}
          <div className="bg-gradient-to-br from-[#0f294a] via-[#1e3a8a] to-[#2563eb] text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                <ShieldCheck className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Why We Stand Apart</h3>
                <p className="text-xs text-blue-200">More than just a social media group</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-100">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>No Unverified Postings:</strong> Every tutor undergoes our 6-step verification pipeline.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Accountability & Safety:</strong> Student security and parent satisfaction are central to our placement.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Punctuality & Discipline:</strong> We monitor teacher attendance and monthly exam reviews.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Prompt Replacement:</strong> If teaching chemistry doesn't match, we replace the tutor within 48 hours for free.</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs">
              <span className="text-blue-200">Campus Location:</span>
              <strong className="text-white">Dhaka University, Nilkhet, Dhaka</strong>
            </div>
          </div>
        </div>

        {/* Why Choose Us Grid */}
        <div className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
              Your Competitive Advantage
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0f294a]">
              Why Parents & Students Choose Us
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h4 className="text-sm font-bold text-slate-900">{adv.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Long-Term Vision Roadmap (Section 17 from brief) */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              Our Long-Term Vision
            </span>
            <h3 className="mt-2 text-2xl font-extrabold text-[#0f294a]">
              Evolution into a Complete Bangladesh Education Platform
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Building a sustainable learning ecosystem beyond mere tuition advertisements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {visionPhases.map((vp, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-1.5 text-center flex flex-col justify-between">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full inline-block mx-auto">
                  {vp.phase}
                </span>
                <h4 className="text-xs font-bold text-slate-900">{vp.title}</h4>
                <p className="text-[11px] text-slate-500 leading-tight">{vp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
