'use client'

import { useState } from "react";
import toast from "react-hot-toast";

const FetchStudents = () => {
  const [batch, setBatch] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!batch) {
      toast.error("Please enter a valid batch year.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`/api/university/dashboard/batch-student-data/?batch=${batch}`, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.data[0]?.TotalStudents || 0);
        toast.success(data.message || "Data fetched successfully!");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Fetch Student Data</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <label htmlFor="batch" className="text-sm font-medium text-gray-700">
          Batch Year
        </label>
        <input
          type="number"
          id="batch"
          value={batch}
          onChange={(e) => setBatch(Number(e.target.value) || "")}
          placeholder="Enter batch year (e.g., 2024)"
          className="mt-2 mb-4 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded-lg font-medium text-white ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Fetching..." : "Fetch Students"}
        </button>
      </form>
      {result !== null && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg w-full max-w-md">
          <p className="text-lg">
            <strong>Total Students:</strong> {result}
          </p>
        </div>
      )}
    </div>
  );
};

export default FetchStudents;
