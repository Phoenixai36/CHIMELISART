import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ArtistCard from '../ArtistCard';
import { useLanguage } from '../../contexts/LanguageContext';
import { useArtworks } from '../../hooks/useArtworks';
import { Artwork } from '../../types';
import ScrambleText from '../ScrambleText';

interface GallerySectionProps {
  onArtworkSelect: (artwork: Artwork) => void;
}

const GallerySection: React.FC<GallerySectionProps> = ({ onArtworkSelect }) => {
  const { t, lang } = useLanguage();
  const { artworks: galleryArtworks, loading } = useArtworks();
  const [filter, setFilter] = useState<'all' | 'available' | 'sold' | 'reserved'>('all');

  const filteredGallery = galleryArtworks.filter(art => {
    if (filter === 'all') return true;
    return art.status === filter;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  return (
    <motion.section
      id="gallery"
      className="py-20 md:py-32 px-4 relative z-20 bg-gradient-to-b from-[#1c1917] to-[#0c0a09]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.01 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-heading font-bold mb-4 text-[#fef3c7]"
            >
              <ScrambleText text={t.gallery.title} /> <span className="text-[#fbbf24]"><ScrambleText text={t.gallery.subtitle} delay={500} /></span>
            </motion.h2>
            <div className="w-24 h-1 bg-[#fbbf24]" />
          </div>

          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {(['all', 'available', 'sold', 'reserved'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all whitespace-nowrap ${filter === f
                  ? 'bg-[#fbbf24] text-black border-[#fbbf24]'
                  : 'text-white/50 border-white/10 hover:border-[#fbbf24] hover:text-white'
                  }`}
              >
                {t.gallery.filters[f]}
              </button>
            ))}
          </div>
        </div>


        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fbbf24]"></div>
          </div>
        )}

        {!loading && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {filteredGallery.map((artwork) => (
              <motion.div
                key={artwork.id}
                variants={itemVariants}
                className="transform-gpu will-change-transform"
              >
                <ArtistCard artwork={artwork} onClick={() => onArtworkSelect(artwork)} lang={lang} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default GallerySection;
