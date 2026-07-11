import { Heart, Lightbulb, Mail, MessageCircle, MapPin, Linkedin, Instagram, Facebook, Youtube, Link } from 'lucide-react';
import logoImage from '../../assets/826164d80fd732187bfaf088c09dae7c138832fd.png';

const SOCIAL_LINKS = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/youthawarenessnetwork/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/youthawarenessnetwork', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/Youthwarenessnetwork/', label: 'Facebook' },
  { icon: Youtube, href: 'https://www.youtube.com/@youthawarenessnetwork', label: 'YouTube' },
  { icon: Link, href: 'https://linktr.ee/youthawarenessnetwork', label: 'Linktree' },
];

const QUICK_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'mission', label: 'Mission' },
  { id: 'activities', label: 'Activities' },
  { id: 'join', label: 'Join Us' },
  { id: 'contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="bg-[#2a2a2a] text-white py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={logoImage} alt="YAN Logo" className="h-11 w-auto" />
              <span className="font-bold text-xl">Youth Awareness Network</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-3">
              Empowering Youth with Knowledge, Skills, and Responsibility
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm italic mb-6">
              <Lightbulb size={18} />
              <p>Building informed minds, transforming societies</p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-3">Connect with us:</p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="bg-white/10 p-2.5 rounded-lg border border-white/10 hover:bg-white hover:border-white transition-colors group"
                    >
                      <Icon className="text-white group-hover:text-[#363636] transition-colors" size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-5">Quick Links</h3>
            <ul className="space-y-3 text-gray-300">
              {QUICK_LINKS.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-5">Get in Touch</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <Mail size={18} className="flex-shrink-0 mt-1" />
                <a href="mailto:youthawarenessnetwork@gmail.com" className="hover:text-white transition-colors break-words">
                  youthawarenessnetwork@<wbr />gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={18} className="flex-shrink-0" />
                <a href="https://wa.me/923405463601" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +92 340 5463601
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="flex-shrink-0" />
                <span>Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-gray-300 text-sm">
            <div className="flex items-center gap-2">
              <Lightbulb className="text-white" size={16} />
              <p>We believe informed youth can build a better society</p>
            </div>
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <Heart className="text-red-500" size={14} fill="currentColor" />
              <span>by Youth Awareness Network</span>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-4 text-xs">
            © {new Date().getFullYear()} Youth Awareness Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}