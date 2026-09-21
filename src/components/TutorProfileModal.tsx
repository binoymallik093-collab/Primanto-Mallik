import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Star, 
  MapPin, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  Phone, 
  Mail, 
  CheckCircle, 
  DollarSign, 
  MessageSquare,
  Award,
  Building,
  User
} from 'lucide-react';
import { Tutor } from '../types';

interface TutorProfileModalProps {
  tutor: Tutor | null;
  onClose: () => void;
  onRequestTutor: (tutor: Tutor) => void;
}

export const TutorProfileModal: React.FC<TutorProfileModalProps> = ({
  tutor,
  onClose,
  onRequestTutor
}) => {
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewName, setNewReviewName] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!tutor) return null;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    tutor.reviews.unshift({
      id: `rev-${Date.now()}`,
      reviewerName: newReviewName,
      reviewerRole: 'Parent',
      studentClass: 'Student',
      rating: newReviewRating,
      comment: newReviewComment,
      date: 'Just now',
      area: 'Dhaka'
    });
    tutor.reviewsCount += 1;

    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setNewReviewName('');
      setNewReviewComment('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150 my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header Banner */}
        <div className="bg-gradient-to-r from-[#0f294a] via-[#1e3a8a] to-[#2563eb] text-white p-6 sm:p-8 relative rounded-t-3xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative">
              <img
                src={tutor.avatar}
                alt={tutor.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white/90 shadow-lg"
              />
              {tutor.verified && (
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-md border-2 border-white" title="Verified DU Profile">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-2xl font-black text-white">{tutor.name}</h3>
              </div>

              {/* 3-Tier Verification Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                {tutor.isIdentityVerified && (
                  <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                    <span>🟢</span> Identity Verified (NID)
                  </span>
                )}
                {tutor.isAcademicVerified && (
                  <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-200 border border-blue-400/40 text-[11px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                    <span>🔵</span> Academic Verified (DU)
                  </span>
                )}
                {tutor.isPlatformVerified && (
                  <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                    <span>⭐</span> Platform Verified
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-amber-300 flex items-center justify-center sm:justify-start gap-1.5">
                <GraduationCap className="w-4 h-4" />
                {tutor.degree}, {tutor.department}
              </p>

              <p className="text-xs text-blue-100 font-medium">
                {tutor.university} {tutor.yearSemester ? `• ${tutor.yearSemester}` : ''}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-slate-200">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <strong>{tutor.rating.toFixed(1)}</strong> ({tutor.reviewsCount} reviews)
                </span>
                <span>•</span>
                <span className="bg-blue-900/60 px-2 py-0.5 rounded text-[11px] font-mono border border-blue-400/30">
                  {tutor.duStudentId || 'ID Verified'}
                </span>
                {tutor.hallName && (
                  <>
                    <span>•</span>
                    <span className="text-[11px] text-blue-200">Hall: {tutor.hallName}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 font-semibold block">Expected Salary</span>
              <span className="text-sm font-bold text-emerald-700">{tutor.expectedSalary}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Teaching Mode</span>
              <span className="text-sm font-bold text-slate-800">{tutor.teachingMode}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-500 font-semibold block">Academic Record</span>
              <span className="text-xs font-bold text-slate-800">SSC: {tutor.sscResult} | HSC: {tutor.hscResult}</span>
            </div>
          </div>

          {/* NID Privacy & Trust Assurance Strip */}
          <div className="bg-emerald-50/60 rounded-xl p-3.5 border border-emerald-200/80 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-emerald-950 block">National ID & DU Student Records Verified</span>
                <span className="text-[11px] text-emerald-800">
                  Govt. Smart NID and Dhaka University department roll checked. NID documents are protected under encrypted admin storage for user privacy.
                </span>
              </div>
            </div>
            <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-white text-emerald-900 border border-emerald-200 font-mono text-[10px] font-bold shrink-0">
              Admin Restricted
            </span>
          </div>

          {/* Short Introduction */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Short Introduction
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-white border border-slate-100 p-4 rounded-xl shadow-xs">
              {tutor.bio}
            </p>
          </div>

          {/* Subjects & Classes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                Subjects Taught
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {tutor.subjects.map((sub, idx) => (
                  <span key={idx} className="bg-white text-slate-800 text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
                Classes & Target Exams
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {tutor.classesTaught.map((cls, idx) => (
                  <span key={idx} className="bg-white text-slate-800 text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                    {cls}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Preferred Teaching Locations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              Preferred Teaching Areas in Dhaka
            </h4>
            <div className="flex flex-wrap gap-2">
              {tutor.preferredAreas.map((area, idx) => (
                <span key={idx} className="bg-blue-50 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-md border border-blue-200">
                  📍 {area}
                </span>
              ))}
            </div>
          </div>

          {/* Teaching Experience */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              Teaching Experience & Proven Track Record
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {tutor.experience}
            </p>
          </div>

          {/* Reviews Section */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-[#0f294a] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-700" />
                Parent & Student Reviews ({tutor.reviews.length})
              </h4>
              <span className="text-xs text-slate-500">Verified student feedback</span>
            </div>

            {tutor.reviews.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No reviews yet for this tutor.</p>
            ) : (
              <div className="space-y-3 mb-6">
                {tutor.reviews.map((rev) => (
                  <div key={rev.id} className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-800">{rev.reviewerName}</span>
                        <span className="text-[10px] text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200 font-medium">
                          {rev.reviewerRole} ({rev.studentClass})
                        </span>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed italic">"{rev.comment}"</p>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                      <span>Area: {rev.area}</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Review Form */}
            <form onSubmit={handleAddReview} className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-2.5">
              <span className="text-xs font-bold text-[#0f294a] block">Leave a Parent/Student Review</span>
              {reviewSubmitted && (
                <div className="text-xs text-emerald-700 bg-emerald-100 p-2 rounded font-semibold">
                  Thank you! Your review has been recorded.
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name (Parent / Student)"
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                />
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5) Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5) Very Good</option>
                  <option value={3}>⭐⭐⭐ (3/5) Average</option>
                </select>
              </div>
              <textarea
                rows={2}
                placeholder="Share your experience with this tutor..."
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
              />
              <button
                type="submit"
                className="text-xs font-bold bg-[#0f294a] text-white px-3 py-1.5 rounded-lg hover:bg-[#1e3a8a] transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Modal Footer / Action */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 rounded-b-3xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            <span>Contact via coordinator hotline: </span>
            <strong className="text-slate-800 font-semibold">+880 1614-599107</strong>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onRequestTutor(tutor);
                onClose();
              }}
              className="w-1/2 sm:w-auto bg-[#d97706] hover:bg-[#b45309] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition"
            >
              Hire / Request This Tutor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
