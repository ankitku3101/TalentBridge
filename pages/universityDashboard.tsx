import React from "react";
import Link from "next/link";
import { FaUniversity, FaUserTie, FaChartBar, FaClipboardList } from "react-icons/fa";

const UniversityDashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-4 px-10 flex justify-between items-center shadow-md">
        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <FaUniversity
            size={28}
            className="hover:scale-110 hover:text-yellow-300 transition-transform duration-300"
          />
          <span className="hidden sm:inline text-lg font-semibold">
            Welcome, University Admin
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 py-6 px-20 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Overview Cards */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gradient-to-r from-gray-100 to-gray-300 hover:shadow-lg hover:scale-105 hover:shadow-blue-400 transition duration-300">
          <FaChartBar
            size={40}
            className="text-blue-600 mb-4 hover:text-blue-800 hover:scale-110 transition-transform duration-300"
          />
          <h3 className="font-bold text-lg mb-2 hover:text-blue-800 transition duration-300">
            Student Performance
          </h3>
          <p className="text-gray-600">
            Analyze student placements, skill progression, and training needs.
          </p>
          <Link href="/university/performance">
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300">
              View Details
            </button>
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gradient-to-r from-gray-100 to-gray-300 hover:shadow-lg hover:scale-105 hover:shadow-blue-400 transition duration-300">
          <FaClipboardList
            size={40}
            className="text-blue-600 mb-4 hover:text-blue-800 hover:scale-110 transition-transform duration-300"
          />
          <h3 className="font-bold text-lg mb-2 hover:text-blue-800 transition duration-300">
            Job Listings
          </h3>
          <p className="text-gray-600">
            Monitor active job opportunities and employer activity.
          </p>
          <Link href="/university/jobs">
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300">
              Manage Jobs
            </button>
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gradient-to-r from-gray-100 to-gray-300 hover:shadow-lg hover:scale-105 hover:shadow-blue-400 transition duration-300">
          <FaUserTie
            size={40}
            className="text-blue-600 mb-4 hover:text-blue-800 hover:scale-110 transition-transform duration-300"
          />
          <h3 className="font-bold text-lg mb-2 hover:text-blue-800 transition duration-300">
            Employer Engagement
          </h3>
          <p className="text-gray-600">
            Connect with top employers and foster industry partnerships.
          </p>
          <Link href="/university/employers">
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300">
              Explore Employers
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} Talent Bridge. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default UniversityDashboard;
