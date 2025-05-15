import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';

import AboutUsSection from './AboutUsSection';



import axios from 'axios';

const AboutUs = () => {

  const [branches, setBranches] = useState([]);
  const [coreValues, setCoreValues] = useState([]);

  

  // Fetch branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await axios.get('http://localhost:5000/branches');
        setBranches(res.data.branches || []);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();
  }, []);

  // Fetch core values
  useEffect(() => {
    const fetchCoreValues = async () => {
      try {
        const res = await axios.get('http://localhost:5000/corevalues');
        setCoreValues(res.data.core_values || []);
      } catch (error) {
        console.error("Error fetching core values:", error);
      }
    };
    fetchCoreValues();
  }, []);

  return (
    <>


      {/* Hero image */}
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <img
          src="https://res.cloudinary.com/djydkcx01/image/upload/v1747331947/ChatGPT_Image_May_15_2025_08_58_50_PM_uwznuh.png"
          alt="About Us Hero"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            maxWidth: '100%',
            objectFit: 'contain'
          }}
        />
      </div>

      <AboutUsSection />
      {/* Branches & Core Values Section */}
      <section style={{ padding: '2rem', background: '#f4f4f4' }}>
        <h2 style={{ color: '#2e7d32', marginBottom: '1.5rem' }}>OUR BRANCHES</h2>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Branch Cards */}
          {branches.map(branch => (
            <div
              key={branch.BranchID}
              style={{
                width: '300px',
                background: '#fff',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}
            >
              <img
                src="https://img.icons8.com/ios-filled/100/4CAF50/marker.png"
                alt="Branch Icon"
                style={{ width: '50px', marginBottom: '1rem' }}
              />
              <h3 style={{ marginBottom: '0.5rem', color: '#2e7d32' }}>{branch.BranchName}</h3>
              <p style={{ fontSize: '14px', color: '#555' }}>{branch.Location}</p>
              <p style={{ fontSize: '14px', color: '#555' }}><strong>Contact:</strong> {branch.ContactNumber}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.GoogleMapURL)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '13px', color: '#1e88e5', marginTop: '0.5rem', display: 'inline-block' }}
              >
                View on Map
              </a>
            </div>
          ))}

          {/* Core Values Card */}
          {coreValues.length > 0 && (
            <div
              style={{
                width: '300px',
                background: '#fff',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}
            >
              <img
                src="https://img.icons8.com/ios-filled/100/4CAF50/heart-with-pulse.png"
                alt="Core Values Icon"
                style={{ width: '50px', marginBottom: '1rem' }}
              />
              <h3 style={{ marginBottom: '0.5rem', color: '#2e7d32' }}>Our Core Values</h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {coreValues.map((value, index) => (
                  <li key={index} style={{ fontSize: '14px', color: '#555', marginBottom: '0.4rem' }}>
                    • {value.CoreValueName}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      {/* Join Mufate Sacco CTA Section */}
      <section style={{ backgroundColor: '#04374f', color: '#fff', padding: '1rem 2rem 3rem 2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Image Block */}
          <div style={{ flex: '1 1 350px' }}>
            <img
              src="https://res.cloudinary.com/djydkcx01/image/upload/v1747336462/ChatGPT_Image_May_15_2025_10_13_52_PM_cmnvr8.png"
              alt="Join Mufate Sacco"
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginTop: '-40px' // ✅ Image floats upward ONLY
                // Removed marginBottom to allow blue background to extend below
              }}
            />
          </div>

          {/* Text + CTA */}
          <div style={{ flex: '1 1 450px', padding: '1rem 0' }}>
            <h2 style={{ marginBottom: '0.8rem' }}>Join Mufate Sacco Today!</h2>
            <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '1.2rem' }}>
              Download our Sacco brochure and follow the requirements to become part of Mufate Sacco.
            </p>
            <a
              href="http://localhost:3000/membership"
              style={{
                display: 'inline-block',
                padding: '0.6rem 1.4rem',
                backgroundColor: '#fff',
                color: '#04374f',
                borderRadius: '4px',
                fontWeight: 'bold',
                textDecoration: 'none',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
              }}
            >
              Register Now
            </a>
          </div>
        </div>
      </section>

      <Footer />


    </>
  );
};

export default AboutUs;
