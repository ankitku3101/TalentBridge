'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const EmployeeProfilePage = () => {
  const [employee, setEmployee] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    // If the session is loading, do nothing
    if (status === 'loading') return;

    // If session is not available, redirect to the sign-in page
    if (!session) {
      window.location.href = '/auth/signin'; // Redirect using window.location
    }
  }, [session, status]);

  useEffect(() => {
    if (session) {
      // Fetch the employee data from the API
      fetch('/api/profile') // Adjust the endpoint as needed
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setError(data.message); // Handle error response from API
          } else {
            setEmployee(data); // Set the employee data if API response is successful
          }
        })
        .catch((err) => {
          setError('Failed to load profile data'); // Handle fetch error
        });
    }
  }, [session]); // Re-fetch data when session changes

  if (status === 'loading') {
    return <div>Loading...</div>; // Show loading state while session is being fetched
  }

  if (!employee && !error) {
    return <div>Loading employee data...</div>; // Show loading state for employee data
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Employer Profile</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {employee && !error ? (
        <div>
          <h2 className="text-xl font-bold mb-2">{employee.name}</h2>
          <p className="mb-2"><strong>Company:</strong> {employee.company}</p>
          <p className="mb-2"><strong>Email:</strong> {employee.email}</p>
          <p className="mb-2"><strong>Position:</strong> {employee.position || 'N/A'}</p>
          <p className="mb-2"><strong>Contact Number:</strong> {employee.contactNumber || 'N/A'}</p>
          <h3 className="text-xl font-semibold mt-4">Hiring For</h3>
          <ul className="list-disc pl-5">
            {employee.hiringFor?.map((role: string, index: number) => (
              <li key={index}>{role}</li>
            )) || <li>No hiring roles specified</li>}
          </ul>
        </div>
      ) : (
        <p>Employee data not available</p>
      )}
    </div>
  );
};

export default EmployeeProfilePage;
