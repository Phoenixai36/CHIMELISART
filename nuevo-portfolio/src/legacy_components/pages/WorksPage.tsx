import React from 'react';
import WrittenWorksSection from '../sections/WrittenWorksSection';
import AcquisitionSection from '../sections/AcquisitionSection';

const WorksPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0c0a09]">
            <WrittenWorksSection />
            <AcquisitionSection />
        </div>
    );
};

export default WorksPage;
