import React, { useState } from 'react';
import { X, Calendar, User, Mail, Phone, MessageSquare, CheckCircle, GraduationCap, FileText, Compass, Globe, HelpCircle, Send } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPurpose?: string;
}

const PURPOSES = [
  { id: 'scholarships', label: 'Scholarships & Financial Aid', icon: GraduationCap, desc: 'Guidance on fully-funded international & local scholarships' },
  { id: 'profile-building', label: 'Profile Building & Resume', icon: FileText, desc: 'CV review, extracurricular roadmap & personal statement' },
  { id: 'career-guidance', label: 'Career Guidance & Mentorship', icon: Compass, desc: 'University selection, major selection & career pathing' },
  { id: 'virtual-exchange', label: 'Virtual Exchange & Exposure', icon: Globe, desc: 'International youth forums, conferences & exchange programs' },
  { id: 'other', label: 'Other General Inquiry', icon: HelpCircle, desc: 'General queries about YAN initiatives & support' },
];

const TIME_SLOTS = [
  'Flexible / Any Time',
  'Morning (10:00 AM - 1:00 PM)',
  'Afternoon (2:00 PM - 5:00 PM)',
  'Evening (6:00 PM - 9:00 PM)',
];

export function ConsultationModal({ isOpen, onClose, initialPurpose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: initialPurpose || 'scholarships',
    timeSlot: 'Flexible / Any Time',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedPurposeObj = PURPOSES.find((p) => p.id === formData.purpose);
    const purposeText = selectedPurposeObj ? selectedPurposeObj.label : formData.purpose;

    const rawMessage = `FREE CONSULTATION REQUEST\nYouth Awareness Network\n\nFull Name: ${formData.name}\nPhone / WhatsApp: ${formData.phone || 'Not provided'}\nEmail: ${formData.email || 'Not provided'}\nPurpose: ${purposeText}\nPreferred Time: ${formData.timeSlot}\n\nDetails & Query:\n${formData.description || 'No additional details provided.'}\n\n---\nSent via YAN Official Website`;

    const whatsappNumber = '923405463601';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(rawMessage)}`;

    window.open(whatsappUrl, '_blank');
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-10 my-auto flex flex-col max-h-[90vh] sm:max-h-[85vh]">
        
        {/* Modal Header */}
        <div className="bg-[#363636] text-white p-4 sm:p-6 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1 font-sans">
            Book a Free Consultation
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed pr-8 sm:pr-10">
            Fill out your details below. You will be redirected directly to WhatsApp (+92 340 5463601) with a pre-filled request.
          </p>
        </div>

        {/* Modal Body */}
        {submitted ? (
          <div className="p-6 sm:p-10 text-center bg-gray-50 flex-1 flex flex-col items-center justify-center">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 border border-green-200">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#1F2937] mb-2 font-sans">
              Redirecting to WhatsApp...
            </h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
              Your consultation details are formatted. Click <strong>Send</strong> in WhatsApp to complete your message to +92 340 5463601.
            </p>
            <a
              href="https://wa.me/923405463601"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors shadow-md"
            >
              <MessageSquare size={18} /> Open WhatsApp Directly
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-y-auto flex-1">
            
            {/* Input Row 1: Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-1 flex items-center gap-1.5 font-sans">
                  <User size={13} className="text-gray-500" /> Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Khan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-gray-300 bg-white text-[#1F2937] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-all placeholder:text-gray-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-1 flex items-center gap-1.5 font-sans">
                  <Phone size={13} className="text-gray-500" /> Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+92 3XX XXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-gray-300 bg-white text-[#1F2937] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-all placeholder:text-gray-400 font-sans"
                />
              </div>
            </div>

            {/* Input Row 2: Email & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-1 flex items-center gap-1.5 font-sans">
                  <Mail size={13} className="text-gray-500" /> Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-gray-300 bg-white text-[#1F2937] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-all placeholder:text-gray-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-1 flex items-center gap-1.5 font-sans">
                  <Calendar size={13} className="text-gray-500" /> Preferred Time Slot
                </label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-gray-300 bg-white text-[#1F2937] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-all font-sans"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Purpose Selector */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-1.5 flex items-center gap-1.5 font-sans">
                Purpose of Consultation <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PURPOSES.map((item) => {
                  const Icon = item.icon;
                  const isSelected = formData.purpose === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, purpose: item.id })}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                        isSelected
                          ? 'border-[#363636] bg-[#363636] text-white shadow-sm'
                          : 'border-gray-200 bg-gray-50/70 hover:bg-gray-100 text-[#1F2937]'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg flex-shrink-0 mt-0.5 ${
                        isSelected ? 'bg-white/15 text-white' : 'bg-white text-[#363636] border border-gray-200'
                      }`}>
                        <Icon size={15} />
                      </div>
                      <div className="min-w-0 flex-1 font-sans">
                        <p className={`font-semibold text-xs sm:text-sm truncate ${isSelected ? 'text-white' : 'text-[#1F2937]'}`}>
                          {item.label}
                        </p>
                        <p className={`text-[11px] leading-tight mt-0.5 line-clamp-1 sm:line-clamp-2 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-1 flex items-center gap-1.5 font-sans">
                <MessageSquare size={13} className="text-gray-500" /> Simple Description / Details <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                placeholder="Briefly describe what advice you need (e.g. I am looking for scholarship guidance or profile building help)..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-gray-300 bg-white text-[#1F2937] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-all resize-none placeholder:text-gray-400 font-sans min-h-[64px] sm:min-h-[76px]"
              />
            </div>

            {/* Form Footer Action */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 border-t border-gray-100 font-sans">
              <p className="text-[11px] sm:text-xs text-gray-500 text-center sm:text-left">
                Direct WhatsApp redirect to <strong>+92 340 5463601</strong>
              </p>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm shadow-md transition-colors"
              >
                <Send size={15} />
                Send Request via WhatsApp
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
