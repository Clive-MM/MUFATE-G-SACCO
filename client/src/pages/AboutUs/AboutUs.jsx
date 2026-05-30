import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AboutHero from './AboutHero';
import AboutUsSection from './AboutUsSection';
import BranchesSection from './BranchesSection';
import Footer from '../../components/Footer';

const AboutUs = () => {
  const [branches, setBranches] = useState([]);
  const [coreValues, setCoreValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [branchRes, valueRes] = await Promise.all([
          axios.get('https://mufate-g-sacco.onrender.com/branches'),
          axios.get('https://mufate-g-sacco.onrender.com/corevalues')
        ]);
        setBranches(branchRes.data.branches || []);
        setCoreValues(valueRes.data.core_values || []);
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, []);

  return (
    <main style={{ backgroundColor: '#02150F' }}>
      <AboutHero />
      <AboutUsSection /> 
      <BranchesSection branches={branches} coreValues={coreValues} />
      <Footer />
    </main>
  );
};

export default AboutUs;