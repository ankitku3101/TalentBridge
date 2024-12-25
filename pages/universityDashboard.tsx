import React from "react";
import Link from "next/link";
import { FaUniversity, FaUserTie, FaChartBar, FaBell, FaClipboardList } from "react-icons/fa";

const UniversityDashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <FaUniversity size={28} />
          <span className="hidden sm:inline text-lg font-semibold">
            Welcome, University Admin
          </span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <FaBell size={28} />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Overview Cards */}
        <div className="bg-white shadow-md rounded-md p-6 hover:shadow-lg">
          <FaChartBar size={40} className="text-blue-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">Student Performance</h3>
          <p className="text-gray-600">Analyze student placements, skill progression, and training needs.</p>
          <Link href="/university/performance">
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
              View Details
            </button>
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-md p-6 hover:shadow-lg">
          <FaClipboardList size={40} className="text-blue-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">Job Listings</h3>
          <p className="text-gray-600">Monitor active job opportunities and employer activity.</p>
          <Link href="/university/jobs">
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
              Manage Jobs
            </button>
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-md p-6 hover:shadow-lg">
          <FaUserTie size={40} className="text-blue-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">Employer Engagement</h3>
          <p className="text-gray-600">Connect with top employers and foster industry partnerships.</p>
          <Link href="/university/employers">
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
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
