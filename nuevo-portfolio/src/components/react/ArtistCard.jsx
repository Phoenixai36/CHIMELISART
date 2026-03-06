/** @jsxImportSource react */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Lock, Ban } from 'lucide-react';
import ScrambleText from './ScrambleText';

const ArtistCard = ({ artwork, onClick, lang }) => {
  const isAvailable = artwork.status === 'available';

  return (
    <motion.div
      className="group relative h-[400px] md:h-[500px] w-full overflow-hidden border-b md:border-r border-white/10 bg-[#1c1917] cursor-pointer rounded-lg md:rounded-none shadow-lg md:shadow-none"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
      {/* SOLD OUT / RESERVED BADGE - Top Right Overlay */}
      {!isAvailable && (
        <div className="absolute top-0 right-0 z-30">
          <div className={`
            px-4 py-2 font-bold uppercase tracking-widest text-xs shadow-lg backdrop-blur-md
            flex items-center gap-2
            ${artwork.status === 'sold'
              ? 'bg-[#ef4444] text-white'
              : 'bg-[#fbbf24] text-black'}
          `}>
            {artwork.status === 'sold' ? <Ban className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
            {lang === 'es' ? (artwork.status === 'sold' ? 'Vendido' : 'Reservado') : (artwork.status === 'sold' ? 'Sold Out' : 'Reserved')}
          </div>
        </div>
      )}

      {/* Image Background with Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={artwork.image}
          alt={artwork.title[lang]}
          className={`h-full w-full object-cover will-change-transform ${!isAvailable ? 'grayscale-[0.8]' : 'sepia-[0.3]'}`}
          variants={{
            rest: { scale: 1, opacity: isAvailable ? 0.7 : 0.5, filter: isAvailable ? 'sepia(30%) grayscale(20%)' : 'grayscale(80%)' },
            hover: { scale: 1.05, opacity: 1, filter: 'sepia(0%) grayscale(0%)' }
          }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-transparent to-transparent opacity-80" />
      </div>

      {/* Overlay Info */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          <span className="text-xs font-mono border border-[#fbbf24]/30 text-[#fef3c7] px-2 py-1 rounded-full backdrop-blur-md bg-black/20">
            {artwork.year} • {artwork.dimensions}
          </span>
          <motion.div
            variants={{
              rest: { opacity: 0, x: 20, y: -20 },
              hover: { opacity: 1, x: 0, y: 0 }
            }}
            className="bg-[#fbbf24] text-black rounded-full p-2 will-change-transform shadow-[0_0_10px_rgba(251,191,36,0.5)]"
          >
            <ArrowUpRight className="w-6 h-6" />
          </motion.div>
        </div>

        <div>
          <div className="overflow-hidden">
            <motion.h3
              className="font-heading text-2xl md:text-3xl font-bold uppercase text-[#fef3c7] will-change-transform leading-tight"
              variants={{
                rest: { y: 0 },
                hover: { y: -5 }
              }}
              transition={{ duration: 0.4 }}
            >
              <ScrambleText text={artwork.title[lang] || artwork.title['es']} delay={100} />
            </motion.h3>
          </div>
          <motion.p
            className="text-sm font-medium uppercase tracking-widest text-[#d97706] mt-2 will-change-transform"
            variants={{
              rest: { opacity: 0, y: 10 },
              hover: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {artwork.technique[lang] || artwork.technique['es']}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
