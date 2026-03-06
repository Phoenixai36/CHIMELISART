/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIChatProps {
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
  initialMessage?: string;
  lang?: 'es' | 'en';
}

const AUTHOR_THEME = {
  id: 'author',
  base: '#1c1917', // Stone 900
  accent: '#fbbf24', // Gold
  skin: '#ffdbac',   // Warm skin tone
  hair: '#e2e8f0',   // Silvery Slate hair
  eyeColor: '#1e293b' // Dark eyes
};

const PixelArtAvatar = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-full h-full p-0.5">
    <div className="relative z-10 w-full h-full rounded-full overflow-hidden shadow-2xl border border-[#fbbf24]/30 bg-[#1c1917]">
      <svg viewBox="0 0 32 32" className="w-full h-full" shapeRendering="crispEdges">
        {/* HAIR - Fuller on sides, thinner on top (matching photo) */}
        {/* Back hair */}
        <rect x="6" y="4" width="20" height="8" fill={AUTHOR_THEME.hair} opacity="0.4" />

        {/* Left hair volume */}
        <rect x="4" y="8" width="5" height="12" fill={AUTHOR_THEME.hair} />
        <rect x="3" y="10" width="2" height="8" fill={AUTHOR_THEME.hair} opacity="0.8" />

        {/* Right hair volume */}
        <rect x="23" y="8" width="5" height="12" fill={AUTHOR_THEME.hair} />
        <rect x="27" y="10" width="2" height="8" fill={AUTHOR_THEME.hair} opacity="0.8" />

        {/* FACE SHAPE */}
        <rect x="8" y="6" width="16" height="20" fill={AUTHOR_THEME.skin} />
        <rect x="10" y="26" width="12" height="2" fill={AUTHOR_THEME.skin} />

        {/* Forehead details */}
        <rect x="10" y="5" width="12" height="3" fill={AUTHOR_THEME.skin} />
        {/* Receding hair line sutil */}
        <rect x="9" y="4" width="2" height="2" fill={AUTHOR_THEME.hair} opacity="0.6" />
        <rect x="21" y="4" width="2" height="2" fill={AUTHOR_THEME.hair} opacity="0.6" />

        {/* GLASSES (Thin frame matching photo) */}
        <rect x="7" y="14" width="18" height="1" fill="#475569" /> {/* Bridge and top bar */}

        {/* Lenses */}
        <rect x="9" y="14" width="6" height="5" fill="white" opacity="0.2" />
        <rect x="17" y="14" width="6" height="5" fill="white" opacity="0.2" />
        {/* Frame bottom */}
        <rect x="9" y="19" width="6" height="1" fill="#475569" opacity="0.5" />
        <rect x="17" y="19" width="6" height="1" fill="#475569" opacity="0.5" />

        {/* EYES */}
        {!isOpen ? (
          <>
            <rect x="11" y="16" width="2" height="2" fill={AUTHOR_THEME.eyeColor} />
            <rect x="19" y="16" width="2" height="2" fill={AUTHOR_THEME.eyeColor} />
          </>
        ) : (
          <>
            <rect x="11" y="16" width="2" height="1" fill={AUTHOR_THEME.accent} />
            <rect x="19" y="16" width="2" height="1" fill={AUTHOR_THEME.accent} />
          </>
        )}

        {/* NOSE */}
        <rect x="15" y="18" width="2" height="3" fill="#000" opacity="0.05" />

        {/* MOUTH (Warm, friendly smile) */}
        <rect x="13" y="23" width="6" height="1" fill="#991b1b" opacity="0.2" />
        <rect x="12" y="22" width="1" height="1" fill="#991b1b" opacity="0.1" />
        <rect x="19" y="22" width="1" height="1" fill="#991b1b" opacity="0.1" />

        {/* Shading/Depth */}
        <rect x="8" y="20" width="1" height="6" fill="#000" opacity="0.03" />
        <rect x="23" y="20" width="1" height="6" fill="#000" opacity="0.03" />
      </svg>
    </div>

    {/* Subtle Gold Aura */}
    <motion.div
      className="absolute inset-0 rounded-full border border-[#fbbf24]/50 z-0"
      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);


const AIChat: React.FC<AIChatProps> = ({ isOpenExternal, onCloseExternal, initialMessage, lang = 'es' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);



  // Set initial welcome message based on language
  useEffect(() => {
    const welcomeText = lang === 'es'
      ? '¡Hola! Soy el asistente virtual de CHIMELISART. ✨ ¿Deseas conocer más sobre la obra de Francesc?'
      : 'Hello! I am the CHIMELISART virtual assistant. ✨ Would you like to learn more about Francesc\'s work?';

    setMessages(prev => {
      if (prev.length === 0) return [{ role: 'model', text: welcomeText }];
      return prev;
    });
  }, [lang]);

  useEffect(() => {
    if (isOpenExternal !== undefined) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  useEffect(() => {
    if (initialMessage && isOpen) {
      setInput(initialMessage);
    }
  }, [initialMessage, isOpen]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (!newState && onCloseExternal) {
      onCloseExternal();
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(scrollToBottom, 100);

    const responseText = await sendMessageToGemini(input);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, rotate: 5 }}
            className="mb-4 w-[90vw] md:w-96 bg-[#1c1917]/95 backdrop-blur-xl border-2 rounded-2xl overflow-hidden shadow-2xl origin-bottom-right border-stone-900"
          >
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-white/10 bg-stone-900">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/30 bg-white/10">
                  <PixelArtAvatar isOpen={false} />
                </div>
                <h3 className="font-heading font-bold text-white tracking-wider text-sm uppercase">CHIMELISART AI</h3>
              </div>
              <button onClick={handleToggle} className="text-white/50 hover:text-white" data-hover="true" aria-label="Close chat">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={chatContainerRef}
              className="h-64 md:h-80 overflow-y-auto p-4 space-y-4 scroll-smooth bg-black/40"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                      ? 'bg-amber-400 text-black rounded-tr-sm shadow-md'
                      : 'bg-[#292524] text-[#d6d3d1] rounded-tl-sm border border-white/5 shadow-sm'
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#292524] p-3 rounded-2xl rounded-tl-sm border border-white/5 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce anim-delay-0 bg-amber-400" />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce anim-delay-150 bg-amber-400" />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce anim-delay-300 bg-amber-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-[#1c1917]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={lang === 'es' ? "Escribe tu consulta sobre la obra..." : "Type your inquiry about the art..."}
                  className="flex-1 bg-black/40 text-white placeholder-white/30 text-sm focus:outline-none rounded-xl px-4 py-2 border border-white/5 focus:border-white/20 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-2 rounded-xl transition-colors disabled:opacity-50 text-black shadow-lg bg-amber-400"
                  data-hover="true"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button with Speech Bubble Avatar */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        className="w-20 h-20 md:w-24 md:h-24 bg-transparent flex items-center justify-center z-50 group hover:cursor-pointer drop-shadow-2xl"
        data-hover="true"
        aria-label={isOpen ? "Close chat " : "Open chat helper"}
        animate={{
          y: [0, -8, 0],
          transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
        }}
      >
        <PixelArtAvatar isOpen={isOpen} />
      </motion.button>
    </div>
  );
};

export default AIChat;
