import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Languages, 
  Award, 
  Layers,
  ArrowRight,
  School
} from 'lucide-react';

interface CategoriesSectionProps {
  onSelectCategory: (category: string) => void;
  openFindTutor: () => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
  openFindTutor
}) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<'school' | 'ssc' | 'hsc' | 'admission' | 'language'>('school');

  const categories = {
    school: {
      title: 'School Level Tuition',
      description: 'Foundational concept building for Junior High school students across all curricula.',
      items: [
        { name: 'Class 6', desc: 'All subjects, Math foundation, English grammar basics' },
        { name: 'Class 7', desc: 'Pre-algebra, Science concepts, Bangla and English composition' },
        { name: 'Class 8', desc: 'JSC board pattern preparation, Math, Science & ICT' },
        { name: 'Class 9', desc: 'Science, Business or Humanities stream inception & Math foundation' },
        { name: 'Class 10 (Pre-SSC)', desc: 'Complete textbook syllabus revision and test paper questions' }
      ]
    },
    ssc: {
      title: 'SSC Board Exam Preparation',
      description: 'Focused target scoring for Golden A+ in Secondary School Certificate examinations.',
      items: [
        { name: 'Science Group', desc: 'Higher Math, Physics, Chemistry, Biology, General Math, ICT' },
        { name: 'Business Studies', desc: 'Accounting, Finance & Banking, Business Organization, General Math' },
        { name: 'Humanities Group', desc: 'Economics, Civics, History, Geography, General Science' }
      ]
    },
    hsc: {
      title: 'HSC Higher Secondary Preparation',
      description: 'Rigorous 2-year preparation for college midterms, test exams, and HSC Board excellence.',
      items: [
        { name: 'Science Group', desc: 'Physics 1st & 2nd, Chemistry 1st & 2nd, Higher Math 1st & 2nd, Biology' },
        { name: 'Business Studies', desc: 'Accounting 1st & 2nd, Finance, Management, Marketing' },
        { name: 'Humanities Group', desc: 'Economics, Logic, Social Work, Islamic History, English' }
      ]
    },
    admission: {
      title: 'University Admission Coaching',
      description: 'Mentoring by recent toppers of prestigious public universities and medical colleges.',
      items: [
        { name: 'Dhaka University (DU)', desc: 'Ka-Unit (Science), Kha-Unit (Arts & Social Science), Ga-Unit (Business)' },
        { name: 'IBA & BBA Admissions', desc: 'DU IBA, JU IBA, and BUP written & interview prep in English' },
        { name: 'Medical Colleges (MBBS/BDS)', desc: 'Central medical test preparation, NCERT textbook drills, MCQ tests' },
        { name: 'BUET & Engineering', desc: 'Advanced written problem solving for BUET, CK-RUET, MIST' },
        { name: 'JU, RU, CU & GST Cluster', desc: 'Unit-specific syllabus, negative marking tips, question bank mastery' }
      ]
    },
    language: {
      title: 'Language & International Exams',
      description: 'Grammar mastery, spoken fluency, and international standardized test mentoring.',
      items: [
        { name: 'Academic & Spoken English', desc: 'Free-hand writing, phonetics, accent correction, formal speaking' },
        { name: 'Bangla Grammar & Sahitto', desc: 'Bangla 2nd paper byakoron, essay writing, formal letters' },
        { name: 'IELTS / English Communication', desc: 'Band 7.5+ targeting for listening, reading, writing, and speaking' },
        { name: 'Foreign Languages (Spanish/French)', desc: 'Beginner to intermediate conversational language fundamentals' }
      ]
    }
  };

  const tabs = [
    { id: 'school', label: 'School (Class 6-10)', icon: School },
    { id: 'ssc', label: 'SSC Candidates', icon: BookOpen },
    { id: 'hsc', label: 'HSC Candidates', icon: Layers },
    { id: 'admission', label: 'University Admission', icon: GraduationCap },
    { id: 'language', label: 'Language & Skills', icon: Languages }
  ];

  const current = categories[activeCategoryTab];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            Browse by Curriculum
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0f294a] tracking-tight">
            Tuition Categories
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Structured support tailored to your specific grade, board curriculum, and academic milestones.
          </p>

          {/* Tab buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategoryTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategoryTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0f294a] text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Category Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-5xl mx-auto">
          <div className="mb-6 pb-4 border-b border-slate-100">
            <h3 className="text-xl font-bold text-[#0f294a]">{current.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">{current.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {current.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#1e3a8a] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    onClick={() => {
                      onSelectCategory(item.name);
                      openFindTutor();
                    }}
                    className="text-xs font-bold text-blue-900 hover:text-amber-600 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Tutor</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    Home / Online
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
