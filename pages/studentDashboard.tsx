import { FaUserCircle, FaBell, FaSearch } from 'react-icons/fa';

const StudentDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        {/* Profile Icon */}
        <div className="flex items-center space-x-4">
          <FaUserCircle size={28} />
        </div>

        {/* Search Box */}
        <div className="flex items-center bg-white text-black rounded-md p-2">
          <FaSearch className="mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none w-full"
          />
        </div>

        {/* Notification Icon */}
        <FaBell size={28} />
      </header>

      {/* Body */}
      <main className="flex-1 bg-gray-100 p-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Job-related cards */}
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-4 hover:shadow-lg"
          >
            <h3 className="font-bold text-lg">Job Title {index + 1}</h3>
            <p className="text-gray-600">Company Name</p>
            <p className="text-gray-600">Location</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default StudentDashboard;
