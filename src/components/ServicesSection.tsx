import React from 'react';
import { 
  Home, 
  Laptop, 
  GraduationCap, 
  BookOpen, 
  UserCheck, 
  Compass, 
  ArrowRight,
  Check
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
  openFindTutor: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  openFindTutor
}) => {
  const services = [
    {
      id: 'home-tuition',
      title: 'Home Tuition',
      icon: Home,
      badge: 'Most Popular',
      color: 'blue',
      description: 'Connect with verified tutors who teach one-on-one at your residence across all locations in Dhaka.',
      points: [
        'Safe, trusted university student tutors',
        'Personalized care and pace of learning',
        'Direct parent-tutor communication',
        'Regular chapter-wise assessments'
      ]
    },
    {
      id: 'online-tuition',
      title: 'Online Tuition',
      icon: Laptop,
      badge: 'Flexible & Affordable',
      color: 'indigo',
      description: 'Interactive one-to-one or small-group classes conducted through Zoom or Google Meet with digital notes.',
      points: [
        'Learn from top DU tutors anywhere',
        'Digital pen and whiteboard teaching',
        'Recorded lectures for revision',
        'Flexible scheduling around exams'
      ]
    },
    {
      id: 'admission-prep',
      title: 'University Admission Preparation',
      icon: GraduationCap,
      badge: 'DU & Medical Focus',
      color: 'amber',
      description: 'Exclusive mentoring by Dhaka University, BUET, and DMC toppers for Ka, Kha, Ga, IBA, and Medical admission.',
      points: [
        'Past 15 years question bank analysis',
        'Negative marking prevention tricks',
        'Weekly full-length written & MCQ tests',
        'One-on-one strategy review'
      ]
    },
    {
      id: 'ssc-hsc',
      title: 'HSC & SSC Board Exam Preparation',
      icon: BookOpen,
      badge: 'Target Golden A+',
      color: 'emerald',
      description: 'Comprehensive subject-based preparation for Science, Business Studies, and Humanities groups.',
      points: [
        'NCTB textbook line-by-line mastery',
        'CQ creative question writing techniques',
        'MCQ speed & accuracy practice',
        'College test exam preparation'
      ]
    },
    {
      id: 'tutor-recruitment',
      title: 'Personalized Tutor Recruitment',
      icon: UserCheck,
      badge: 'Fast 24-48h Placement',
      color: 'sky',
      description: 'Parents submit specific requirements, and our media team recommends hand-screened suitable tutors.',
      points: [
        'Carefully matched to student curriculum',
        'Free 1-day demo class guarantee',
        'Quick tutor replacement if not satisfied',
        'Zero commission charged to parents'
      ]
    },
    {
      id: 'mentorship',
      title: 'Academic Mentorship & Guidance',
      icon: Compass,
      badge: 'Career & Routine',
      color: 'purple',
      description: 'Holistic mentoring covering daily study routines, subject selection, college choice, and motivation.',
      points: [
        'Personalized daily study schedules',
        'Guidance on overcoming subject phobias',
        'University faculty & career roadmaps',
        'Regular progress tracking'
      ]
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            Our Core Offerings
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0f294a] tracking-tight">
            Comprehensive Tuition & Educational Services
          </h2>
          <p className="mt-3 text-base text-slate-600">
            From foundation school subjects to Dhaka University admission tests, our verified mentors deliver tailored learning experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-blue-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0f294a] mb-2 group-hover:text-blue-700 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {srv.description}
                  </p>

                  <ul className="space-y-2 mb-6 pt-2 border-t border-slate-100">
                    {srv.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      onSelectService(srv.title);
                      openFindTutor();
                    }}
                    className="text-xs font-bold text-[#1e3a8a] hover:text-amber-600 flex items-center gap-1 group/btn cursor-pointer"
                  >
                    <span>Request for {srv.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Dhaka Wide
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
