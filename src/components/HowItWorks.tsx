import React, { useState } from 'react';
import { 
  FileCheck, 
  Search, 
  CheckCircle2, 
  Sparkles, 
  UserPlus, 
  FileText, 
  ShieldCheck, 
  Send,
  ArrowRight
} from 'lucide-react';

interface HowItWorksProps {
  openFindTutor: () => void;
  openBecomeTutor: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  openFindTutor,
  openBecomeTutor
}) => {
  const [activeMode, setActiveMode] = useState<'students' | 'tutors'>('students');

  const studentSteps = [
    {
      step: '01',
      title: 'Submit Requirements',
      desc: 'Fill out our simple form with your class, subjects, Dhaka location, preferred days, and monthly budget.',
      icon: FileCheck
    },
    {
      step: '02',
      title: 'We Match Verified Tutors',
      desc: 'Our academic coordinators curate 2-3 matching CVs from top Dhaka University departments within 24 hours.',
      icon: Search
    },
    {
      step: '03',
      title: 'Take a Free Demo Class',
      desc: 'Conduct an in-person or online trial class to assess teaching style, subject grasp, and communication.',
      icon: Sparkles
    },
    {
      step: '04',
      title: 'Confirm & Start Learning',
      desc: 'Finalize tuition terms with full support and guarantee of free tutor replacement if needed.',
      icon: CheckCircle2
    }
  ];

  const tutorSteps = [
    {
      step: '01',
      title: 'Register Free Online',
      desc: 'Sign up with your university email, department details, and contact number in under 3 minutes.',
      icon: UserPlus
    },
    {
      step: '02',
      title: 'Submit Academic Credentials',
      desc: 'Provide your DU Student ID card, SSC/HSC transcripts, and preferred tutoring zones in Dhaka.',
      icon: FileText
    },
    {
      step: '03',
      title: 'Get Verified Profile',
      desc: 'Pass our short screening to unlock the green Verified DU badge and gain highest placement priority.',
      icon: ShieldCheck
    },
    {
      step: '04',
      title: 'Apply & Start Teaching',
      desc: 'Browse our live Tuition Jobs Board (T-1025 etc.) and apply directly for matching opportunities.',
      icon: Send
    }
  ];

  const steps = activeMode === 'students' ? studentSteps : tutorSteps;

  return (
    <section className="py-16 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
            Transparent Process
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0f294a] tracking-tight">
            How It Works
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            A seamless, transparent bridge between dedicated parents, ambitious students, and qualified university tutors.
          </p>

          {/* Interactive Switcher */}
          <div className="mt-6 inline-flex p-1.5 bg-white border border-slate-200 rounded-xl shadow-xs">
            <button
              onClick={() => setActiveMode('students')}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                activeMode === 'students'
                  ? 'bg-[#0f294a] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For Parents & Students
            </button>
            <button
              onClick={() => setActiveMode('tutors')}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                activeMode === 'tutors'
                  ? 'bg-[#0f294a] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For University Tutors
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative flex flex-col justify-between group hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-amber-500 font-mono">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#0f294a] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center text-[11px] font-semibold text-slate-400">
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action based on active tab */}
        <div className="mt-10 text-center">
          {activeMode === 'students' ? (
            <button
              onClick={openFindTutor}
              className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white font-bold px-6 py-3 rounded-xl shadow-md transition"
            >
              <span>Submit Tuition Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={openBecomeTutor}
              className="inline-flex items-center gap-2 bg-[#0f294a] hover:bg-[#1e3a8a] text-white font-bold px-6 py-3 rounded-xl shadow-md transition"
            >
              <span>Register as a Tutor Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
