import React from 'react';
import FeaturesSection from '../sections/FeaturesSection';
import AcquisitionSection from '../sections/AcquisitionSection';

const ArtistPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0c0a09]">
            <FeaturesSection />
            <AcquisitionSection />
        </div>
    );
};

export default ArtistPage;
