import { Instagram, Facebook, Linkedin } from 'lucide-react';
import logo from '../../assets/logo.png';



const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0c0a09] py-12 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <img src={logo} alt="ChimelisArt Logo" className="h-20 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="text-white/30 text-xs font-mono">
          © FRANCESC CHIMELIS. ALL RIGHTS RESERVED.
        </div>

        <div className="flex gap-6">
          <a href="https://www.instagram.com/chimelisart/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#fbbf24] transition-colors" aria-label="Instagram">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100070496588011&locale=es_ES" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#fbbf24] transition-colors" aria-label="Facebook">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/francesc-chimelis-03543263/?originalSubdomain=es" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#fbbf24] transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
