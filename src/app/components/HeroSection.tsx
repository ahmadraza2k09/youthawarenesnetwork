import { ArrowRight } from 'lucide-react';
import logoImage from '../../assets/826164d80fd732187bfaf088c09dae7c138832fd.png';

interface HeroSectionProps {
  onJoinClick: () => void;
}

const TRUST_ITEMS = ['Youth-led', 'Free access', 'Global exposure'];

export function HeroSection({ onJoinClick }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-[#363636] to-[#4a4a4a] text-white py-28 px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        <img src={logoImage} alt="YAN Logo" className="h-28 w-auto mx-auto mb-8" />

        <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
          Youth Awareness Network
        </h1>

        <p className="font-accent text-xl md:text-2xl text-gray-100 mb-6">
          Connecting Youth to Opportunities, Knowledge, and Global Exposure
        </p>

        <p className="text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto mb-8">
          We are a youth-led platform committed to providing free access to awareness, guidance, and international opportunities. Our mission is to equip students with the knowledge, exposure, and direction they need to grow beyond limitations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-200 mb-10">
          {TRUST_ITEMS.map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/30">·</span>}
              {item}
            </span>
          ))}
        </div>

        <button
          onClick={onJoinClick}
          className="inline-flex items-center gap-2 bg-white text-[#363636] px-8 py-4 rounded-lg font-semibold text-base hover:bg-gray-100 transition-colors shadow-lg"
        >
          Join Our Movement
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}
