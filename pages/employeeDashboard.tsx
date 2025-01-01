import React from "react";
import { FaUserTie, FaBell, FaPlusCircle } from "react-icons/fa";

// Types
type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  employmentType: string;
  description: string;
  salary?: string;
  requirements?: string[];
  createdAt: string;
  updatedAt: string;
};

const EmployerDashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const validateSession = async () => {
      const session = await getSession();
      if (!session || session?.user?.role !== "employer") {
        router.push("/auth/signin");
      } else {
        setFirstName(session?.user?.name || "Employer");
        fetchJobs();
      }
    };
    validateSession();
  }, [router, currentPage]);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/jobs/listjobs?page=${currentPage}&limit=10`);
      const data = await response.json();
      if (data.success) {
        setJobs(data.data.jobs);
        setTotalPages(data.data.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const openJobModal = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeJobModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/auth/signin" });
  };

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePostJob = () => {
    router.push("/employee/post-job");
  };

  // Profile Icon Click Handler (Made functional)
  const handleProfileClick = () => {
    router.push("/employee/profile");
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  const JobCard = ({ job }: { job: Job }) => (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl hover:bg-gradient-to-r from-blue-50 to-indigo-50 transform hover:scale-105 transition-all duration-300">
      <h3 className="font-semibold text-xl mb-2 text-indigo-600">{job.title}</h3>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-700">
          <FaBuilding className="mr-2" />
          <span>{job.company}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FaMapMarkerAlt className="mr-2" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FaBriefcase className="mr-2" />
          <span>{job.employmentType}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">
          Posted: {formatDate(job.createdAt)}
        </span>
        <button
          onClick={() => openJobModal(job)}
          className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-sm transition duration-200 shadow hover:shadow-lg flex items-center"
        >
          View Details
        </button>
      </div>
    </div>
  );

  const JobModal = () => {
    if (!selectedJob || !isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-indigo-600">{selectedJob.title}</h2>
            <button
              onClick={closeJobModal}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center text-lg text-gray-700">
                <FaBuilding className="mr-2" />
                <span className="font-semibold">{selectedJob.company}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2" />
                <span>{selectedJob.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaBriefcase className="mr-2" />
                <span>{selectedJob.employmentType}</span>
              </div>
              {selectedJob.salary && (
                <div className="text-green-600 font-semibold">
                  Salary: {selectedJob.salary}
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <p className="text-gray-700 whitespace-pre-line">{selectedJob.description}</p>
            </div>

            {selectedJob.requirements && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <ul className="list-disc list-inside space-y-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="text-gray-700">{req}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 space-y-2 text-sm text-gray-500">
              <div>Posted: {formatDate(selectedJob.createdAt)}</div>
              <div>Last updated: {formatDate(selectedJob.updatedAt)}</div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-end gap-4">
              <button
                onClick={closeJobModal}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
              >
                Close
              </button>
              <button
                onClick={() => {/* Handle edit job */}}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Edit Job
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-4 px-6 md:px-10 flex flex-wrap gap-4 justify-between items-center shadow-lg">
        <div className="flex items-center space-x-4">
          <FaUserTie size={28} className="cursor-pointer hover:scale-125 hover:text-yellow-300 transition-transform duration-300" onClick={handleProfileClick} />
          <span className="text-xl font-semibold">{firstName}'s Dashboard</span>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
          <FaSignOutAlt className="mr-2" />
          Sign Out
        </button>
      </header>

      <main className="flex-1 px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Your Posted Jobs</h2>
          <button
            onClick={handlePostJob}
            className="flex items-center text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-sm"
          >
            <FaPlusCircle className="mr-2" />
            Post a Job
          </button>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </main>

      <JobModal />
    </div>
  );
};

export default EmployerDashboard;
