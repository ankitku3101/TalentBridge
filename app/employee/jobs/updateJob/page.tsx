'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function UpdateJob() {
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    employmentType: '',
    skillsRequired: '',
    minSalary: '',
    maxSalary: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId'); // Get the job ID from the query string

  useEffect(() => {
    if (!jobId) {
      toast.error('No Job ID provided.');
      router.push('/employee/jobs'); // Redirect back if no job ID
    }
    // Optionally, fetch the current job details here to prefill the form
  }, [jobId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          skillsRequired: formData.skillsRequired.split(',').map((skill) => skill.trim()),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Job updated successfully!');
        router.push('/employee/jobs'); // Redirect to the jobs listing page
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update job.');
      }
    } catch (error: any) {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4">Update Job Details</h1>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium">
            Location
          </label>
          <input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="employmentType" className="block text-sm font-medium">
            Employment Type
          </label>
          <input
            id="employmentType"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="skillsRequired" className="block text-sm font-medium">
            Skills Required (comma-separated)
          </label>
          <input
            id="skillsRequired"
            name="skillsRequired"
            value={formData.skillsRequired}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="minSalary" className="block text-sm font-medium">
            Minimum Salary
          </label>
          <input
            id="minSalary"
            name="minSalary"
            type="number"
            value={formData.minSalary}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="maxSalary" className="block text-sm font-medium">
            Maximum Salary
          </label>
          <input
            id="maxSalary"
            name="maxSalary"
            type="number"
            value={formData.maxSalary}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-500"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Job'}
        </button>
      </form>
    </div>
  );
}
