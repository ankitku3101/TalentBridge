"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "next-auth/react";

interface Job {
  _id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  employmentType: string;
  salaryRange?: string;
  skillsRequired: string[];
}

const ApplyJobPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams?.get("jobId") || null;

  const [job, setJob] = useState<Job | null>(null);
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const validateSession = async () => {
    const session = await getSession();
    setStudentId(session?.user.id || null);
  };

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/jobs/get-single-job/${jobId}`);
      const data = await res.json();

      if (res.ok) {
        setJob(data.data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateSession();
    if (jobId) fetchJobDetails();
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/applies/formapply/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: studentId,
          job: jobId,
          coverLetter,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        router.push("/student/dashboard");
      } else {
        console.error("Failed to submit the application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white shadow-lg">
        <div className="absolute left-4 top-6">
          <button
            onClick={() => router.push("/student/dashboard")}
            className="flex items-center space-x-2 text-sm bg-white text-blue-600 px-3 py-2 rounded-md shadow-md hover:bg-blue-50 transition duration-300"
          >
            <FaArrowLeft />
            <span>Back to Dashboard</span>
          </button>
        </div>
        <h1 className="text-center text-3xl font-semibold">Apply for Job</h1>
      </header>

      {/* Main Content */}
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">Loading job details...</p>
        </div>
      ) : job ? (
        <form onSubmit={handleSubmit} className="px-6 py-8">
          <Card className="max-w-3xl mx-auto shadow-md rounded-lg">
            <CardHeader className="bg-blue-50 p-4 rounded-t-lg">
              <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
              <p className="text-gray-600">{job.company}</p>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">{job.description}</p>
              <div>
                <label
                  htmlFor="coverLetter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={6}
                  className="w-full p-3 border rounded-md mt-2 text-gray-800"
                  placeholder="Write your cover letter here..."
                />
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-gray-50 flex justify-end rounded-b-lg">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Submit Application
              </button>
            </CardFooter>
          </Card>
        </form>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">Job not found.</p>
        </div>
      )}

      {/* Success Message */}
      {isSubmitted && (
        <div className="mt-4 text-center text-green-600">
          <p>Application Submitted Successfully!</p>
        </div>
      )}
    </div>
  );
};

export default ApplyJobPage;
