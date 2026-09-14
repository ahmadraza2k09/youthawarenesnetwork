import { Globe, Compass, MessageCircle, FileCheck, ExternalLink, GraduationCap, FileText, Layers, BookOpen, ArrowUpRight, CheckCircle2, Mail, Send } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

interface InitiativesSectionProps {
  onBookConsultation?: () => void;
  onOpenWebsiteRequest?: () => void;
}

const TARGET_EMAIL = 'youthawarenessnetwork@gmail.com';
const TARGET_WHATSAPP = '923405463601';

const DEFAULT_WEBSITE_MSG = `WEBSITE REQUEST FOR INSTITUTION
Youth Awareness Network - Digitizing Institutions Initiative

Hello YAN Team,

I am writing to request a free website for our school / NGO / organization.

Institution Name: [Name of your School or NGO]
Type: [School / College / NGO / Community Group]
Location: [City, Country]
Contact Person: [Your Name]
Phone / WhatsApp: [Your Phone Number]

We would love to connect with YAN to discuss setting up our official website.

---
Sent via YAN Official Website (${TARGET_EMAIL})`;

const DEFAULT_CONSULTATION_MSG = `FREE CONSULTATION REQUEST
Youth Awareness Network

Hello YAN Team,

I would like to book a free 1-on-1 consultation session for guidance.

Name: [Your Name]
Topic of Interest: [Scholarships / Profile Building / Career Guidance / Virtual Exchange / Other]
Preferred Time: [Morning / Afternoon / Evening / Flexible]

Please let me know the available time slots.

---
Sent via YAN Official Website (${TARGET_EMAIL})`;

export function InitiativesSection({ onBookConsultation, onOpenWebsiteRequest }: InitiativesSectionProps) {
  const websiteEmailLink = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent('Website Request for School / NGO / Organization')}&body=${encodeURIComponent(DEFAULT_WEBSITE_MSG)}`;
  const websiteWhatsAppLink = `https://wa.me/${TARGET_WHATSAPP}?text=${encodeURIComponent(DEFAULT_WEBSITE_MSG)}`;

  const consultationEmailLink = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent('Free Consultation Session Request')}&body=${encodeURIComponent(DEFAULT_CONSULTATION_MSG)}`;

  return (
    <section id="initiatives" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Empowering Youth"
          title="Our Initiatives"
          subtitle="Free digital services, interactive platforms, and mentorship empowering youth worldwide."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
          {/* Initiative 1: Digitizing Institutions Globally */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#363636]/5 rounded-bl-full pointer-events-none transition-transform duration-300 group-hover:scale-110" />
            
            <div>
              <div className="mb-5 flex items-center justify-between">
                <div className="bg-[#363636] p-3.5 sm:p-4 rounded-xl text-white shadow-sm inline-block">
                  <Globe size={26} />
                </div>
                <span className="inline-flex items-center gap-1 bg-[#363636]/10 text-[#363636] text-xs font-bold px-3 py-1.5 rounded-full">
                  Get Free Website
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] mb-2.5">
                Digitizing Institutions Globally
              </h3>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                Free websites and digital services to underserved educational institutes and growing NGOs. Over 10 websites provided so far in Pakistan.
              </p>

              {/* Theme-styled Callout Box for Website Request */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 sm:p-4 mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-1 flex items-center gap-1.5">
                  <Globe size={14} className="text-[#363636]" />
                  Get a Website for Your School, NGO or Organization
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  A ready-made request message will be generated automatically for instant submission via Email or WhatsApp!
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={onOpenWebsiteRequest}
                    className="inline-flex items-center gap-1.5 bg-[#363636] hover:bg-[#4a4a4a] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    Customize & Request
                  </button>
                  <a
                    href={websiteEmailLink}
                    className="inline-flex items-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-[#1F2937] text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    <Mail size={13} className="text-[#363636]" /> Email Request
                  </a>
                  <a
                    href={websiteWhatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    <Send size={13} /> WhatsApp Request
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 sm:p-4 mb-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#363636]">
                  <Layers size={14} className="text-[#363636]" />
                  Key Digital Services
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#363636] flex-shrink-0" /> Free website development
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#363636] flex-shrink-0" /> NGO & school portals
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#363636] flex-shrink-0" /> Mobile responsive design
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#363636] flex-shrink-0" /> Technical setup & support
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={onOpenWebsiteRequest}
                className="inline-flex items-center justify-center gap-2 flex-1 bg-[#363636] hover:bg-[#4a4a4a] text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors shadow-sm"
              >
                <span>Request Institution Website</span>
                <Globe size={16} />
              </button>
              <a
                href="https://drive.google.com/file/d/1W2CI5mH99sAbWXcp4_vDMko6m0Qi4mL2/view"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-[#363636] font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors"
              >
                <span>Overview PDF</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Initiative 2: SDGs Explorer */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#363636]/5 rounded-bl-full pointer-events-none transition-transform duration-300 group-hover:scale-110" />

            <div>
              <div className="mb-5">
                <div className="bg-[#363636] p-3.5 sm:p-4 rounded-xl text-white shadow-sm inline-block">
                  <Compass size={26} />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] mb-2.5">
                SDGs Explorer
              </h3>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                An interactive digital platform designed to explore and learn about the United Nations Sustainable Development Goals easily.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 sm:p-4 mb-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#363636]">
                  <BookOpen size={14} className="text-[#363636]" />
                  Key Features
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#363636] flex-shrink-0" /> Interactive SDG modules
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#363636] flex-shrink-0" /> UN Goal awareness
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#363636] flex-shrink-0" /> Educational resources
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#363636] flex-shrink-0" /> Free & open access
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <a
                href="https://sdgexplorer.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#363636] hover:bg-[#4a4a4a] text-white font-semibold py-3 px-5 sm:py-3.5 sm:px-6 rounded-xl text-sm transition-colors shadow-sm"
              >
                <span>Visit SDGs Explorer</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          {/* Initiative 3: Free Consulting & Awareness Sessions */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#363636]/5 rounded-bl-full pointer-events-none transition-transform duration-300 group-hover:scale-110" />

            <div>
              <div className="mb-5">
                <div className="bg-[#363636] p-3.5 sm:p-4 rounded-xl text-white shadow-sm inline-block">
                  <MessageCircle size={26} />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] mb-2.5">
                Free Consulting & Awareness Sessions
              </h3>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                Free 1 on 1 sessions offering personalized guidance on scholarships, resumes, career paths, and virtual exchange programs. Ready-made requests available via Email and WhatsApp.
              </p>

              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                  Available Topics for Booking:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Scholarships & Financial Aid',
                    'Profile Building & Resume',
                    'Career Guidance & Mentorship',
                    'Virtual Exchange & Exposure',
                    'Other General Inquiry',
                  ].map((topic) => (
                    <div
                      key={topic}
                      className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 flex items-center gap-2"
                    >
                      <GraduationCap size={14} className="text-[#363636] flex-shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={onBookConsultation}
                className="inline-flex items-center justify-center gap-2 flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors shadow-sm"
              >
                <MessageCircle size={16} />
                <span>Book Free Session</span>
              </button>
              <a
                href={consultationEmailLink}
                className="inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-[#363636] font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors"
              >
                <Mail size={16} />
                <span>Email Booking</span>
              </a>
            </div>
          </div>

          {/* Initiative 4: Ready To Apply */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#363636]/5 rounded-bl-full pointer-events-none transition-transform duration-300 group-hover:scale-110" />

            <div>
              <div className="mb-5">
                <div className="bg-[#363636] p-3.5 sm:p-4 rounded-xl text-white shadow-sm inline-block">
                  <FileCheck size={26} />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] mb-2.5">
                Ready To Apply
              </h3>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                A free practice platform for students seeking opportunities abroad to draft applications, essays, financial aid forms, and personal statements.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 sm:p-4 mb-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#363636]">
                  <FileText size={14} className="text-[#363636]" />
                  What You Can Practice:
                </div>
                <ul className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#363636] flex-shrink-0" /> Admission Essays
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#363636] flex-shrink-0" /> Financial Aid Forms
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#363636] flex-shrink-0" /> Personal Statements
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#363636] flex-shrink-0" /> Honours & Awards
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <a
                href="https://readytoapply.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#363636] hover:bg-[#4a4a4a] text-white font-semibold py-3 px-5 sm:py-3.5 sm:px-6 rounded-xl text-sm transition-colors shadow-sm"
              >
                <span>Visit Ready To Apply</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#363636] text-white rounded-2xl p-6 sm:p-8 text-center shadow-sm flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6">
          <div className="text-left max-w-2xl">
            <h4 className="text-lg sm:text-xl font-bold mb-1">Need a website or digital support for your school or NGO?</h4>
            <p className="text-gray-300 text-xs sm:text-sm">
              We collaborate with underserved schools and NGOs to provide free websites and digital resources. Send a ready-made request via Email or WhatsApp.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
            <button
              onClick={onOpenWebsiteRequest}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#363636] hover:bg-gray-100 font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm transition-colors whitespace-nowrap shadow-md"
            >
              <Globe size={16} /> Get Institution Website
            </button>
            <button
              onClick={onBookConsultation}
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm transition-colors whitespace-nowrap shadow-md"
            >
              <MessageCircle size={16} /> Book Free Session
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
