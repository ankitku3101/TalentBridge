"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const JobListingPage = () => {
  const [companyJobs, setCompanyJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobData = async () => {
    setLoading(true);
    setError(""); // Reset any previous error
    try {
      const response = await axios.get("/api/university/dashboard/job-listing");
      console.log("API Full Response:", response);

      // Extract and log the data
      const { data } = response.data as any;
      console.log("Extracted Data:", data);

      // Validate and transform the data if necessary
      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid response structure: Expected an array");
      }

      const transformedData = data.map((item: any) => ({
        company: item.company || "Unknown Company",
        totalJobs: item.totalDocuments || 0,
      }));

      setCompanyJobs(transformedData);
    } catch (err: any) {
      console.error("Error fetching job data:", err);
      setError(err.message || "Failed to fetch job data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Job Listings by Company</h1>

      {/* Display error message if any */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Loading state */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="space-y-4">
          {/* Render job listings */}
          {companyJobs.length === 0 ? (
            <div>No job listings available.</div>
          ) : (
            <ul className="space-y-4">
              {companyJobs.map((job, index) => (
                <li
                  key={index}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="font-semibold text-xl">{job.company}</h3>
                  <p className="text-gray-600">Total Jobs: {job.totalJobs}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListingPage;
