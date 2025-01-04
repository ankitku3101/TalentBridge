'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function UpdateJob() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams?.get('jobId') || null;

  const handleDelete = async () => {
    console.log(jobId);
    
    if (!jobId) {
      toast.error('Job ID is required.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/jobs/deletejob/${jobId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Job deleted successfully.');
        router.push('/employee/dashboard'); // Redirect to the appropriate page
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to delete job.');
      }
    } catch (error: any) {
      toast.error('Error while deleting job: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Delete Job Posting</h2>
        <p className="mb-4 text-gray-600">Are you sure you want to delete this job?</p>
        <button
          onClick={handleDelete}
          className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-500"
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete Job'}
        </button>
      </div>
    </div>
  );
};

