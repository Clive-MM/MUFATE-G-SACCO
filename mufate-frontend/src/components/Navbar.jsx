import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-[#f8f6f2] shadow-md py-1 px-5 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
                <img
                    src="https://res.cloudinary.com/djydkcx01/image/upload/v1746061572/Mufate_Logo_jnnh7x.png"
                    alt="Sacco Logo"
                    className="h-18 w-auto max-w-[200px] object-contain"
                />


            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-10 text-[20px] font-semibold uppercase tracking-wide">
  <div>
    <Link to="/" className="text-green-700 no-underline hover:text-[#F59E0B] transition">
      Home
    </Link>
  </div>
  <div>
    <Link to="/about" className="text-green-700 no-underline hover:text-[#F59E0B] transition">
      About Us
    </Link>
  </div>
  <div>
    <Link to="/products" className="text-green-700 no-underline hover:text-[#F59E0B] transition">
      Our Products
    </Link>
  </div>
  <div>
    <Link to="/services" className="text-green-700 no-underline hover:text-[#F59E0B] transition">
      Loans
    </Link>
  </div>
  <div>
    <Link to="/resources" className="text-green-700 no-underline hover:text-[#F59E0B] transition">
      Our Resources
    </Link>
  </div>
  <div>
    <Link to="/blogs" className="text-green-700 no-underline hover:text-[#F59E0B] transition">
      Blog
    </Link>
  </div>
  <div>
    <Link to="/contact" className="text-green-700 no-underline hover:text-[#F59E0B] transition">
      Contact Us
    </Link>
  </div>
</div>





            {/* Contact Button */}
            <Link
                to="/contact"
                className="bg-gray-300 hover:bg-gray-400 text-black text-sm px-4 py-1.5 rounded shadow-sm"
            >
                Contact us
            </Link>
        </nav>
    );
};

export default Navbar;
