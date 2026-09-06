import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { MissionSection } from './components/MissionSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { JoinSection } from './components/JoinSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

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

  useEffect(() => {
    const checkUrlForConsultation = () => {
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
    };

    checkUrlForConsultation();
    window.addEventListener('hashchange', checkUrlForConsultation);
    window.addEventListener('popstate', checkUrlForConsultation);

    return () => {
      window.removeEventListener('hashchange', checkUrlForConsultation);
      window.removeEventListener('popstate', checkUrlForConsultation);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'mission', 'activities', 'join', 'contact'];
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
        <ActivitiesSection />
        <JoinSection onContactClick={() => scrollToSection('contact')} />
        <ContactSection />
      </main>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={handleCloseConsultation}
      />
    </div>
  );
}