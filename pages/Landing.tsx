import React from "react";
import { FaBriefcase, FaUsers, FaGraduationCap } from "react-icons/fa";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-yellow-300">Talent Bridge</span>
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Connecting Students, Employers, and Universities to Build Careers of Tomorrow.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#features"
              className="bg-yellow-300 text-indigo-800 px-6 py-3 rounded-md font-medium hover:bg-yellow-400 transition"
            >
              Learn More
            </a>
            <a
              href="/dashboard"
              className="bg-white text-indigo-800 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
            Why Choose Talent Bridge?
          </h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <FaGraduationCap size={48} className="text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">For Students</h3>
              <p className="text-gray-600">
                Access personalized job recommendations, enhance your skills, and launch your dream career.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <FaBriefcase size={48} className="text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">For Employers</h3>
              <p className="text-gray-600">
                Discover top talent, post job opportunities, and grow your team with the right skills.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <FaUsers size={48} className="text-indigo-600 mx-auto mb-4" />
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
          <p className="text-lg mb-8">
            Join Talent Bridge today and unlock a world of opportunities tailored for your success.
          </p>
          <a
            href="/register"
            className="bg-yellow-300 text-indigo-800 px-6 py-3 rounded-md font-medium hover:bg-yellow-400 transition"
          >
            Sign Up Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Talent Bridge. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-yellow-300">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-300">Terms of Service</a>
            <a href="#" className="hover:text-yellow-300">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
