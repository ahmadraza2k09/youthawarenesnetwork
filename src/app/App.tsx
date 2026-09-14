import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { MissionSection } from './components/MissionSection';
import { InitiativesSection } from './components/InitiativesSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { JoinSection } from './components/JoinSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { WebsiteRequestModal } from './components/WebsiteRequestModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isWebsiteModalOpen, setIsWebsiteModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleOpenConsultation = () => {
    if (window.location.hash !== '#consultation') {
      window.history.pushState(null, '', '#consultation');
    }
    setIsConsultationModalOpen(true);
  };

  const handleCloseConsultation = () => {
    if (window.location.hash === '#consultation' || window.location.hash === '#book-consultation') {
      window.history.pushState(null, '', window.location.pathname);
    }
    setIsConsultationModalOpen(false);
  };

  const handleOpenWebsiteRequest = () => {
    if (window.location.hash !== '#website-request') {
      window.history.pushState(null, '', '#website-request');
    }
    setIsWebsiteModalOpen(true);
  };

  const handleCloseWebsiteRequest = () => {
    if (window.location.hash === '#website-request' || window.location.hash === '#request-website') {
      window.history.pushState(null, '', window.location.pathname);
    }
    setIsWebsiteModalOpen(false);
  };

  useEffect(() => {
    const checkUrlForModals = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();

      if (
        hash === '#consultation' ||
        hash === '#book-consultation' ||
        search.includes('consultation=true') ||
        pathname.endsWith('/consultation')
      ) {
        setIsConsultationModalOpen(true);
      }

      if (
        hash === '#website-request' ||
        hash === '#request-website' ||
        search.includes('website=true') ||
        pathname.endsWith('/website-request')
      ) {
        setIsWebsiteModalOpen(true);
      }
    };

    checkUrlForModals();
    window.addEventListener('hashchange', checkUrlForModals);
    window.addEventListener('popstate', checkUrlForModals);

    return () => {
      window.removeEventListener('hashchange', checkUrlForModals);
      window.removeEventListener('popstate', checkUrlForModals);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'mission', 'initiatives', 'activities', 'join', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1F2937] font-sans">
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onBookConsultation={handleOpenConsultation}
      />

      <main>
        <HeroSection
          onJoinClick={() => scrollToSection('join')}
          onBookConsultation={handleOpenConsultation}
        />
        <AboutSection />
        <MissionSection />
        <InitiativesSection
          onBookConsultation={handleOpenConsultation}
          onOpenWebsiteRequest={handleOpenWebsiteRequest}
        />
        <ActivitiesSection />
        <JoinSection onContactClick={() => scrollToSection('contact')} />
        <ContactSection />
      </main>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={handleCloseConsultation}
      />

      <WebsiteRequestModal
        isOpen={isWebsiteModalOpen}
        onClose={handleCloseWebsiteRequest}
      />
    </div>
  );
}