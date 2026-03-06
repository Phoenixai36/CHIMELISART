import React from 'react';
import { motion } from 'framer-motion';
import ThreeDText from '../ui/ThreeDText';
import ScrambleText from '../ScrambleText';
import { useLanguage } from '../../contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-[130vh] flex flex-col items-center justify-center pt-20 md:pt-28 pb-40 overflow-hidden">
      {/* Background Surreal Image & Texture - Vibrational Pulse */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden text-white/10">
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            scale: [1.05, 1.1, 1.05],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img
            src="/images/hero_bg_surreal.png"
            alt="Surreal Amber Fluid Background"
            className="w-full h-full object-cover transform-gpu"
            style={{ filter: "blur(4px)" }}
          />
        </motion.div>

        {/* Pro Texture Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%270%200%20200%20200%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cfilter%20id%3D%27noiseFilter%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.65%27%20numOctaves%3D%273%27%20stitchTiles%3D%27stitch%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url(%23noiseFilter)%27%2F%3E%3C%2Fsvg%3E')]" />

        {/* Gradients to blend - Amber/Obsidian tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1917]/90 via-[#451a03]/30 to-[#1c1917]" />
        <div className="absolute inset-0 bg-[#fbbf24]/10 mix-blend-color-dodge animate-pulse" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 text-center px-4 flex flex-col items-center gap-4 md:gap-6 max-w-7xl mx-auto w-full">
        {/* Main Title - 3D Gold Text */}
        <div className="flex flex-col items-center gap-2 md:gap-4 mt-2 w-full relative z-10">
          <div className="w-full -mt-32 md:-mt-48">
            <ThreeDText text="CHIMELISART" className="max-w-[1400px] mx-auto scale-90 md:scale-100" />
          </div>

          {/* Subheader - Fast Scramble */}
          <motion.h2
            className="text-xl md:text-4xl font-bold text-[#fcd34d] uppercase tracking-[0.2em] md:tracking-[0.5em] font-heading text-center max-w-6xl leading-normal py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            <ScrambleText text={t.hero.subheader} scrambleSpeed={10} step={3} delay={2500} />
          </motion.h2>
        </div>

        {/* Description - Fast Scramble */}
        <div className="max-w-xl md:max-w-2xl mt-4 text-center">
          <p className="text-sm md:text-lg text-white/80 leading-relaxed font-light tracking-wide inline-block">
            <ScrambleText
              text={t.hero.description}
              scrambleSpeed={10}
              delay={3000}
              className="text-center"
              step={5}
            />
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
