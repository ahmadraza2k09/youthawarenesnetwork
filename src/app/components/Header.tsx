import { Menu, X, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import logoImage from '../../assets/logo.png';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onBookConsultation: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'mission', label: 'Mission' },
  { id: 'activities', label: 'Activities' },
  { id: 'contact', label: 'Contact' },
];

export function Header({ activeSection, onNavigate, onBookConsultation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`bg-[#363636] text-white sticky top-0 z-50 transition-shadow duration-200 ${
        scrolled ? 'shadow-lg py-3' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center gap-6">
          <button onClick={() => handleNavClick('home')} className="flex items-center gap-3">
            <img src={logoImage} alt="YAN Logo" className="h-4.5 md:h-5 w-auto object-contain" />
            <span className="font-semibold text-lg tracking-wide hidden sm:inline">
              Youth Awareness Network
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-white text-[#363636]'
                    : 'text-gray-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onBookConsultation}
              className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <MessageCircle size={16} /> Book Consultation
            </button>
            <button
              onClick={() => handleNavClick('join')}
              className="ml-2 px-5 py-2 rounded-lg text-sm font-semibold bg-white text-[#363636] hover:bg-gray-100 transition-colors"
            >
              Join Us
            </button>
          </nav>

          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1 pt-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookConsultation();
              }}
              className="px-4 py-3 rounded-lg text-left text-sm font-semibold bg-[#25D366] text-white flex items-center gap-2 mb-1"
            >
              <MessageCircle size={18} /> Book Consultation
            </button>
            {[...NAV_ITEMS, { id: 'join', label: 'Join Us' }].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-white text-[#363636]'
                    : 'text-gray-200 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
