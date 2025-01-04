'use client';

import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserTie, FaSignOutAlt, FaSearch } from "react-icons/fa";

const StudentDashboard = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [jobs, setJobs] = useState<any[]>([]); // State for jobs
  const [error, setError] = useState<string | null>(null); // State for error

  useEffect(() => {
    const validateSession = async () => {
      const session = await getSession();
      if (!session || session?.user?.role !== "student") {
        router.push("/auth/signin");
      } else {
        setFirstName(session?.user?.name || "Student");
      }
      setLoading(false);
    };
    validateSession();
  }, [router]);

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams({
        title: searchQuery, // You can add other filters here
        page: '1',
        limit: '10',
      });
      const response = await fetch(`/api/applies/list-all-jobs?${params.toString()}`);
      const data = await response.json();
      if (data.success) {
        setJobs(data.data.jobs);
      } else {
        setError(data.message || "Failed to fetch jobs");
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs");
    }
  };
  

  const handleProfileClick = () => {
    router.push("/student/profile");
  };

  useEffect(() => {
    fetchJobs();
  }, []); // Fetch jobs when component mounts

  // Sign out handler
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/auth/signin" });
  };

  // Filter job data based on search query
  const filteredJobs = jobs.filter((job) => {
    const createdAtDate = new Date(job.createdAt);
    const formattedDate = createdAtDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  
    return (
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formattedDate.toLowerCase().includes(searchQuery.toLowerCase())
    );
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-4 px-10 flex justify-between items-center shadow-lg">
        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <FaUserTie onClick={handleProfileClick}
            size={28}
            className="hover:scale-125 hover:text-yellow-300 transition-transform duration-300"
          />
          <span className="hidden sm:inline text-lg font-semibold">
            Welcome, {firstName}
          </span>
        </div>

        {/* Search Job Section */}
        <div className="flex items-center bg-white text-black rounded-md p-2 max-w-xs">
          <FaSearch className="mr-2" />
          <input
            type="text"
            placeholder="Search jobs"
            className="outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
      <main className="flex-1 bg-gradient-to-b from-blue-50 to-white py-6 px-20 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Error Message */}
        {error && (
          <div className="text-red-500 mb-4 text-lg font-semibold">
            {error}
          </div>
        )}

        {/* Job Management Section */}
        {filteredJobs.map((job, index) => (
  <div
    key={job.id || `job-${index}`} // Fallback to index if job.id is not unique
    className="bg-white shadow-lg rounded-lg p-6 m-2 hover:shadow-2xl hover:bg-gradient-to-r from-blue-100 to-indigo-100 transform hover:scale-105 transition-transform duration-300"
  >
    <h3 className="font-semibold text-xl mb-2 text-indigo-600 hover:text-blue-700">
      {job.jobTitle}
    </h3>
    <p className="text-gray-700 font-medium">{job.company}</p>
    <p className="text-gray-600 mb-4">{job.location}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">
        Posted:{" "}
        {new Date(job.createdAt).toLocaleString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </span>
      <button
        onClick={() => router.push(`/student/jobs/applyJob?jobId=${job._id}`)}
        className="text-white bg-indigo-600 hover:bg-blue-600 px-4 py-2 rounded-md text-sm transition duration-200 shadow hover:shadow-md"
      >
        Apply
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

export default StudentDashboard;
