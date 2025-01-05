import UniversityDashboard from '@/pages/universityDashboard';
import EmployerList from '../sections/EmployerList';
import SkillGap from '../sections/SkillGap';
import JobListing from '../sections/Job-listing';
import FetchStudents from '../sections/FetchStudents';
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Job Listing Section */}
      <div className="flex-1 mb-4 bg-white shadow-lg rounded-lg p-6">
        <JobListing />
      </div>

      {/* Fetch Students Section */}
      <div className="flex-1 mb-4 bg-white shadow-lg rounded-lg p-6">
        <FetchStudents />
      </div>

      {/* Employer List Section */}
      <div className="flex-1 mb-4 bg-white shadow-lg rounded-lg p-6">
        <EmployerList />
      </div>

      {/* Skill Gap Section */}
      <div className="flex-1 mb-4 bg-white shadow-lg rounded-lg p-6">
        <SkillGap />
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Talent Bridge. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/privacy" className="text-yellow-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-yellow-300">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-yellow-300">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
