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
        .catch(() => {
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
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center bg-gradient-to-r from-blue-500 to bg-purple-500 text-white py-6 rounded shadow-lg">
        <h1 className="text-4xl font-bold">Employer Profile</h1>
      </header>

      <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
        {error && <p className="text-red-500 text-center">{error}</p>}

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 font-medium" htmlFor="name">
                Name
              </label>
              <input
                className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
                type="text"
                id="name"
                defaultValue={employee.name}
                name="name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium" htmlFor="company">
                Company
              </label>
              <input
                className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
                type="text"
                id="company"
                defaultValue={employee.company}
                name="company"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium" htmlFor="position">
                Position
              </label>
              <input
                className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
                type="text"
                id="position"
                defaultValue={employee.position || ''}
                name="position"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium" htmlFor="contactNumber">
                Contact Number
              </label>
              <input
                className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
                type="text"
                id="contactNumber"
                defaultValue={employee.contactNumber || ''}
                name="contactNumber"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">{employee.name}</h2>
            <p className="mb-2">
              <strong>Company:</strong> {employee.company}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {employee.email}
            </p>
            <p className="mb-2">
              <strong>Position:</strong> {employee.position || 'N/A'}
            </p>
            <p className="mb-2">
              <strong>Contact Number:</strong> {employee.contactNumber || 'N/A'}
            </p>

            <h3 className="text-xl font-semibold mt-4">Hiring For</h3>
            <ul className="list-disc pl-6 space-y-2">
              {employee.hiringFor?.map((role: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">📌</span>
                  {role}
                </li>
              )) || <li>No hiring roles specified</li>}
            </ul>

            <button
              onClick={handleEditClick}
              className="mt-6 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerProfilePage;
