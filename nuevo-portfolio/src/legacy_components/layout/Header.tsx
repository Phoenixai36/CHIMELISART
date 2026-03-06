import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import ScrambleText from '../ScrambleText';
import logo from '../../assets/logo.png';

interface HeaderProps {
  onOpenMenu: () => void;
  onScrollToSection: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenMenu, onScrollToSection }) => {
  const { lang, toggleLang, t } = useLanguage();
  const { cartItems, openCart } = useCart();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getNavLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    const baseClass = "transition-colors uppercase cursor-pointer";
    return `${baseClass} ${isActive ? 'text-[#fbbf24]' : 'text-white hover:text-[#fbbf24]'}`;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm py-4' : 'py-6 bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link
          to="/"
          className="relative group z-50 mix-blend-difference"
        >
          <img src={logo} alt="ChimelisArt Logo" className="h-24 md:h-40 w-auto object-contain transition-transform duration-300 group-hover:scale-105 opacity-95" />
          <div className="absolute inset-0 bg-[#fbbf24] bg-opacity-0 group-hover:bg-opacity-10 blur-xl transition-all duration-500 rounded-full" />
        </Link>

        <nav className="hidden md:flex items-center gap-12 text-sm tracking-[0.15em] font-medium mix-blend-difference z-50">
          <Link
            to="/gallery"
            className={getNavLinkClass('/gallery')}
            title={t.nav.gallery}
            aria-label={t.nav.gallery}
          >
            <ScrambleText text={t.nav.gallery} scrambleSpeed={5} step={5} />
          </Link>
          <Link
            to="/works"
            className={getNavLinkClass('/works')}
            title={t.nav.writings}
            aria-label={t.nav.writings}
          >
            <ScrambleText text={t.nav.writings} scrambleSpeed={5} step={5} />
          </Link>

          <Link
            to="/artist"
            className={getNavLinkClass('/artist')}
            title={t.nav.about}
            aria-label={t.nav.about}
          >
            <ScrambleText text={t.nav.about} scrambleSpeed={5} step={5} />
          </Link>
        </nav>

        <div className="flex items-center gap-6 mix-blend-difference z-50">
          <button
            onClick={toggleLang}
            className="text-xs font-bold border border-white/20 px-3 py-1 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest"
          >
            {lang}
          </button>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="hidden md:flex items-center gap-2 border border-[#fbbf24] px-6 py-2 rounded-none hover:bg-[#fbbf24] hover:text-black transition-all uppercase text-xs tracking-[0.15em]"
              onClick={() => {
                setTimeout(() => {
                  const element = document.getElementById('acquisition');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.nav.acquire}</span>
            </Link>
          </div>

          <button
            onClick={onOpenMenu}
            className="md:hidden text-white"
            aria-label="Open Menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
