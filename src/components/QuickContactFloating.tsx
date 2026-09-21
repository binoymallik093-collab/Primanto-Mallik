import React from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

interface QuickContactFloatingProps {
  openFindTutor: () => void;
}

export const QuickContactFloating: React.FC<QuickContactFloatingProps> = ({ openFindTutor }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="w-9 h-9 rounded-full bg-white/90 text-slate-600 hover:text-slate-900 border border-slate-200 shadow-md flex items-center justify-center transition-transform hover:-translate-y-0.5 cursor-pointer"
        title="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Direct Phone Call */}
      <a
        href="tel:+8801614599107"
        className="hidden sm:flex items-center gap-2 bg-[#0f294a] text-white py-2 px-3.5 rounded-full shadow-lg hover:bg-[#1e3a8a] transition-all hover:scale-105 border border-blue-400/30 text-xs font-bold"
        title="Call Hotline"
      >
        <Phone className="w-4 h-4 text-amber-300" />
        <span>01614-599107</span>
      </a>

      {/* WhatsApp Direct Chat */}
      <a
        href="https://wa.me/8801614599107?text=Hello%20Dhaka%20University%20Tuition%20Media,%20I%20am%20looking%20for%20a%20tutor."
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 bg-[#25D366] text-white py-2.5 px-4 rounded-full shadow-xl hover:bg-[#20ba59] transition-all hover:scale-105 border border-emerald-400 text-xs sm:text-sm font-bold animate-bounce duration-1000"
        title="Chat on WhatsApp with Coordinator"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">WhatsApp Help</span>
      </a>
    </div>
  );
};
