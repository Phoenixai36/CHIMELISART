import React, { lazy, Suspense } from 'react';
import ScrambleText from '../ScrambleText';
import { useLanguage } from '../../contexts/LanguageContext';

const Hero = lazy(() => import('../ui/animated-shader-hero').then(m => ({ default: m.default })));

interface HomePageProps {
    scrollToSection?: (id: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ scrollToSection }) => {
    const { t } = useLanguage();

    const handleScrollToGallery = () => {
        if (scrollToSection) {
            scrollToSection('gallery');
        } else {
            window.location.href = '/gallery';
        }
    };

    const handleScrollToContact = () => {
        if (scrollToSection) {
            scrollToSection('acquisition');
        } else {
            window.location.href = '/artist#acquisition';
        }
    };

    return (
        <>
            <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center"><div className="text-white text-2xl">Loading CHIMELISART Experience...</div></div>}>
                <Hero
                    headline={{
                        line1: "CHIMELISART",
                        line2: t.hero.subheader,
                    }}
                    subtitle={
                        <div className="flex flex-col items-center gap-4">
                            <span className="block max-w-2xl text-sm md:text-lg font-light text-white/70 leading-relaxed">
                                <ScrambleText text={t.hero.description} scrambleSpeed={5} delay={150} step={15} />
                            </span>
                        </div>
                    }
                    buttons={{
                        primary: {
                            text: t.gallery.swipe.replace("Desliza para descubrir", "Explorar Galería").replace("Swipe to discover", "Explore Gallery"),
                            onClick: handleScrollToGallery,
                        },
                        secondary: {
                            text: t.nav.acquire,
                            onClick: handleScrollToContact,
                        },
                    }}
                />
            </Suspense>
        </>
    );
};

export default HomePage;
