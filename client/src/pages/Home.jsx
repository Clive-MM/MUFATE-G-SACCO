// src/pages/Home.jsx
import React from 'react';
import HomepageSlider from '../components/HomepageSlider';
import AboutSection from '../components/AboutSection';
import SaccoStatsSection from '../components/SaccoStatsSection';

const Home = () => {
  return (
    <>
      <HomepageSlider />
       <AboutSection />
       <SaccoStatsSection />
     
    </>
  );
};

export default Home;
