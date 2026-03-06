import React from 'react';
import HeroBanner from './HeroBanner';
import MobileBanking from './MobileBanking';
import SalaryProcessing from './SalaryProcessing';
import StrategicPartners from './StrategicPartners';
import AssetFinancing from './AssetFinancing';

const Services = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: BRAND.dark }}>
            <HeroBanner />
            <MobileBanking/>
            <SalaryProcessing/>
            <AssetFinancing/>
            <StrategicPartners/>
        </Box>
    );
};

export default Services;
