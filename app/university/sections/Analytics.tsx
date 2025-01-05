"use client"
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

// TypeScript Interface for Chart Data
interface ChartData {
  labels: string[]; // Labels for x-axis
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }[];
}

const StudentAnalytics: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("/api/analytics/students"); // Replace with your backend API
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Transform data for Chart.js
        const degrees = Object.keys(data); // Degree names (e.g., "B.Tech", "MBA")
        const studentCounts = Object.values(data); // Number of students per degree

        setChartData({
          labels: degrees,
          datasets: [
            {
              label: "Students per Degree",
              data: studentCounts as number[],
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Student Analytics</h1>
      <div className="bg-white shadow-md p-6 rounded-md">
        {chartData && (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default StudentAnalytics;
