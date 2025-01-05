'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface SkillData {
  skillname: string;
  studentCount: number;
}

interface ApiResponse {
  data: SkillData[];
  message: string;
}

export default function SkillGap() {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<SkillData[]>([]);

  // Fetch skills data from the API
  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const response = await axios.post<ApiResponse>("/api/university/dashboard/student-listing", { skills: [] }); // Sending an empty skills array
        setSkills(response.data.data); // TypeScript now knows the structure of response.data
        toast.success("Skills data loaded successfully!");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch skills data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Skills and Applicant Count</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : skills.length > 0 ? (
        <div className="space-y-4">
          {skills.map((skill) => (
            <div
              key={skill.skillname}
              className="p-4 border border-gray-300 rounded-lg shadow-sm"
            >
              <h2 className="text-xl font-semibold">{skill.skillname}</h2>
              <p className="text-gray-600">Applicants: {skill.studentCount}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No skills data available.</p>
      )}
    </div>
  );
}
