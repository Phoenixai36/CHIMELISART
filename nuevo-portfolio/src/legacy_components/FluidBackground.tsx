
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const StarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.5 + 0.2
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-[#fbbf24] will-change-[opacity,transform]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            transform: 'translateZ(0)'
          }}
          initial={{ opacity: star.opacity, scale: 1 }}
          animate={{
            opacity: [star.opacity, 0.8, star.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const GeometricShapes = () => {
  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, { stiffness: 40, damping: 20 });

  // Parallax transforms
  const rotateSlow = useTransform(smoothScroll, [0, 5000], [0, 180]);
  const rotateFast = useTransform(smoothScroll, [0, 5000], [0, -360]);

  const yBack = useTransform(smoothScroll, [0, 3000], [0, 600]);
  const yMid = useTransform(smoothScroll, [0, 3000], [0, 300]);
  const yFore = useTransform(smoothScroll, [0, 3000], [0, -200]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* 1. Hero: Abstract Wireframe Triangle */}
      <motion.div
        className="absolute top-[15vh] right-[10vw] w-64 h-64 opacity-[0.03] border border-[#fbbf24] hidden md:block"
        style={{ rotate: rotateSlow, y: yBack }}
      >
        <div className="absolute inset-4 border border-[#fbbf24] opacity-50" />
        <div className="absolute inset-8 border border-[#fbbf24] opacity-50" />
      </motion.div>

      {/* 2. Gallery Area: Floating Cube Stack */}
      <motion.div
        className="absolute top-[120vh] left-[5vw] opacity-[0.04]"
        style={{ y: yFore, rotate: rotateFast }}
      >
        <svg width="250" height="250" viewBox="0 0 100 100" fill="none" stroke="#d97706" strokeWidth="0.5">
          <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" />
          <path d="M50 10 L50 90" />
          <path d="M10 30 L50 50 L90 30" />
          <path d="M10 70 L50 50 L90 70" />
        </svg>
      </motion.div>

      {/* 3. Features Area: Translucent Dodecahedron-ish shape */}
      <motion.div
        className="absolute top-[220vh] right-[15vw] opacity-[0.03]"
        style={{ y: yMid, rotate: rotateSlow }}
      >
        <svg width="300" height="300" viewBox="0 0 100 100" fill="none" stroke="#fbbf24" strokeWidth="0.3">
          <circle cx="50" cy="50" r="40" />
          <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" />
          <path d="M50 50 L50 10 M50 50 L85 30 M50 50 L85 70 M50 50 L50 90 M50 50 L15 70 M50 50 L15 30" />
        </svg>
      </motion.div>

      {/* 4. Footer Area: Large Geometric Net */}
      <motion.div
        className="absolute top-[320vh] left-[20vw] opacity-[0.02]"
        style={{ y: yBack, rotate: rotateFast }}
      >
        <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="#fff" strokeWidth="0.2">
          <rect x="10" y="10" width="80" height="80" />
          <line x1="10" y1="10" x2="90" y2="90" />
          <line x1="90" y1="10" x2="10" y2="90" />
          <circle cx="50" cy="50" r="30" />
        </svg>
      </motion.div>

      {/* Perspective Grid Plane - Spans whole height */}
      <div
        className="absolute inset-0 opacity-[0.03] perspective-grid"
      />
    </div>
  );
};

const FluidBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, { stiffness: 30, damping: 20 });

  // Parallax Offsets for Blobs
  const blobY1 = useTransform(smoothScroll, [0, 4000], [0, 600]);
  const blobY2 = useTransform(smoothScroll, [0, 4000], [0, -400]);
  const blobY3 = useTransform(smoothScroll, [0, 4000], [0, 200]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#1c1917]">
      {/* Deep base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#292524] via-[#1c1917] to-[#0c0a09] opacity-90" />

      {/* Static background image with blur */}
      <motion.div className="absolute inset-0 pointer-events-none transform-gpu">
        <img
          src="/images/hero_bg_surreal.png"
          alt="Surreal Amber Fluid Background"
          className="w-full h-full object-cover transform-gpu"
          style={{ filter: "blur(3px)" }} // Static blur instead of animated
        />
      </motion.div>

      <StarField />
      <GeometricShapes />

      {/* Blob 1: Honey/Gold - Upper Left */}
      <motion.div style={{ y: blobY1 }} className="absolute inset-0 pointer-events-none transform-gpu">
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[90vw] h-[90vw] bg-[#f59e0b] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.05] will-change-transform"
          animate={{
            scale: [1.05, 1.1, 1.05],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Blob 2: Amber/Orange - Middle Right */}
      <motion.div style={{ y: blobY2 }} className="absolute inset-0 pointer-events-none transform-gpu">
        <motion.div
          className="absolute top-[40%] right-[-20%] w-[100vw] h-[80vw] bg-[#d97706] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.08] will-change-transform"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Blob 3: Deep Sienna - Bottom Left */}
      <motion.div style={{ y: blobY3 }} className="absolute inset-0 pointer-events-none transform-gpu">
        <motion.div
          className="absolute bottom-[-10%] left-[10%] w-[80vw] h-[80vw] bg-[#9a3412] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.08] will-change-transform"
          animate={{
            scale: [1, 1.08, 1],
            y: [0, -30, 0],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Texture Overlays */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07] mix-blend-overlay pointer-events-none"></div>

      {/* Radial Vignette for focus */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/60 pointer-events-none" />
    </div>
  );
};

export default FluidBackground;
