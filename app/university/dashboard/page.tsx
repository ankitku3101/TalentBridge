import UniversityDashboard from '@/pages/universityDashboard';
// import Analytics from '../sections/Analytics';
import EmployerCount from '../sections/EmployerCount';
import SkillGap from '../sections/SkillGap';
import JobListing from '../sections/Job-listing';
 

const Dashboard = () => {
  return (
    <div>
      {/* <div className='h-screen'>
        <Analytics />
      </div> */}
      <div className='h-screen'>
        <JobListing />
      </div>
      <div className='h-screen'>
        <EmployerCount />
      </div>
      <div className='h-screen'>
        <SkillGap />
      </div>
    </div>
  );
};

export default Dashboard;