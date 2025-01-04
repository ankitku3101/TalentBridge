'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DeleteJob = ({ jobId }: { jobId: string }) => {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter(); // To navigate after successful deletion
  

  const handleDelete = async () => {
    if (!jobId) {
      setError('Job ID is required.');
      return;
    }

    try {
      const response = await fetch(`/api/jobs/deleteJob/${jobId}`, {
        method: 'DELETE',
      });

      // Check if the response is ok before parsing the JSON
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Something went wrong.');
        return;
      }

      // Clear any previous errors and show success message
      setError('');
      setSuccessMessage('Job deleted successfully.');

      // Redirect after successful deletion
      router.push('/your-jobs-page'); // Change to the appropriate page
    } catch (error: any) {
      setError('Error while deleting job: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Delete Job Posting</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

        <button
          onClick={handleDelete}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Delete Job
        </button>
      </div>
    </div>
  );
};

export default DeleteJob;
