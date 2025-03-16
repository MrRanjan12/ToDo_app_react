import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for the mobile menu

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className='w-full bg-gradient-to-r from-purple-800 to-indigo-800 text-white shadow-lg fixed top-0 z-50'>
      <div className='container mx-auto flex justify-between items-center p-4'>
        {/* Logo */}
        <div className="logo">
          <span className="font-bold text-2xl md:text-3xl hover:text-purple-200 transition-all duration-300">
            iTask
          </span>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          <li className='cursor-pointer hover:text-purple-200 hover:font-semibold transition-all duration-300'>
            Home
          </li>
          <li className='cursor-pointer hover:text-purple-200 hover:font-semibold transition-all duration-300'>
            Your Tasks
          </li>
        </ul>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-gradient-to-r from-purple-800 to-indigo-800">
            <ul className="flex flex-col items-center gap-4 py-4">
              <li className='cursor-pointer hover:text-purple-200 hover:font-semibold transition-all duration-300'>
                Home
              </li>
              <li className='cursor-pointer hover:text-purple-200 hover:font-semibold transition-all duration-300'>
                Your Tasks
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;