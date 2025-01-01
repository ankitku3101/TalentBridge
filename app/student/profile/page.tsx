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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Student Profile</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2" htmlFor="name">Name</label>
            <input
              className="w-full p-2 mb-4 border"
              type="text"
              id="name"
              defaultValue={student.name}
              name="name"
              required
            />
          </div>
          <div>
            <label className="block mb-2" htmlFor="rollNumber">Roll Number</label>
            <input
              className="w-full p-2 mb-4 border"
              type="text"
              id="rollNumber"
              defaultValue={student.rollNumber}
              name="rollNumber"
              required
            />
          </div>
          <div>
            <label className="block mb-2" htmlFor="degree">Degree</label>
            <input
              className="w-full p-2 mb-4 border"
              type="text"
              id="degree"
              defaultValue={student.degree}
              name="degree"
              required
            />
          </div>
          <div>
            <label className="block mb-2" htmlFor="graduationYear">Graduation Year</label>
            <input
              className="w-full p-2 mb-4 border"
              type="number"
              id="graduationYear"
              defaultValue={student.graduationYear}
              name="graduationYear"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </form>
      ) : (
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

export default ProfilePage;
