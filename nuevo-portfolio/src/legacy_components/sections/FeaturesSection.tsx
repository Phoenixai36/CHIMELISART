import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Layers, Award } from 'lucide-react';
import ScrambleText from '../ScrambleText';
import { useLanguage } from '../../contexts/LanguageContext';

const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.section
      id="artist"
      className="pt-32 pb-20 bg-[#0c0a09] relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1 relative"
        >
          {/* <div className="absolute top-0 left-0 w-full h-full border border-[#fbbf24] transform translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8" /> */}
          <div className="relative aspect-[3/4] bg-[#1c1917] overflow-hidden filter grayscale hover:grayscale-0 transition-all duration-700">
            {/* Artist Portrait */}
            <img
              src="https://static.wixstatic.com/media/8bd745_d07bd22fb66a41df8b6210570ec2be8d~mv2.jpeg"
              alt="Francesc Chimelis"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-2xl font-heading text-[#fbbf24]">FRANCESC CHIMELIS</h3>
              <p className="text-white/60 text-sm mt-2">Barcelona, 2026</p>
            </div>
          </div>
        </motion.div>

        <div className="order-1 md:order-2 space-y-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              {t.features.title} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#d97706]">{t.features.subtitle}</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-md">
              <ScrambleText text={t.features.description} scrambleSpeed={10} step={2} />
            </p>
          </div>

          <div className="space-y-8">
            {t.features.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-6 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#fbbf24] group-hover:bg-[#fbbf24] transition-all duration-300">
                  {idx === 0 ? <Palette className="w-5 h-5 group-hover:text-black" /> :
                    idx === 1 ? <Layers className="w-5 h-5 group-hover:text-black" /> :
                      <Award className="w-5 h-5 group-hover:text-black" />}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-[#fef3c7]">{item.title}</h4>
                  <p className="text-sm text-white/50">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
