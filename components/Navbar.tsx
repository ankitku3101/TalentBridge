"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand Name */}
        <div className="text-2xl font-semibold">
          <span className="text-yellow-300"></span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/student/dashboard" className="text-lg font-medium hover:text-yellow-300 transition">
            Student Dashboard
          </Link>
          <Link href="/employee/dashboard" className="text-lg font-medium hover:text-yellow-300 transition">
            Employee Dashboard
          </Link>
          <Link href="/university/dashboard" className="text-lg font-medium hover:text-yellow-300 transition">
            University Dashboard
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-4 space-y-4">
          <Link href="/student/dashboard" className="block text-lg font-medium hover:text-yellow-300 transition">
            Student Dashboard
          </Link>
          <Link href="/employee/dashboard" className="block text-lg font-medium hover:text-yellow-300 transition">
            Employee Dashboard
          </Link>
          <Link href="/university/dashboard" className="block text-lg font-medium hover:text-yellow-300 transition">
            University Dashboard
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
