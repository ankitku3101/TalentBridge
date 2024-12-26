'use client'; 

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const [student, setStudent] = useState<any>(null); // State to store student data
  const [error, setError] = useState<string | null>(null); // Error state
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const router = useRouter();
    // If the session is not found or not loaded, redirect to the login page
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin'); // Redirect to login page if not logged in
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session) {
      // Fetch the student data from the backend API when the session is available
      fetch('/api/profile')
        .then((response) => response.json())
        .then((data) => {
          setStudent(data);
        })
        .catch((err) => {
          setError('Failed to load profile data');
        });
    }
  }, [session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {error && <p>{error}</p>}
      {student ? (
        <div>
          <h2>{student.name}</h2>
          <p>Email: {student.email}</p>
          <p>Degree: {student.degree}</p>
          {/* Add more student data display as per your schema */}
        </div>
      ) : (
        <p>Loading student data...</p>
      )}
    </div>
  );
};

export default ProfilePage;
