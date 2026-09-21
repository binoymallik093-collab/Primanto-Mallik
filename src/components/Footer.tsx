import React from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { DHAKA_AREAS } from '../data/initialData';

interface FooterProps {
  onNavigate: (tab: any) => void;
  openFindTutor: () => void;
  openBecomeTutor: () => void;
  openAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  openFindTutor,
  openBecomeTutor,
  openAdmin
}) => {
  return (
    <footer className="bg-[#0b1b32] text-slate-300 border-t border-blue-950">
      {/* Top CTA Banner */}
      <div className="border-b border-blue-900/60 py-10 bg-gradient-to-r from-[#0f294a] via-[#163761] to-[#0f294a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Ready to find an authentic Dhaka University Tutor?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200">
              Personalized matching within 24 hours. Includes a 100% free trial class.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={openFindTutor}
              className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              Request a Tutor
            </button>
            <button
              onClick={openBecomeTutor}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm border border-white/20 transition cursor-pointer"
            >
              Join as a Tutor
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-[#0f294a] border border-blue-400/30 flex items-center justify-center text-amber-300 font-bold shadow-inner">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block">
                  Dhaka University
                </span>
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
                  Tuition & Tutors Media
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An educational platform connecting students and parents with qualified, responsible, and background-verified tutors from the University of Dhaka and leading institutions.
            </p>

            <div className="text-xs text-slate-300 space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Dhaka University Campus / Nilkhet, Dhaka-1000</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+8801614599107" className="hover:text-white">
                  +880 1614-599107
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:dutuitionmedia@gmail.com" className="hover:text-white">
                  dutuitionmedia@gmail.com
                </a>
              </div>
            </div>

            {/* Social Media Links (Section 16) */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-blue-900/60 hover:bg-blue-600 text-slate-200 hover:text-white flex items-center justify-center transition"
                title="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-red-900/60 hover:bg-red-600 text-slate-200 hover:text-white flex items-center justify-center transition"
                title="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-pink-900/60 hover:bg-pink-600 text-slate-200 hover:text-white flex items-center justify-center transition"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-blue-800/60 hover:bg-blue-500 text-slate-200 hover:text-white flex items-center justify-center transition"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition cursor-pointer">
                  Home & Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tutors')} className="hover:text-white transition cursor-pointer">
                  Browse Tutors Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-white transition cursor-pointer">
                  Tuition Jobs Board
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admission')} className="hover:text-white transition cursor-pointer">
                  University Admission Prep
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('verification')} className="hover:text-white transition cursor-pointer">
                  6-Step Verification System
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition cursor-pointer">
                  About Us & Vision
                </button>
              </li>
            </ul>
          </div>

          {/* Target Levels */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Tuition Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={openFindTutor} className="hover:text-white transition cursor-pointer text-left">
                  Class 6 - 8 Foundation
                </button>
              </li>
              <li>
                <button onClick={openFindTutor} className="hover:text-white transition cursor-pointer text-left">
                  Class 9 & 10 (SSC Prep)
                </button>
              </li>
              <li>
                <button onClick={openFindTutor} className="hover:text-white transition cursor-pointer text-left">
                  HSC 1st & 2nd Year (All Groups)
                </button>
              </li>
              <li>
                <button onClick={openFindTutor} className="hover:text-white transition cursor-pointer text-left">
                  DU Ka / Kha / Ga Units
                </button>
              </li>
              <li>
                <button onClick={openFindTutor} className="hover:text-white transition cursor-pointer text-left">
                  IBA / BBA Admission
                </button>
              </li>
              <li>
                <button onClick={openFindTutor} className="hover:text-white transition cursor-pointer text-left">
                  BUET & Medical Entrance
                </button>
              </li>
              <li>
                <button onClick={openFindTutor} className="hover:text-white transition cursor-pointer text-left">
                  English Medium (O/A Levels)
                </button>
              </li>
            </ul>
          </div>

          {/* Dhaka Service Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Prime Dhaka Coverage
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {DHAKA_AREAS.filter(a => a !== 'All Dhaka Areas').slice(0, 10).map((area) => (
                <span key={area} className="bg-blue-950/70 text-slate-300 px-2 py-1 rounded border border-blue-900/50">
                  {area}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Home tuition available across all 20+ zones in Dhaka Metropolitan & online nationwide.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dhaka University Tuition & Tutors Media. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Dhaka, Bangladesh</span>
            <span>•</span>
            <button
              onClick={openAdmin}
              className="text-slate-400 hover:text-amber-400 font-bold transition cursor-pointer"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
