"use client";
import React, { useEffect, useState } from "react";

const JobListingTablePage = () => {
  const [jobData, setJobData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fetch job data from the backend API
  const fetchJobData = async () => {
    setLoading(true);
    setError(""); // Reset error state

    try {
      const response = await fetch("/api/university/dashboard/job-listing-all-company");

      if (!response.ok) {
        throw new Error("Error fetching employer data");
      }

      const { data } = await response.json();
      setJobData(data); // Set the data to state
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch job data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Job Openings by Company</h1>

      {/* Show error if any */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Loading state */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          {/* If there's data, display it in a table */}
          {jobData.length === 0 ? (
            <div>No job openings found.</div>
          ) : (
            <div>
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left border-b">Company Name</th>
                    <th className="px-4 py-2 text-left border-b">Job Openings</th>
                  </tr>
                </thead>
                <tbody>
                  {jobData.map((item: any) => (
                    <tr key={item.companyName}>
                      <td className="px-4 py-2 border-b">{item.companyName}</td>
                      <td className="px-4 py-2 border-b">{item.jobCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListingTablePage;
