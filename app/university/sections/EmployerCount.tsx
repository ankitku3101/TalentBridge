
"use client"
import React, { useEffect, useState } from "react";

const EmployerCount: React.FC = () => {
  const [employers, setEmployers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch employer data from the backend API
  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employers");
        if (!response.ok) {
          throw new Error("Failed to fetch employer data");
        }
        const data = await response.json();
        setEmployers(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching employer data");
        setLoading(false);
      }
    };

    fetchEmployerData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gradient-to-r from-gray-100 to-gray-300 hover:shadow-lg hover:scale-105 hover:shadow-blue-400 transition duration-300">
      <h2 className="font-bold text-xl mb-4 text-blue-600">Employer & Employee Count</h2>
      <div className="space-y-4">
        {employers.map((employer, index) => (
          <div key={index} className="flex justify-between items-center p-4 border-b">
            <span className="text-lg font-semibold">{employer.company}</span>
            <span className="text-gray-500">{employer.employees} Employees</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerCount;
