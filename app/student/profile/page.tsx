'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const [student, setStudent] = useState<any>(null);
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
      // Fetch the student data from the API
      fetch('/api/profile') // Adjust the endpoint as needed
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setError(data.message); // Handle error response from API
          } else {
            setStudent(data); // Set the student data if API response is successful
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

  if (!student && !error) {
    return <div>Loading student data...</div>; // Show loading state for student data
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Student Profile</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {student && !error ? (
        <div>
          <h2 className="text-xl font-bold mb-2">{student.name}</h2>
          <p className="mb-2"><strong>Roll Number:</strong> {student.rollNumber}</p>
          <p className="mb-2"><strong>Degree:</strong> {student.degree}</p>
          <p className="mb-2"><strong>Graduation Year:</strong> {student.graduationYear}</p>
          <p className="mb-2"><strong>Email:</strong> {student.email}</p>
          <p className="mb-2"><strong>Phone:</strong> {student.phone}</p>
          <p className="mb-2"><strong>Age:</strong> {student.age}</p>
          
          <h3 className="text-xl font-semibold mt-4">Skills</h3>
          <ul className="list-disc pl-5">
            {student.skills?.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Student data not available</p>
      )}
    </div>
  );
};

export default ProfilePage;
