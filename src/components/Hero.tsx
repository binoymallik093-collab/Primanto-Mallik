import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  BookOpen, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Star,
  Users,
  Award,
  Sparkles
} from 'lucide-react';
import { DHAKA_AREAS, CLASSES_LIST, SUBJECTS_LIST } from '../data/initialData';

interface HeroProps {
  onSearch: (filters: { classLevel: string; subject: string; area: string }) => void;
  openFindTutor: () => void;
  openBecomeTutor: () => void;
  onNavigateToJobs: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  openFindTutor,
  openBecomeTutor,
  onNavigateToJobs,
}) => {
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedArea, setSelectedArea] = useState('All Dhaka Areas');

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      classLevel: selectedClass,
      subject: selectedSubject,
      area: selectedArea,
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a192f] via-[#0f294a] to-[#15345d] text-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Decorative background grid and ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-400/30 text-xs sm:text-sm font-semibold text-blue-200 backdrop-blur-sm shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Dhaka's #1 Premier University Tutors Network</span>
            <span className="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full text-[11px]">
              100% Verified
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            Find the <span className="text-amber-400">Right Tutor</span> for Your Academic Journey.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Trusted tuition services connecting students and parents with qualified, 
            background-verified tutors from the <strong className="text-white font-semibold">University of Dhaka</strong> and top academic institutions across Dhaka.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={openFindTutor}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition transform hover:-translate-y-0.5 flex items-center gap-2 text-base cursor-pointer"
            >
              <span>Find a Tutor (Parents / Students)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={openBecomeTutor}
              className="bg-blue-800/80 hover:bg-blue-700/90 text-white border border-blue-400/40 font-semibold px-6 py-3.5 rounded-xl backdrop-blur-sm transition transform hover:-translate-y-0.5 flex items-center gap-2 text-base cursor-pointer"
            >
              <GraduationCap className="w-5 h-5 text-amber-300" />
              <span>Join as a Tutor</span>
            </button>
            <button
              onClick={onNavigateToJobs}
              className="bg-slate-800/80 hover:bg-slate-700/90 text-slate-200 border border-slate-600/60 font-medium px-4 py-3 rounded-xl transition text-sm flex items-center gap-1.5"
            >
              <span>Explore Live Tuition Jobs</span>
            </button>
          </div>
        </div>

        {/* Quick Interactive Search Box */}
        <div className="mt-10 max-w-4xl mx-auto bg-white text-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl border border-blue-100">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-[#0f294a]">
            <Search className="w-4 h-4 text-amber-500" />
            Quick Tutor Search by Subject, Class & Location
          </div>

          <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {/* Class Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                Class / Exam Level
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  {CLASSES_LIST.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subject Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                Subject
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  {SUBJECTS_LIST.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Area Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                Location in Dhaka
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  {DHAKA_AREAS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Filter */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-[#0f294a] hover:bg-[#1e3a8a] text-white font-bold py-2.5 px-4 rounded-lg text-sm transition shadow-sm hover:shadow flex items-center justify-center gap-2 h-[42px] cursor-pointer"
              >
                <Search className="w-4 h-4" />
                Search Tutors
              </button>
            </div>
          </form>
        </div>

        {/* 4 Trust Metric Cards */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300 shrink-0">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">3,500+</div>
              <div className="text-xs text-slate-300 font-medium">Verified Tutors</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">100%</div>
              <div className="text-xs text-slate-300 font-medium">DU ID Verified</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300 shrink-0">
              <Users className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">12,000+</div>
              <div className="text-xs text-slate-300 font-medium">Students Mentored</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300 shrink-0">
              <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">4.9 / 5.0</div>
              <div className="text-xs text-slate-300 font-medium">Parent Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
