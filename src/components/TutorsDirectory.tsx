import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  Filter, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { Tutor } from '../types';
import { DHAKA_AREAS, CLASSES_LIST, SUBJECTS_LIST } from '../data/initialData';

interface TutorsDirectoryProps {
  tutors: Tutor[];
  onSelectTutor: (tutor: Tutor) => void;
  onRequestTutor: (tutor: Tutor) => void;
  openBecomeTutor: () => void;
  initialFilters?: { classLevel: string; subject: string; area: string } | null;
}

export const TutorsDirectory: React.FC<TutorsDirectoryProps> = ({
  tutors,
  onSelectTutor,
  onRequestTutor,
  openBecomeTutor,
  initialFilters
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState(initialFilters?.classLevel || 'All Classes');
  const [selectedSubject, setSelectedSubject] = useState(initialFilters?.subject || 'All Subjects');
  const [selectedArea, setSelectedArea] = useState(initialFilters?.area || 'All Dhaka Areas');
  const [selectedGender, setSelectedGender] = useState<'All' | 'Male' | 'Female'>('All');
  const [onlyVerified, setOnlyVerified] = useState(true);

  const filteredTutors = tutors.filter((tutor) => {
    const matchesSearch = 
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      tutor.preferredAreas.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesClass = 
      selectedClass === 'All Classes' || 
      tutor.classesTaught.some(c => c.toLowerCase().includes(selectedClass.toLowerCase()));

    const matchesSubject = 
      selectedSubject === 'All Subjects' || 
      tutor.subjects.some(s => s.toLowerCase().includes(selectedSubject.toLowerCase()));

    const matchesArea = 
      selectedArea === 'All Dhaka Areas' || 
      tutor.preferredAreas.some(a => a.toLowerCase().includes(selectedArea.toLowerCase()));

    const matchesGender = selectedGender === 'All' || tutor.gender === selectedGender;
    const matchesVerified = !onlyVerified || tutor.verified;

    return matchesSearch && matchesClass && matchesSubject && matchesArea && matchesGender && matchesVerified;
  });

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              Verified Tutors Directory
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f294a] tracking-tight mt-2">
              Browse Qualified Dhaka University Tutors
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Screened university students and subject specialists ready for home & online tuition.
            </p>
          </div>

          <button
            onClick={openBecomeTutor}
            className="self-start md:self-auto bg-[#0f294a] hover:bg-[#1e3a8a] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>Join as a Tutor</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-8 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tutor, subject, area..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Class Filter */}
            <div>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                {CLASSES_LIST.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Subject Filter */}
            <div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                {SUBJECTS_LIST.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Area Filter */}
            <div>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                {DHAKA_AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sub Filters: Gender & Verified */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-600">Gender:</span>
                {(['All', 'Male', 'Female'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                      selectedGender === g 
                        ? 'bg-blue-900 text-white font-bold' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-1.5 cursor-pointer select-none text-slate-700 font-medium">
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Show Only Verified DU Tutors</span>
              </label>
            </div>

            <div className="text-slate-500">
              Found <strong className="text-slate-900">{filteredTutors.length}</strong> matching tutors
            </div>
          </div>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
              <UserCheck className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-700">No tutors match the selected criteria</h3>
              <p className="text-xs text-slate-500 mt-1">Try resetting the filters or submit a custom tuition request.</p>
            </div>
          ) : (
            filteredTutors.map((tutor) => (
              <div
                key={tutor.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-blue-300"
              >
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Tutor Header Card */}
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={tutor.avatar}
                        alt={tutor.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-xs"
                      />
                      {tutor.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-0.5 rounded-full shadow" title="Verified Profile">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-[#0f294a] truncate group-hover:text-blue-700 transition-colors">
                          {tutor.name}
                        </h3>
                      </div>
                      <p className="text-xs font-semibold text-blue-900 truncate">
                        {tutor.department}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {tutor.university} {tutor.yearSemester ? `(${tutor.yearSemester})` : ''}
                      </p>

                      <div className="flex items-center gap-2 mt-1 text-[11px]">
                        <span className="flex items-center text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                          {tutor.rating.toFixed(1)}
                        </span>
                        <span className="text-slate-400">({tutor.reviewsCount} reviews)</span>
                      </div>

                      {/* 3-Tier Badges on Card */}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {tutor.isIdentityVerified && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-0.5" title="Government NID Checked">
                            <span>🟢</span> Identity
                          </span>
                        )}
                        {tutor.isAcademicVerified && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-0.5" title="University Credentials Checked">
                            <span>🔵</span> Academic
                          </span>
                        )}
                        {tutor.isPlatformVerified && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-0.5" title="Interview & Screening Passed">
                            <span>⭐</span> Platform
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Subjects Taught
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {tutor.subjects.slice(0, 3).map((sub, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded">
                          {sub}
                        </span>
                      ))}
                      {tutor.subjects.length > 3 && (
                        <span className="text-[10px] text-slate-500 self-center">
                          +{tutor.subjects.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Preferred Areas */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Preferred Locations in Dhaka
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-700 font-medium truncate">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="truncate">{tutor.preferredAreas.slice(0, 3).join(', ')}</span>
                    </div>
                  </div>

                  {/* Expected Salary & Mode */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Expected Salary</span>
                      <span className="font-bold text-emerald-700">{tutor.expectedSalary}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Tuition Mode</span>
                      <span className="font-semibold text-slate-700">{tutor.teachingMode}</span>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectTutor(tutor)}
                    className="flex-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 py-2 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer text-center"
                  >
                    View Full Profile
                  </button>
                  <button
                    onClick={() => onRequestTutor(tutor)}
                    className="flex-1 bg-[#d97706] hover:bg-[#b45309] text-white py-2 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer text-center"
                  >
                    Request Tutor
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
