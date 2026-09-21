import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Facebook, 
  Send, 
  CheckCircle2, 
  PlusCircle, 
  Clock,
  Sparkles
} from 'lucide-react';

interface ContactSectionProps {
  openFindTutor: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ openFindTutor }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setMessage('');
    }, 3000);
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0f294a] tracking-tight">
            Contact Dhaka University Tuition Media
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Have questions about finding a tutor, fee structures, or tutor verification? Reach our academic coordinators anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#0f294a]">
                Direct Channels
              </h3>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block">Official Hotline</span>
                    <a href="tel:+8801614599107" className="text-sm font-bold text-slate-900 hover:text-blue-700">
                      +880 1614-599107
                    </a>
                    <span className="text-[11px] text-slate-500 block">Available 9:00 AM - 10:00 PM</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block">Instant WhatsApp</span>
                    <a 
                      href="https://wa.me/8801614599107?text=Hello%20Dhaka%20University%20Tuition%20Media,%20I%20need%20assistance."
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-bold text-emerald-700 hover:underline"
                    >
                      +880 1614-599107
                    </a>
                    <span className="text-[11px] text-slate-500 block">Fastest response for tutor CVs</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block">Official Email</span>
                    <a href="mailto:dutuitionmedia@gmail.com" className="text-sm font-bold text-slate-900 hover:text-blue-700">
                      dutuitionmedia@gmail.com
                    </a>
                    <span className="text-[11px] text-slate-500 block">For parent inquiries & partnerships</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block">Office Location</span>
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      Dhaka University Campus / Nilkhet, Shahbagh, Dhaka-1000, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Button Group from Section 12 */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
              <a
                href="tel:+8801614599107"
                className="bg-[#0f294a] hover:bg-[#1e3a8a] text-white py-2.5 px-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>

              <a
                href="https://wa.me/8801614599107?text=Hello%20DU%20Tuition%20Media,%20I%20need%20a%20tutor."
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>

              <button
                onClick={openFindTutor}
                className="bg-[#d97706] hover:bg-[#b45309] text-white py-2.5 px-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Request Tutor</span>
              </button>
            </div>
          </div>

          {/* Quick Inquiry Message Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#0f294a]">
                Send an Instant Academic Inquiry
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Drop your phone number and question; our media team will call or WhatsApp you within 30 minutes.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-900">Inquiry Received!</h4>
                <p className="text-xs text-emerald-800">
                  Our Dhaka University tuition coordinator will call or message your number shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sultana Razia"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Question or Specific Tuition Requirement *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what class, subject, or area you are inquiring about..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-blue-800" />
                    <span>Average reply time: under 30 minutes</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#0f294a] hover:bg-[#1e3a8a] text-white font-bold px-7 py-3 rounded-xl text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
