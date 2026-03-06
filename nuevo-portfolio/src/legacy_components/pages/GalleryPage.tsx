import React, { useState } from 'react';
import GallerySection from '../sections/GallerySection';
import AcquisitionSection from '../sections/AcquisitionSection';
import ArtworkModal from '../ui/ArtworkModal';
import type { Artwork } from '../../types';

const GalleryPage: React.FC = () => {
    const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

    return (
        <>
            <div className="min-h-screen bg-[#0c0a09]">
                <GallerySection onArtworkSelect={setSelectedArtwork} />
                <AcquisitionSection />
            </div>

            <ArtworkModal
                artwork={selectedArtwork}
                onClose={() => setSelectedArtwork(null)}
                onRelatedClick={setSelectedArtwork}
            />
        </>
    );
};

export default GalleryPage;
