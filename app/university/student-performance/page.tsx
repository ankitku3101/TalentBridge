'use client';

import React from 'react';

export default function StudentCards() {
  const students = [
    {
      id: 1,
      name: 'John Doe',
      rollNumber: '12345',
      degree: 'B.Tech',
      yoe: 2,
      skills: ['React', 'Node.js', 'CSS'],
      appliedIn: 'Tech Corp',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
    },
    {
      id: 2,
      name: 'Jane Smith',
      rollNumber: '67890',
      degree: 'MBA',
      yoe: 3,
      skills: ['Marketing', 'SEO', 'Leadership'],
      appliedIn: 'Marketing Inc',
      email: 'janesmith@example.com',
      phone: '987-654-3210',
    },
    {
      id: 3,
      name: 'Raj Patel',
      rollNumber: '54321',
      degree: 'M.Tech',
      yoe: 4,
      skills: ['Python', 'AI', 'Machine Learning'],
      appliedIn: 'AI Labs',
      email: 'rajpatel@example.com',
      phone: '456-789-0123',
    },
    {
      id: 4,
      name: 'Emily Johnson',
      rollNumber: '98765',
      degree: 'B.Sc',
      yoe: 1,
      skills: ['Data Analysis', 'Excel', 'SQL'],
      appliedIn: 'Data Analytics Co',
      email: 'emilyj@example.com',
      phone: '654-321-0987',
    },
    {
      id: 5,
      name: 'Amit Sharma',
      rollNumber: '11223',
      degree: 'BCA',
      yoe: 2,
      skills: ['Java', 'Spring Boot', 'Database Management'],
      appliedIn: 'Tech Solutions',
      email: 'amitsharma@example.com',
      phone: '321-654-9870',
    },
    {
      id: 6,
      name: 'Sophia Lee',
      rollNumber: '44556',
      degree: 'M.Sc',
      yoe: 3,
      skills: ['Research', 'Data Science', 'R Programming'],
      appliedIn: 'Research Institute',
      email: 'sophialee@example.com',
      phone: '789-012-3456',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-8 shadow-md">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-wide uppercase">
            Student Record
          </h1>
        </div>
      </header>

      {/* Cards */}
      <main className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-md shadow hover:shadow-lg transform transition duration-200 hover:scale-105"
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold text-blue-700">
                  {student.name}
                </h2>
                <p className="text-gray-600 text-sm">
                  <strong>Roll No:</strong> {student.rollNumber}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Degree:</strong> {student.degree}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>YOE:</strong> {student.yoe} years
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Skills:</strong> {student.skills.join(', ')}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Applied In:</strong> {student.appliedIn}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Email:</strong> {student.email}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Phone:</strong> {student.phone}
                </p>
              </div>
              <div className="bg-indigo-600 text-white text-center p-2">
                <button className="text-sm font-medium hover:bg-blue-700 transition rounded-md px-3 py-1">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        © {new Date().getFullYear()} Talent Bridge. All rights reserved.
      </footer>
    </div>
  );
}
