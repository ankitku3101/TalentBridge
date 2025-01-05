import UniversityDashboard from '@/pages/universityDashboard';
import Analytics from '../sections/Analytics';
import EmployerList from '../sections/EmployerList';
import SkillGap from '../sections/SkillGap';
 

const Dashboard = () => {
  return (
    <div>
      <div className='h-screen'>
        <Analytics />
      </div>
      <div className='h-screen'>
        <EmployerList />
      </div>
      <div className='h-screen'>
        <SkillGap />
      </div>
    </div>
  );
};

export default Dashboard;