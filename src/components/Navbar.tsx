import React, { useState } from 'react';
import { 
  GraduationCap, 
  Menu, 
  X, 
  PhoneCall, 
  MessageCircle, 
  ShieldCheck, 
  Briefcase, 
  Users, 
  PlusCircle, 
  BookOpen, 
  Info, 
  LayoutDashboard
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAdminModal: () => void;
  openFindTutor: () => void;
  openBecomeTutor: () => void;
  activeJobsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openAdminModal,
  openFindTutor,
  openBecomeTutor,
  activeJobsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: GraduationCap },
    { id: 'jobs', label: 'Tuition Jobs', icon: Briefcase, badge: activeJobsCount },
    { id: 'tutors', label: 'Find a Tutor', icon: Users },
    { id: 'become-tutor', label: 'Become a Tutor', icon: PlusCircle },
    { id: 'admission', label: 'Admission & Support', icon: BookOpen },
    { id: 'verification', label: 'Verification', icon: ShieldCheck },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'become-tutor') {
      openBecomeTutor();
    } else {
      setActiveTab(id);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200">
      {/* Top Banner Bar */}
      <div className="bg-[#0b1f3a] text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-medium text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Dhaka University Student & Graduate Tutors
            </span>
            <span className="hidden md:inline-block text-slate-400">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              📍 Central Office: Dhaka University Campus / Nilkhet, Dhaka
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs ml-auto">
            <a 
              href="https://wa.me/8801614599107?text=Hello%20Dhaka%20University%20Tuition%20Media,%20I%20need%20a%20tutor" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp:</span> +880 1614-599107
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href="tel:+8801614599107" 
              className="flex items-center gap-1 hover:text-amber-400 transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Hotline:</span> 01614-599107
            </a>
            <button
              onClick={openAdminModal}
              className="ml-2 bg-slate-800 hover:bg-slate-700 text-amber-300 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 border border-slate-700 transition"
              title="Open Admin Management Panel"
            >
              <LayoutDashboard className="w-3 h-3" />
              Admin Panel
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0f294a] via-[#1e3a8a] to-[#2563eb] flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform duration-200 border border-blue-400/30">
              <GraduationCap className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0f294a]">
                  Dhaka University
                </span>
                <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                  Tutors Media
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 tracking-tight">
                Quality Tutors • Verified Profiles • Better Learning
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-[#1e3a8a] bg-blue-50 font-bold' 
                      : 'text-slate-600 hover:text-[#0f294a] hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#1e3a8a]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-0.5 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full shadow-xs">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#1e3a8a] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={openFindTutor}
              className="bg-[#d97706] hover:bg-[#b45309] text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Request a Tutor</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                    isActive
                      ? 'bg-blue-50 text-[#1e3a8a]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-slate-500" />
                    {item.label}
                  </span>
                  {item.badge !== undefined && (
                    <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      {item.badge} Jobs
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openFindTutor();
              }}
              className="w-full bg-[#d97706] hover:bg-[#b45309] text-white py-3 rounded-lg font-bold text-sm shadow-sm flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Request a Tutor (Parents / Students)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBecomeTutor();
              }}
              className="w-full bg-[#0f294a] hover:bg-[#1e3a8a] text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              Join as a Tutor (DU / University Students)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
