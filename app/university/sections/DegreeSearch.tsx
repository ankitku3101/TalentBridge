'use client'

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface StudentSkill {
  _id: string;
  name: string;
  email: string;
  skills: { skillname: string }[];
  createdAt: string;
}

interface ApiResponse {
  message: string;
  data: {
    degreeName: string;
    studentCount: number;
    students: StudentSkill[];
  }[];
}

export default function DegreeSearch() {
  const [loading, setLoading] = useState(false);
  const [degrees, setDegrees] = useState<ApiResponse["data"] | null>(null);

  const fetchDegreeData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/university/dashboard/degree-data-all");

      setDegrees(response.data.data);
      toast.success("Data fetched successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Students Grouped by Degree</h1>
      <button
        onClick={fetchDegreeData}
        className={`px-4 py-2 text-white bg-blue-600 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Degree Data"}
      </button>

      {loading && <p className="text-gray-500 mt-4">Loading data...</p>}

      {!loading && degrees && degrees.length > 0 && (
        <div className="mt-6 space-y-4">
          {degrees.map((degree) => (
            <div key={degree.degreeName} className="p-4 border border-gray-300 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">{degree.degreeName}</h2>
              <p className="text-gray-600">Total Students: {degree.studentCount}</p>
              <div className="mt-4 space-y-2">
                {degree.students.map((student) => (
                  <div key={student._id} className="border-t border-gray-200 pt-4">
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.email}</p>
                    <p className="text-sm text-gray-600">
                      Skills: {student.skills.map((skill) => skill.skillname).join(", ")}
                    </p>
                    <p className="text-xs text-gray-400">Joined: {new Date(student.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !degrees?.length && <p className="text-gray-500 mt-4">No degrees or students found.</p>}
    </div>
  );
}
