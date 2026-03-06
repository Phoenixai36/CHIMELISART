import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';

const AcquisitionSection: React.FC = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  return (
    <motion.section
      id="acquisition"
      className="py-20 md:py-32 px-4 bg-[#1c1917] relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">{t.acquisition.title}</h2>
          <p className="text-[#fbbf24] uppercase tracking-[0.3em] text-sm">{t.acquisition.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.acquisition.tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={`
                p-8 border relative transition-colors duration-300 transform-gpu will-change-transform
                ${idx === 1
                  ? 'border-[#fbbf24] bg-[#fbbf24]/5'
                  : 'border-white/10 hover:border-[#fbbf24]/50 bg-[#0c0a09]'}
              `}
            >
              <motion.div
                className="absolute w-[150%] h-[150%] top-[-25%] left-[-25%] bg-gradient-to-r from-[#fbbf24]/5 to-transparent blur-[80px] rounded-full pointer-events-none"
                animate={{
                  x: ['-10%', '10%', '-10%'],
                  y: ['-10%', '10%', '-10%'],
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              {idx === 1 && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#fbbf24] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2 text-[#fef3c7]">{tier.name}</h3>
              <div className="text-base text-[#d97706] mb-8 font-mono font-semibold">{tier.subtitle}</div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-base text-white/80">
                    <Check className="w-5 h-5 text-[#fbbf24] stroke-[2.5]" />
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => addToCart({
                  artworkId: `tier-${tier.name}`,
                  title: tier.name,
                  image: '', // Placeholder or appropriate image if available
                  type: 'original',
                  price: 0 // Treating these as 'Inquire' items
                })}
                className={`
                  w-full py-4 text-sm font-extrabold uppercase tracking-widest transition-all
                  ${idx === 1
                    ? 'bg-[#fbbf24] text-black hover:bg-[#f59e0b]'
                    : 'border border-white/20 hover:bg-white hover:text-black'}
                `}
              >
                {t.acquisition.cta.add}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AcquisitionSection;
