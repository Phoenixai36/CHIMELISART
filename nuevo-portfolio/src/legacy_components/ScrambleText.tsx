// @ts-nocheck
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useInView } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  preserveSpace?: boolean;
  as?: React.ElementType;
  delay?: number;
  step?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/";

const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = "", 
  scrambleSpeed = 30, // Target ms per update
  preserveSpace = true,
  as: Component = 'span',
  delay = 0,
  step = 1
}) => {
  const [displayedText, setDisplayedText] = useState(text);
  const targetTextRef = useRef(text);
  
  // Animation refs
  const requestRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const iterationRef = useRef<number>(0);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px -5% 0px" }); 
  const hasStarted = useRef(false);

  // Update target text immediately when prop changes
  useEffect(() => {
    targetTextRef.current = text;
    // If visible and already ran once, restart animation for new text
    if (isInView && hasStarted.current) {
        iterationRef.current = 0;
        startAnimation();
    }
  }, [text]);

  const animate = (time: number) => {
    if (!lastUpdateRef.current) lastUpdateRef.current = time;
    const deltaTime = time - lastUpdateRef.current;

    if (deltaTime >= scrambleSpeed) {
      const currentText = targetTextRef.current;
      const currentIteration = iterationRef.current;
      
      // Build scrambled string
      let nextText = "";
      for (let i = 0; i < currentText.length; i++) {
        const char = currentText[i];
        if (preserveSpace && char === " ") {
          nextText += " ";
          continue;
        }
        
        if (i < Math.floor(currentIteration)) {
          nextText += char;
        } else {
          nextText += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      
      setDisplayedText(nextText);
      
      if (currentIteration >= currentText.length) {
        return; // Animation complete
      }
      
      iterationRef.current += step;
      lastUpdateRef.current = time;
    }
    
    requestRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = useCallback(() => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    lastUpdateRef.current = 0;
    requestRef.current = requestAnimationFrame(animate);
  }, [scrambleSpeed, step, preserveSpace]);

  // Initial trigger
  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      const timeout = setTimeout(() => {
        iterationRef.current = 0;
        startAnimation();
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isInView, delay, startAnimation]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    // @ts-ignore
    <Component ref={ref} className={`relative inline-block ${className}`}>
      {/* Ghost text for layout stability */}
      <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
        {text}
      </span>
      {/* Absolute overlay */}
      <span className="absolute top-0 left-0 w-full h-full text-inherit whitespace-pre-wrap">
        {displayedText}
      </span>
    </Component>
  );
};

export default ScrambleText;
