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
    setStudentId(session?.user.id || "id");
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
    <div className="flex flex-col min-h-screen p-4">
      <header className="flex items-center justify-between bg-blue-600 text-white p-4">
        <FaArrowLeft size={28} className="cursor-pointer" onClick={() => router.push("/student/dashboard")} />
        <h1 className="text-2xl font-bold">Apply for Job</h1>
      </header>

      {loading ? (
        <p className="mt-6 text-center text-gray-500">Loading job details...</p>
      ) : job ? (
        <form onSubmit={handleSubmit} className="mt-6">
          <Card className="shadow-md rounded-lg">
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <p className="text-gray-700 text-sm">{job.company}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{job.description}</p>
              <div className="mb-4">
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={6}
                  className="w-full p-2 border rounded-md mt-1"
                  placeholder="Write your cover letter here..."
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Submit Application
              </button>
            </CardFooter>
          </Card>
        </form>
      ) : (
        <p className="mt-6 text-center text-gray-500">Job not found.</p>
      )}

      {isSubmitted && (
        <div className="mt-4 text-green-600 text-center">
          <p>Application Submitted Successfully!</p>
        </div>
      )}
    </div>
  );
};

export default ApplyJobPage;
