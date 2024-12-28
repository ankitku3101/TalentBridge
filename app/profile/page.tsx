'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const [student, setStudent] = useState<any>(null); 
  const [error, setError] = useState<string | null>(null); 
  const { data: session, status } = useSession(); 
  const [isClient, setIsClient] = useState(false); 
  const [routerReady, setRouterReady] = useState(false); // Ensure router is ready
  let router = useRouter();

  // Check if the component is mounted on the client
  useEffect(() => {
    setIsClient(true); // This will ensure the next hook executes only on the client side
  }, []);

  useEffect(() => {
     router = useRouter();
    if (isClient) {
      setRouterReady(true); // Now that it's on the client side, the router can be used
    }
  }, [isClient]);

  useEffect(() => {
    if (!routerReady) return; // Prevent running the router logic if the router is not ready

    // If the session is not found or not loaded, redirect to the login page
    if (status === 'loading') return; // Avoid running while loading
    if (!session) {
      router.push('/auth/signin'); // Redirect to login page if not logged in
    }
  }, [status, session, router, routerReady]);

  useEffect(() => {
    if (session) {
      // Fetch the student data from the backend API when the session is available
      fetch('/api/profile')
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
    <div>
      <h1>Profile Page</h1>
      {error && <p>{error}</p>} 
      {student && !error ? (
        <div>
          <h2>{student.name}</h2>
          <p>Roll Number: {student.rollNumber}</p>
          <p>Degree: {student.degree}</p>
          <p>Graduation Year: {student.graduationYear}</p>
          <p>Email: {student.email}</p>
          <p>Phone: {student.phone}</p>
          <p>Age: {student.age}</p>
          <h3>Skills</h3>
          <ul>
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
