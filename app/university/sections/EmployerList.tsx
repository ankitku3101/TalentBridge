"use client"
import React, { useEffect, useState } from "react";

interface Employer {
  _id: string;
  name: string;
  email: string;
  company: string;
}

const EmployerList: React.FC = () => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployerData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/university/dashboard/employer-listing"); // Backend API endpoint

      if (!response.ok) {
        throw new Error("Failed to fetch employer data");
      }

      const data = await response.json();
      const employerDocs = data?.data?.[0]?.documents || []; // Extract documents from response
      setEmployers(employerDocs);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployerData();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="font-bold text-2xl mb-4 text-black-600">Employer List</h2>

      {/* Loading and Error States */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Employer Data */}
      {!loading && !error && employers.length === 0 && (
        <p className="text-gray-700">No employer data available.</p>
      )}

      {!loading && !error && employers.length > 0 && (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Company</th>
            </tr>
          </thead>
          <tbody>
            {employers.map((employer) => (
              <tr key={employer._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{employer.name}</td>
                <td className="border border-gray-300 px-4 py-2">{employer.email}</td>
                <td className="border border-gray-300 px-4 py-2">{employer.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployerList;
