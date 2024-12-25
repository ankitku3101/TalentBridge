"use client";

import React from "react";
import Link from "next/link";
import { FaUniversity, FaUserTie, FaChartBar, FaBell, FaClipboardList } from "react-icons/fa";

const UniversityDashboard: React.FC = () => {
  const handleViewDetails = (section: string) => {
    console.log(`Navigating to ${section} section`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <FaUniversity size={28} className="text-white" />
          <span className="hidden sm:inline text-lg font-semibold">
            Welcome, University Admin
          </span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <FaBell size={28} className="text-white cursor-pointer" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Overview Cards */}
        <Card
          icon={<FaChartBar size={40} className="text-blue-600 mb-4" />}
          title="Student Performance"
          description="Analyze student placements, skill progression, and training needs."
          buttonLabel="View Details"
          onClick={() => handleViewDetails("Student Performance")}
          link="/university/performance"
        />
        <Card
          icon={<FaClipboardList size={40} className="text-blue-600 mb-4" />}
          title="Job Listings"
          description="Monitor active job opportunities and employer activity."
          buttonLabel="Manage Jobs"
          onClick={() => handleViewDetails("Job Listings")}
          link="/university/jobs"
        />
        <Card
          icon={<FaUserTie size={40} className="text-blue-600 mb-4" />}
          title="Employer Engagement"
          description="Connect with top employers and foster industry partnerships."
          buttonLabel="Explore Employers"
          onClick={() => handleViewDetails("Employer Engagement")}
          link="/university/employers"
        />
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

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
  link: string;
}

const Card: React.FC<CardProps> = ({ icon, title, description, buttonLabel, onClick, link }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-6 hover:shadow-lg transition-shadow duration-200">
      {icon}
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <Link href={link}>
        <button
          onClick={onClick}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {buttonLabel}
        </button>
      </Link>
    </div>
  );
};

export default UniversityDashboard;
