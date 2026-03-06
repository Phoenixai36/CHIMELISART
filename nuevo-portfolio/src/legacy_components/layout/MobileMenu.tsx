import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from '../../assets/logo.png';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToSection: (id: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onScrollToSection }) => {
  const { lang, toggleLang, t } = useLanguage();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      className="fixed inset-0 z-[60] bg-[#1c1917] flex flex-col justify-center items-center gap-8"
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-white/50 hover:text-white"
        aria-label="Close Menu"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="mb-4">
        <img src={logo} alt="ChimelisArt Logo" className="h-32 w-auto object-contain" />
      </div>

      <Link to="/" onClick={onClose} className="text-3xl font-heading font-bold hover:text-[#fbbf24]">
        Home
      </Link>
      <Link to="/gallery" onClick={onClose} className="text-3xl font-heading font-bold hover:text-[#fbbf24]">
        {t.nav.gallery}
      </Link>
      <Link to="/works" onClick={onClose} className="text-3xl font-heading font-bold hover:text-[#fbbf24]">
        {t.nav.writings}
      </Link>
      <button onClick={() => { onScrollToSection('artist'); onClose(); }} className="text-3xl font-heading font-bold hover:text-[#fbbf24]">
        {t.nav.about}
      </button>

      <div className="mt-8 flex gap-4">
        <button onClick={toggleLang} className="text-xl font-bold border border-white/20 px-4 py-2">{lang === 'es' ? 'EN' : 'ES'}</button>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
