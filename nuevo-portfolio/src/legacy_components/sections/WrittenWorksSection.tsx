import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import ScrambleText from '../ScrambleText';

const WRITTEN_WORKS = [
    {
        id: 1,
        title: { es: 'Atracamos y nos vamos', en: 'Atracamos y nos vamos' },
        subtitle: { es: 'Novela • Intriga', en: 'Novel • Intrigue' },
        description: {
            es: 'Una narrativa trepidante que sumerge al lector en un laberinto de decisiones y consecuencias inesperadas.',
            en: 'A fast-paced narrative that immerses the reader in a labyrinth of decisions and unexpected consequences.'
        },
        video: '/videos/Cyberpunk_Subway_Reflection_Video.mp4',
        alignment: 'left',
        amazonLinks: {
            es: 'https://www.amazon.es/Atracamos-nos-vamos-Francesc-Chimelis-ebook/dp/B0DFHJW3P8',
            en: 'https://www.amazon.es/Atracamos-nos-vamos-Francesc-Chimelis-ebook/dp/B0DFHJW3P8'
        }
    },
    {
        id: 2,
        title: { es: 'El Secreto del Círculo', en: 'The Secret of the Circle' },
        subtitle: { es: 'Misterio • Ficción', en: 'Mystery • Fiction' },
        description: {
            es: 'Un enigma por resolver donde cada página revela una capa más profunda de una verdad oculta durante siglos.',
            en: 'An enigma to solve where each page reveals a deeper layer of a truth hidden for centuries.'
        },
        video: '/videos/Dynamic_Geometric_Ink_Bloom.mp4',
        alignment: 'right',
        amazonLinks: {
            es: 'https://www.amazon.es/SECRETO-DEL-CIRCULO-Francesc-Chimelis/dp/B0G589CVWL',
            en: 'https://www.amazon.es/SECRETO-DEL-CIRCULO-Francesc-Chimelis/dp/B0G589CVWL'
        }
    },
    {
        id: 3,
        title: { es: 'La estamos liando', en: 'We are making a mess' },
        subtitle: { es: 'Narrativa Contemporánea', en: 'Contemporary Narrative' },
        description: {
            es: 'Una visión mordaz y actual sobre las complicaciones de la vida moderna y las relaciones humanas.',
            en: 'A sharp and current vision of the complications of modern life and human relationships.'
        },
        video: '/videos/Animated_Heart_Labyrinth_Video.mp4',
        alignment: 'left',
        amazonLinks: {
            es: 'https://www.amazon.es/ESTAMOS-LIANDO-Francesc-Chimelis/dp/B0G2GC5J82',
            en: 'https://www.amazon.es/ESTAMOS-LIANDO-Francesc-Chimelis/dp/B0G2GC5J82'
        }
    },
    {
        id: 4,
        title: { es: 'Galapanídides: La Tridimensionalidad', en: 'Galapanídides: Tridimensionality' },
        subtitle: { es: 'Fantasía • Filosofía', en: 'Fantasy • Philosophy' },
        description: {
            es: 'Una obra monumental que explora dimensiones desconocidas y la esencia del ser en un universo expandido.',
            en: 'A monumental work that explores unknown dimensions and the essence of being in an expanded universe.'
        },
        video: '/videos/Magical_Ink_Poetry_Animation.mp4',
        alignment: 'right',
        amazonLinks: {
            es: 'https://www.amazon.es/GALAPAN%C3%8DDIDES-TRIDIMENSIONALIDAD-Francesc-Chimelis-Rodriguez/dp/B0FRXY9VVM',
            en: 'https://www.amazon.es/GALAPAN%C3%8DDIDES-TRIDIMENSIONALIDAD-Francesc-Chimelis-Rodriguez/dp/B0FRXY9VVM'
        }
    }
];

const WorkCard: React.FC<{ work: typeof WRITTEN_WORKS[0], lang: 'es' | 'en' }> = ({ work, lang }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    // Dynamic Pulse Effect for Video
    // Instead of static blur, we oscillate slightly to make it "pulsate" or "vibrate"
    useEffect(() => {
        if (videoRef.current) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Auto-play was prevented or interrupted, silence the error
                    if (error.name !== 'AbortError') {
                        console.error("Video play failed:", error);
                    }
                });
            }
        }
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const moveX = (clientX - innerWidth / 2) / 60; // Gentler movement
        const moveY = (clientY - innerHeight / 2) / 60;
        videoRef.current.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
    };

    return (
        <motion.div
            ref={cardRef}
            style={{ opacity }}
            onMouseMove={handleMouseMove}
            className={`relative w-full h-[70vh] flex items-center justify-center overflow-hidden px-4 md:px-12`}
        >
            {/* Immersive Video Layer */}
            <motion.div
                className="absolute inset-0 z-0 overflow-hidden"
                animate={{
                    scale: [1, 1.02, 1], // Subtle breathing
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover opacity-50 grayscale-[0.2] hover:grayscale-0 transition-all duration-700 will-change-transform transform-gpu"
                >
                    <source src={work.video} type="video/mp4" />
                </video>
                {/* Soft Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a09] via-transparent to-[#0c0a09] opacity-80" />
                <div className="absolute inset-0 bg-[#fbbf24]/5 mix-blend-overlay" />
            </motion.div>

            {/* Content Container */}
            <div className={`relative z-10 max-w-7xl mx-auto w-full flex flex-col ${work.alignment === 'right' ? 'md:items-end text-right' : 'md:items-start text-left'}`}>
                <motion.div
                    style={{ y }}
                    className="max-w-2xl space-y-6 backdrop-blur-md bg-black/40 p-8 md:p-10 rounded-2xl border border-[#fbbf24]/20 shadow-2xl"
                >
                    <div className="flex items-center gap-3 text-[#fbbf24] mb-2 font-mono text-xs tracking-[0.2em] uppercase">
                        <BookOpen className="w-5 h-5 animate-pulse" />
                        <span>{work.subtitle[lang]}</span>
                    </div>

                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight tracking-tight break-words">
                        {work.title[lang]}
                    </h3>

                    <div className="h-px w-24 bg-gradient-to-r from-[#fbbf24] to-transparent" />

                    <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light font-heading">
                        {work.description[lang]}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mt-4">


                        {/* Amazon Kindle Purchase Button */}
                        <a
                            href={work.amazonLinks[lang]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden px-8 py-4 bg-[#ff9900] hover:bg-[#ffac33] transition-colors uppercase tracking-[0.15em] text-xs font-bold flex-1 text-black flex items-center justify-center gap-2"
                        >
                            <span className="relative z-10">{lang === 'es' ? 'Comprar en Kindle' : 'Buy on Kindle'}</span>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.5 2.5c.8 0 1.5.7 1.5 1.5v17c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-17c0-.8.7-1.5 1.5-1.5z" />
                                <path d="M21.5 12.5c0 .8-.7 1.5-1.5 1.5H3c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h17c.8 0 1.5.7 1.5 1.5z" />
                            </svg>
                        </a>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const WrittenWorksSection: React.FC = () => {
    const { lang, t } = useLanguage();

    return (
        <section id="written-works" className="bg-[#0c0a09] relative pt-32 pb-20 md:pb-32 px-4 z-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header matching GallerySection style */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-heading font-bold mb-4 text-[#fef3c7]"
                        >
                            <ScrambleText text={lang === 'es' ? 'ESCRITOS' : 'LITERARY'} /> <span className="text-[#fbbf24]"><ScrambleText text={lang === 'es' ? 'LITERARIOS' : 'WRITINGS'} delay={500} /></span>
                        </motion.h2>
                        <div className="w-24 h-1 bg-[#fbbf24]" />
                        <p className="mt-6 max-w-xl text-lg text-[#fbbf24]/70 font-mono tracking-widest">
                            {lang === 'es' ? 'Donde el pincel descansa, la pluma despierta.' : 'Where the brush rests, the pen awakes.'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-0">
                {WRITTEN_WORKS.map((work) => (
                    <WorkCard key={work.id} work={work} lang={lang} />
                ))}
            </div>

        </section>
    );
};

export default WrittenWorksSection;
