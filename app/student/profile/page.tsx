'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const [student, setStudent] = useState<any>(null);
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
            setStudent(data);
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
      setStudent(result);
      setIsEditing(false);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!student && !error) {
    return <div>Loading student data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white py-6 rounded shadow-lg">
        <h1 className="text-4xl font-bold">Student Profile</h1>
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
                defaultValue={student.name}
                name="name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium" htmlFor="rollNumber">
                Roll Number
              </label>
              <input
                className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
                type="text"
                id="rollNumber"
                defaultValue={student.rollNumber}
                name="rollNumber"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium" htmlFor="degree">
                Degree
              </label>
              <input
                className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
                type="text"
                id="degree"
                defaultValue={student.degree}
                name="degree"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium" htmlFor="graduationYear">
                Graduation Year
              </label>
              <input
                className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
                type="number"
                id="graduationYear"
                defaultValue={student.graduationYear}
                name="graduationYear"
                required
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
            <h2 className="text-2xl font-bold mb-4">{student.name}</h2>
            <p className="mb-2">
              <strong>Roll Number:</strong> {student.rollNumber}
            </p>
            <p className="mb-2">
              <strong>Degree:</strong> {student.degree}
            </p>
            <p className="mb-2">
              <strong>Graduation Year:</strong> {student.graduationYear}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {student.email}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {student.phone}
            </p>
            <p className="mb-2">
              <strong>Age:</strong> {student.age}
            </p>

            <h3 className="text-xl font-semibold mt-4">Skills</h3>
            <ul className="list-disc pl-6 space-y-2">
              {student.skills?.map((skill: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">✅</span>
                  {skill}
                </li>
              ))}
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

export default ProfilePage;
