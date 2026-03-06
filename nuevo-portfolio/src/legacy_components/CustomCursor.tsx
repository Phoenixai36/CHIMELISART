
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface CustomCursorProps {
  text?: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ text = "Ver" }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Initialize off-screen to prevent flash
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Smooth spring animation
  const springConfig = { damping: 20, stiffness: 350, mass: 0.1 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const clickable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('input') || 
                        target.closest('textarea') ||
                        target.closest('[data-hover="true"]');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  // Create repeating text string for the circular path
  // e.g., "· VER · VER · VER · VER "
  const repeatedText = Array(4).fill(`· ${text} `).join("");

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference flex items-center justify-center hidden md:flex will-change-transform"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      {/* Cursor Body */}
      <motion.div
        className="relative rounded-full flex items-center justify-center shadow-sm overflow-hidden"
        style={{ width: 80, height: 80 }}
        animate={{
          scale: isHovering ? 1 : 0.15, 
          backgroundColor: isHovering ? '#fbbf24' : '#ffffff', 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Rotating Circular Text - Only shows on hover */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovering ? 1 : 0,
            rotate: isHovering ? 360 : 0
          }}
          transition={{ 
            opacity: { duration: 0.2 },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" } 
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Path for text to follow (centered circle) */}
            <path 
              id="cursorCircle" 
              d="M 50, 50 m -28, 0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0" 
              fill="none" 
            />
            <text className="text-[13px] font-bold fill-black opacity-30 uppercase tracking-widest">
              <textPath href="#cursorCircle" startOffset="0%" textLength="175">
                {repeatedText}
              </textPath>
            </text>
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
