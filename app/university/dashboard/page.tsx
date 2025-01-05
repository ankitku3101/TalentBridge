'use client'

import EmployerList from '../sections/EmployerList';
import SkillGap from '../sections/SkillGap';
import JobListing from '../sections/Job-listing';
import FetchStudents from '../sections/FetchStudents';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSession, signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {

  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const validateSession = async () => {
        const session = await getSession();
        if (!session || session?.user?.role !== "college") {
          router.push("/auth/signin");
        } else {
          setName(session?.user?.name || "College");
        }
        setLoading(false);
      };
      validateSession();
    }, [router]);

  const handleSignOut = async () => {
      await signOut({ redirect: true, callbackUrl: "/auth/signin" });
   };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="flex justify-between bg-blue-500 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">{name}</h1>
        <div className="flex gap-4">
          <button
            onClick={handleSignOut}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            <FaSignOutAlt className="mr-2" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Job Listing Section */}
      <div className="flex-1 mb-4 bg-white shadow-lg rounded-lg p-6">
        <JobListing />
      </div>

      {/* Employer List Section */}
      <div className="flex-1 mb-4 bg-white shadow-lg rounded-lg p-6">
        <EmployerList />
      </div>

      {/* Skill Gap Section */}
      <div className="flex-1 mb-4 bg-white shadow-lg rounded-lg p-6">
        <SkillGap />
      </div>

      {/* Fetch Students Section */}
      <div className="flex-1 mb-4 bg-white shadow-lg rounded-lg p-6">
        <FetchStudents />
      </div>
      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Talent Bridge. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/privacy" className="text-yellow-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-yellow-300">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-yellow-300">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
