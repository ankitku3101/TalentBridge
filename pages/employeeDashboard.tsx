import React from "react";
import { FaUserTie, FaBell, FaPlusCircle } from "react-icons/fa";

// Sample data for jobs
const jobData = [
  {
    jobTitle: "Software Engineer",
    company: "Tech Innovators",
    location: "San Francisco, CA",
  },
  {
    jobTitle: "Product Manager",
    company: "Future Enterprises",
    location: "New York, NY",
  },
  {
    jobTitle: "UX/UI Designer",
    company: "Creative Solutions",
    location: "Austin, TX",
  },
  {
    jobTitle: "Data Scientist",
    company: "Data Labs",
    location: "Chicago, IL",
  },
  {
    jobTitle: "DevOps Engineer",
    company: "Cloud Systems",
    location: "Seattle, WA",
  },
  {
    jobTitle: "Marketing Specialist",
    company: "Brand Boosters",
    location: "Los Angeles, CA",
  },
];

const EmployeeDashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <FaUserTie size={28} />
          <span className="hidden sm:inline text-lg font-semibold">
            Welcome, Employer
          </span>
        </div>

        {/* Add Job Button */}
        <button className="flex items-center bg-white text-indigo-600 px-4 py-2 rounded-md shadow hover:bg-gray-100 transition duration-200">
          <FaPlusCircle className="mr-2" />
          <span className="text-sm font-medium">Post Job</span>
        </button>

        {/* Notification Icon */}
        <div className="relative">
          <FaBell size={28} />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            5
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Job Management Section */}
        {jobData.map((job, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="font-semibold text-xl mb-2 text-indigo-600">
              {job.jobTitle}
            </h3>
            <p className="text-gray-700 font-medium">{job.company}</p>
            <p className="text-gray-600 mb-4">{job.location}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Applicants: {Math.floor(Math.random() * 100)}
              </span>
              <button className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-sm transition duration-200">
                View Details
              </button>
            </div>
          </div>
        ))}
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

export default EmployeeDashboard;
