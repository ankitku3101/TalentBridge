'use client';

import { useState } from 'react';

const DeleteJob = () => {
  const [jobId, setJobId] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleDelete = async () => {
    if (!jobId) {
      setError('Job ID is required.');
      return;
    }

    try {
      const response = await fetch(`/api/job/delete/${jobId}`, {
        method: 'DELETE',
      });

      // Check if the response is ok before parsing the JSON
      if (!response.ok) {
        const text = await response.text(); // Read the response as text
        let data;
        try {
          data = JSON.parse(text); // Parse the JSON if valid
        } catch (err) {
          setError('Failed to parse the server response.');
          return;
        }
        setError(data.error || 'Something went wrong.');
        return;
      }

      // Clear any previous errors and show success message
      setError('');
      setSuccessMessage('Job deleted successfully.');
      setJobId(''); // Reset jobId input
    } catch (error) {
      setError('Error while deleting job: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Delete Job Posting</h2>

        <div className="mb-4">
          <label htmlFor="jobId" className="block text-sm font-medium text-gray-700">
            Job ID
          </label>
          <input
            type="text"
            id="jobId"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter the Job ID to delete"
          />
        </div>

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
