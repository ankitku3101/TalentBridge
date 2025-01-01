'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const EmployerProfilePage = () => {
  const [employee, setEmployee] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      window.location.href = '/auth/signin';
    }
  }, [session, status]);

  useEffect(() => {
    if (session) {
      fetch('/api/profile')
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setError(data.message);
          } else {
            setEmployee(data);
          }
        })
        .catch((err) => {
          setError('Failed to load profile data');
        });
    }
  }, [session]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(updatedData);

    const response = await fetch('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    if (result.message) {
      setError(result.message);
    } else {
      setEmployee(result);
      setIsEditing(false);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!employee && !error) {
    return <div>Loading employee data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Employer Profile</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2" htmlFor="name">Name</label>
            <input
              className="w-full p-2 mb-4 border"
              type="text"
              id="name"
              defaultValue={employee.name}
              name="name"
              required
            />
          </div>
          <div>
            <label className="block mb-2" htmlFor="company">Company</label>
            <input
              className="w-full p-2 mb-4 border"
              type="text"
              id="company"
              defaultValue={employee.company}
              name="company"
              required
            />
          </div>
          <div>
            <label className="block mb-2" htmlFor="position">Position</label>
            <input
              className="w-full p-2 mb-4 border"
              type="text"
              id="position"
              defaultValue={employee.position || ''}
              name="position"
            />
          </div>
          <div>
            <label className="block mb-2" htmlFor="contactNumber">Contact Number</label>
            <input
              className="w-full p-2 mb-4 border"
              type="text"
              id="contactNumber"
              defaultValue={employee.contactNumber || ''}
              name="contactNumber"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </form>
      ) : (
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

          <button
            onClick={handleEditClick}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployerProfilePage;
