import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav
      style={{
        background: '#f8f6f2',
        padding: '6px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo Section */}
      <div style={{ flex: '1' }}>
        <img
          src="https://res.cloudinary.com/djydkcx01/image/upload/v1746061572/Mufate_Logo_jnnh7x.png"
          alt="Sacco Logo"
          style={{ height: '145px', objectFit: 'contain' }}
        />
      </div>

      {/* Links Section */}
      <div
        style={{
          display: 'flex',
          gap: '15px',
          fontSize: '16px',
          fontWeight: '500',
          justifyContent: 'center',
          flex: '2',
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/products">Products</Link>
        <Link to="/services">Services</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/careers">Careers</Link>
        <Link to="/membership">Membership</Link>
        <Link to="/faqs">FAQs</Link>
        <Link to="/news">News</Link>
      </div>

      {/* Button Section */}
      <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/contact">
          <button
            style={{
              padding: '5px 10px',
              backgroundColor: '#ccc',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Contact us
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
