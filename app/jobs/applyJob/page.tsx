"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { FaArrowLeft } from 'react-icons/fa';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


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
  const [job, setJob] = useState<Job | null>(null); // Job data from the backend
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const jobId = "12345"; // Replace this with actual jobId passed via URL or props

  useEffect(() => {
    // Fetch the job details from the backend using the jobId
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${jobId}`);
        const jobData = await res.json();
        setJob(jobData);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle application submission logic
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student: "studentId", // replace with actual student ID
          job: job?._id,
          coverLetter,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        
        router.push('/student/dashboard');
      } else {
        console.error('Failed to submit the application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4">
      <header className="flex items-center justify-between bg-blue-600 text-white p-4">
        <FaArrowLeft size={28} className="cursor-pointer" onClick={() => router.push('/student/dashboard')} />
        <h1 className="text-2xl font-bold">Apply for Job</h1>
      </header>

      {job ? (
        <form onSubmit={handleSubmit} className="mt-6">
          <Card className="shadow-md rounded-lg">
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <p className="text-gray-700 text-sm">{job.company}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{job.description}</p>
              <div className="mb-4">
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">Cover Letter</label>
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
        <p className="mt-6 text-center text-gray-500">Loading job details...</p>
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
