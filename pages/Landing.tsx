import React from "react"; 
import Link from "next/link";
import { FaBriefcase, FaUsers, FaGraduationCap } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold tracking-tight">
            Talent <span className="text-yellow-300">Bridge</span>
          </h1>

          {/* Navigation */}
          <div className="space-x-4">
            <Link href="/auth/signin" className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition">
              Sign In
            </Link>
            <Link href="/auth/signup" className="bg-yellow-400 text-indigo-800 px-4 py-2 rounded-md font-medium hover:bg-yellow-300 transition">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Welcome to <span className="text-yellow-300">Talent Bridge</span>
          </h2>
          <p className="text-lg md:text-xl mb-8 tracking-tight">
            Connecting Students, Employers, and Universities to Build Careers of Tomorrow.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="#features" className="bg-yellow-300 text-indigo-800 px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition">
              Learn More
            </Link>
            <Link href="/dashboard" className="bg-white text-indigo-800 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
            Why Choose Talent Bridge?
          </h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl hover:bg-blue-100 transform hover:scale-105 transition duration-300">
              <div className="animate-bounce">
                <FaGraduationCap size={48} className="text-blue-600 mx-auto mb-4" />
              </div>
              <h3 className="text-lg font-bold mb-2">For Students</h3>
              <p className="text-gray-600">
                Access personalized job recommendations, enhance your skills, and launch your dream career.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl hover:bg-blue-100 transform hover:scale-105 transition duration-300">
              <div className="animate-bounce">
                <FaBriefcase size={48} className="text-blue-600 mx-auto mb-4" />
              </div>
              <h3 className="text-lg font-bold mb-2">For Employers</h3>
              <p className="text-gray-600">
                Discover top talent, post job opportunities, and grow your team with the right skills.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl hover:bg-blue-100 transform hover:scale-105 transition duration-300">
              <div className="animate-bounce">
                <FaUsers size={48} className="text-blue-600 mx-auto mb-4" />
              </div>
              <h3 className="text-lg font-bold mb-2">For Universities</h3>
              <p className="text-gray-600">
                Gain insights on student performance, track placements, and enhance employability outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Future?</h2>
          <p className="text-lg">
            Join Talent Bridge today and unlock a world of opportunities tailored for your success.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Talent Bridge. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/privacy" className="hover:text-yellow-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-yellow-300">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-yellow-300">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
