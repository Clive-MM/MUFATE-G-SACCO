import React from 'react';
import HomepageSlider from '../components/HomepageSlider';
import AboutSection from '../components/AboutSection';
import SaccoStatsSection from '../components/SaccoStatsSection';
import SaccoIdentitySection from '../components/SaccoIdentitySection';
import OurProductsSection from '../components/ProductSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FeedbackBanner from '../components/FeedbackBanner';
import Footer from '../components/Footer';
import HolidayBanner from '../components/HolidayBanner';


const Home = () => {
  return (
    <>
       <HolidayBanner />
      <HomepageSlider />
       <AboutSection />
       <SaccoStatsSection />
       <SaccoIdentitySection/>
       <OurProductsSection />
       <TestimonialsSection/>
       <FeedbackBanner/>
       <Footer/>
     
    </>
  );
};

export default Home;
