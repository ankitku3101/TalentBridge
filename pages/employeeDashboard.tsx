'use client';

import React, { useState, useEffect } from "react";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUserTie, FaBell, FaPlusCircle, FaSignOutAlt } from "react-icons/fa";

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
    jobTitle: "UI/UX Designer",
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

const EmployeeDashboard = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    const validateSession = async () => {
      const session = await getSession();
      if (!session || session?.user?.role !== "employer") {
        router.push("/auth/signin"); 
      } else {
        // Assuming first name is stored in `session.user.name` or `session.user.firstName`
        const name = session?.user?.name || session?.user?.firstName;
        setFirstName(name);
      }
    };
    validateSession();
  }, [router]);

  // Sign out handler
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/auth/signin" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-4 flex justify-between items-center shadow-lg">
        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <FaUserTie
            size={28}
            className="hover:scale-125 hover:text-yellow-300 transition-transform duration-300"
          />
          <span className="hidden sm:inline text-lg font-semibold">
            {firstName ? `Welcome, ${firstName}` : "Welcome, Employer"}
          </span>
        </div>

        {/* Add Job Button */}
        <button className="flex items-center bg-yellow-300 text-indigo-800 px-4 py-2 rounded-md shadow-lg hover:bg-yellow-400 hover:shadow-xl transition duration-300">
          <FaPlusCircle className="mr-2 hover:scale-150 transition-transform duration-300" />
          <span className="text-sm font-medium">Post Job</span>
        </button>

        {/* Notification Icon */}
        <div className="relative hover:text-yellow-300 hover:scale-125 transition-transform duration-300">
          <FaBell size={28} />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            5
          </span>
        </div>

        {/* Sign Out Button */}
        <button 
          onClick={handleSignOut} 
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          <FaSignOutAlt className="mr-2" />
          Sign Out
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-b from-blue-50 to-white p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Job Management Section */}
        {jobData.map((job, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl hover:bg-gradient-to-r from-blue-100 to-indigo-100 transform hover:scale-105 transition-transform duration-300"
          >
            <h3 className="font-semibold text-xl mb-2 text-indigo-600 hover:text-blue-700">
              {job.jobTitle}
            </h3>
            <p className="text-gray-700 font-medium">{job.company}</p>
            <p className="text-gray-600 mb-4">{job.location}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Applicants: {Math.floor(Math.random() * 100)}
              </span>
              <button className="text-white bg-indigo-600 hover:bg-blue-600 px-4 py-2 rounded-md text-sm transition duration-200 shadow hover:shadow-md">
                View Details
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} Talent Bridge. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default EmployeeDashboard;
