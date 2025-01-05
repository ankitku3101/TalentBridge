'use client'

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Student {
  _id: string;
  name: string;
  degree: string;
  graduationYear: number;
  skills: string[];
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Student[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error("Please enter a search term.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://mole-model-drake.ngrok-free.app/candidate-search", {
        query: query.trim(),
      });

      const data = response.data as any;
      if (data.matching_students?.length > 0) {
        setResults(data.matching_students);
        toast.success("Results found!");
      } else {
        setResults([]);
        toast.error("No matching students found.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to fetch results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">Candidate Search</h1>

      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for candidates..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={handleSearch}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {loading && <p className="text-gray-500">Searching...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((student) => (
          <div
            key={student._id}
            className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg"
          >
            <h2 className="text-lg font-bold">{student.name}</h2>
            <p className="text-gray-600">Degree: {student.degree}</p>
            <p className="text-gray-600">Graduation Year: {student.graduationYear}</p>
            <p className="text-gray-600">
              Skills: {student.skills.length > 0 ? student.skills.join(", ") : "No skills listed"}
            </p>
          </div>
        ))}
      </div>

      {!loading && results.length === 0 && query && (
        <p className="text-gray-500 mt-4">No results found for "{query}".</p>
      )}
    </div>
  );
}
