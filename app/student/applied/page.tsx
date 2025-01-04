"use client";
import { useEffect, useState } from "react";

const AppliedJobsPage = () => {
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAppliedJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/applies/appliedlist");
      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data && Array.isArray(data.data)) {
        setAppliedJobs(data.data);
      } else {
        console.warn("Unexpected response structure. Defaulting to empty array.");
        setAppliedJobs([]);
      }
    } catch (err: any) {
      console.error("Error fetching applied jobs:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-500">Applied Jobs</h1>

      {error && <div className="text-red-500 text-center mb-6">{error}</div>}

      {loading ? (
        <div className="text-center text-xl font-semibold text-gray-700">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliedJobs.length === 0 ? (
            <div className="text-center text-lg font-semibold text-gray-500">
              No jobs applied yet.
            </div>
          ) : (
            appliedJobs.map((job: any, index: number) => (
              <div
                key={job?.Job?._id ? `${job?.Job?._id}-${index}` : `applied-job-${index}`}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <h2 className="font-semibold text-lg text-gray-800">
                  {job?.Job?.title || "No Title"}
                </h2>
                <p className="text-gray-600 mt-2">{job?.Job?.description || "No Description"}</p>
                <p className="text-sm text-gray-500 mt-4">{job?.Job?.company || "No Company Info"}</p>
                <p className="text-sm text-gray-500">{job?.Job?.location || "No Location Info"}</p>
                <div className="mt-4">
                  <span className="font-semibold text-gray-700">Salary:</span>
                  <span className="text-gray-600">
                    {job?.Job?.minSalary || "N/A"} - {job?.Job?.maxSalary || "N/A"}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold text-gray-700">Employment Type:</span>
                  <span className="text-gray-600">{job?.Job?.employmentType || "N/A"}</span>
                </div>
                <div className="mt-6">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AppliedJobsPage;
