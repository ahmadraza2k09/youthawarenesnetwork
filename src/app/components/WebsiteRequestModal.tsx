import React, { useState } from 'react';
import { X, Building2, User, Mail, Phone, MapPin, MessageSquare, CheckCircle, Send, Globe, Layers } from 'lucide-react';

interface WebsiteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
}

const ORGANIZATION_TYPES = [
  'Small Business',
  'Educational Institution (School / College / Institute)',
  'Hospital / Clinic / Healthcare Center',
  'NGO / Community Organization',
  'Youth Group / Club',
  'Other Organization',
];

const DIGITAL_SERVICES = [
  'Free Website Development',
  'Customized Management Systems',
  'Responsive Design and Digital Solutions',
  'Technical Setup and Support',
  'Complete Digital Package (Website + System)',
  'Other Digital Service',
];

const TARGET_EMAIL = 'youthawarenessnetwork@gmail.com';
const TARGET_WHATSAPP = '923405463601';

export function WebsiteRequestModal({ isOpen, onClose, initialType }: WebsiteRequestModalProps) {
  const [formData, setFormData] = useState({
    orgName: '',
    orgType: initialType || 'Small Business',
    location: '',
    contactName: '',
    email: '',
    phone: '',
    service: 'Free Website Development',
    details: '',
  });

  const [lastAction, setLastAction] = useState<'email' | 'whatsapp' | null>(null);

  if (!isOpen) return null;

  const generateMessage = () => {
    return `DIGITAL SOLUTION REQUEST
Youth Awareness Network - Digitizing for All

Organization Name: ${formData.orgName || '[Not Specified]'}
Organization Type: ${formData.orgType}
Location: ${formData.location || 'Not provided'}
Contact Person: ${formData.contactName || '[Not Specified]'}
Email: ${formData.email || 'Not provided'}
Phone / WhatsApp: ${formData.phone || 'Not provided'}
Required Digital Service: ${formData.service}

Brief Description of Requirements:
${formData.details || 'We would like to request digital services for our organization through the YAN Digitizing for All initiative.'}

---
Sent via YAN Official Website (${TARGET_EMAIL})`;
  };

  const getEmailSubject = () => {
    const org = formData.orgName ? ` - ${formData.orgName}` : '';
    return `Digital Solution Request - Digitizing for All${org}`;
  };

  const handleSendEmail = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const message = generateMessage();
    const subject = getEmailSubject();
    const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
    setLastAction('email');
  };

  const handleSendWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const message = generateMessage();
    const whatsappUrl = `https://wa.me/${TARGET_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setLastAction('whatsapp');
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
        <div className="bg-[#292626] text-white p-4 sm:p-6 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Globe className="text-white/80" size={20} />
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-300">Digitizing for All</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1 font-sans">
            Request a Digital Solution
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed pr-8 sm:pr-10">
            Free websites, customized management systems, and digital services for small businesses, educational institutions, clinics, and NGOs worldwide. Send instantly via <strong>Email</strong> or <strong>WhatsApp</strong>.
          </p>
        </div>

        {/* Modal Body */}
        {lastAction ? (
          <div className="p-6 sm:p-10 text-center bg-gray-50 flex-1 flex flex-col items-center justify-center">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 border border-green-200">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#1F2937] mb-2 font-sans">
              {lastAction === 'email' ? 'Opening Email Client...' : 'Redirecting to WhatsApp...'}
            </h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
              {lastAction === 'email'
                ? 'Your ready-made digital solution request has been pre-filled into your mail application.'
                : 'Your ready-made digital solution request is pre-filled in WhatsApp. Click Send in WhatsApp to complete.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(getEmailSubject())}&body=${encodeURIComponent(generateMessage())}`}
                className="inline-flex items-center justify-center gap-2 bg-[#292626] hover:bg-[#4a4a4a] text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors shadow-md"
              >
                <Mail size={16} /> Open Email
              </a>
              <a
                href={`https://wa.me/${TARGET_WHATSAPP}?text=${encodeURIComponent(generateMessage())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors shadow-md"
              >
                <MessageSquare size={16} /> Open WhatsApp
              </a>
              <button
                onClick={() => setLastAction(null)}
                className="inline-flex items-center justify-center gap-1.5 bg-gray-200 hover:bg-gray-300 text-[#1F2937] font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors"
              >
                Edit Details
              </button>
            </div>
          </div>
        ) : (
          <form className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-y-auto flex-1">
            
            {/* Eligible Organizations Note */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-600">
              <span className="font-semibold text-[#1F2937]">Eligible Organizations:</span> Small Businesses · Educational Institutions · Hospitals and Clinics · NGOs and Community Organizations
            </div>

            {/* Input Row 1: Org Name & Org Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-1 flex items-center gap-1.5 font-sans">
                  <Building2 size={13} className="text-gray-500" /> Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Clinic / Hope Grammar School / Al-Khidmat"
                  value={formData.orgName}
                  onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-gray-300 bg-white text-[#1F2937] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-all placeholder:text-gray-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-1 flex items-center gap-1.5 font-sans">
                  <Globe size={13} className="text-gray-500" /> Organization Type
                </label>
                <select
                  value={formData.orgType}
                  onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-gray-300 bg-white text-[#1F2937] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-all font-sans"
                >
                  {ORGANIZATION_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Input Row 2: Contact Person & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-1 flex items-center gap-1.5 font-sans">
                  <User size={13} className="text-gray-500" /> Contact Person <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Your Name / Designation"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-gray-300 bg-white text-[#1F2937] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-all placeholder:text-gray-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-1 flex items-center gap-1.5 font-sans">
                  <MapPin size={13} className="text-gray-500" /> Location / City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lahore, Pakistan or Country"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-gray-300 bg-white text-[#1F2937] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-all placeholder:text-gray-400 font-sans"
                />
              </div>
            </div>

            {/* Input Row 3: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-1 flex items-center gap-1.5 font-sans">
                  <Mail size={13} className="text-gray-500" /> Email Address
                </label>
                <input
                  type="email"
                  placeholder="organization@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-gray-300 bg-white text-[#1F2937] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-all placeholder:text-gray-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-1 flex items-center gap-1.5 font-sans">
                  <Phone size={13} className="text-gray-500" /> Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+92 3XX XXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-gray-300 bg-white text-[#1F2937] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-all placeholder:text-gray-400 font-sans"
                />
              </div>
            </div>

            {/* Input Row 4: Required Digital Service */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-1 flex items-center gap-1.5 font-sans">
                <Layers size={13} className="text-gray-500" /> Required Digital Service <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-gray-300 bg-white text-[#1F2937] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-all font-sans"
              >
                {DIGITAL_SERVICES.map((srv) => (
                  <option key={srv} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-1 flex items-center gap-1.5 font-sans">
                <MessageSquare size={13} className="text-gray-500" /> Brief Description of Requirements
              </label>
              <textarea
                rows={2}
                placeholder="Describe what your organization needs (website features, management system modules, or digital assistance)..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-gray-300 bg-white text-[#1F2937] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-all resize-none placeholder:text-gray-400 font-sans min-h-[64px]"
              />
            </div>

            {/* Form Actions: Send via Email OR WhatsApp */}
            <div className="pt-2 sm:pt-3 border-t border-gray-100 font-sans space-y-2">
              <p className="text-[11px] sm:text-xs text-gray-500 text-center sm:text-left">
                Send request via Email or WhatsApp:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="inline-flex items-center justify-center gap-2 bg-[#292626] hover:bg-[#4a4a4a] text-white font-semibold px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm shadow-md transition-colors"
                >
                  <Mail size={16} />
                  Send via Email
                </button>
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm shadow-md transition-colors"
                >
                  <Send size={16} />
                  Send via WhatsApp
                </button>
              </div>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
