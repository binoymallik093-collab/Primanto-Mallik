import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  HelpCircle, 
  Compass, 
  FileText, 
  Users,
  Target,
  Sparkles
} from 'lucide-react';
import { ADMISSION_UNITS } from '../data/initialData';

interface AdmissionPrepSectionProps {
  openFindTutor: () => void;
  openBecomeTutor: () => void;
}

export const AdmissionPrepSection: React.FC<AdmissionPrepSectionProps> = ({
  openFindTutor,
  openBecomeTutor
}) => {
  const [selectedUnit, setSelectedUnit] = useState<string>('du-ka');

  const currentUnit = ADMISSION_UNITS.find(u => u.id === selectedUnit) || ADMISSION_UNITS[0];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            Specialized Guidance
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0f294a] tracking-tight">
            University Admission & Board Exam Preparation
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Learn directly from toppers of Dhaka University, BUET, and Dhaka Medical College who recently conquered these competitive exams.
          </p>
        </div>

        {/* Admission Unit Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {ADMISSION_UNITS.map((unit) => (
            <button
              key={unit.id}
              onClick={() => setSelectedUnit(unit.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedUnit === unit.id
                  ? 'bg-[#0f294a] text-white shadow-md scale-102'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {unit.unit}
            </button>
          ))}
        </div>

        {/* Selected Admission Unit Deep Dive Card */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-3xl p-6 sm:p-10 border border-blue-100 shadow-lg mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Overview */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-blue-900 text-white font-mono text-xs font-bold px-2.5 py-1 rounded-md">
                  {currentUnit.university}
                </span>
                <span className="bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold px-2.5 py-1 rounded-full">
                  {currentUnit.unit}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#0f294a]">
                {currentUnit.title}
              </h3>

              <p className="text-sm text-slate-700 leading-relaxed">
                {currentUnit.description}
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                    Subjects & Syllabus Tested
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {currentUnit.subjectsCovered.map((sub, i) => (
                      <span key={i} className="bg-white text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Eligibility Requirements
                    </span>
                    <p className="text-xs text-slate-800 font-medium leading-relaxed">
                      {currentUnit.eligibility}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Exam Format & Scoring
                    </span>
                    <p className="text-xs text-slate-800 font-medium leading-relaxed">
                      {currentUnit.examPattern}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Mentor Action Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0f294a]">Admission Mentorship</h4>
                    <p className="text-xs text-slate-500">{currentUnit.topMentorsCount}+ active mentors available</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>One-on-one question bank drills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Weekly mock tests & detailed paper review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Time management & negative mark avoidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Subject preference choice consultation</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <button
                  onClick={openFindTutor}
                  className="w-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request {currentUnit.unit} Tutor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-slate-400 text-center">
                  Online & Home tutoring available across Dhaka
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Mentorship Features (Section 4 & 9) */}
        <div className="border-t border-slate-200 pt-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-[#0f294a]">
              Academic Mentorship Beyond Daily Tuition
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Building long-term study discipline, psychological confidence, and university admission clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1e3a8a] flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Customized Study Routines</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tutors design realistic daily schedules balancing college homework, coaching tests, and independent textbook reading.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Subject Selection Guidance</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert advice on 4th subject choices for SSC and HSC, as well as choosing between Science, Business, and Humanities tracks.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Exam Psychology & Confidence</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mentors who scored top national ranks help students overcome exam stress, fear of mathematics, and multiple-choice panic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
