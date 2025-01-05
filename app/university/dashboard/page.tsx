import UniversityDashboard from '@/pages/universityDashboard';
import Analytics from '../sections/Analytics';
import EmployerCount from '../sections/EmployerCount';
import SkillGap from '../sections/SkillGap';
import FetchStudents from '../sections/FetchStudents';
 

const Dashboard = () => {
  return (
    <div className='flex flex-col'>
      <div className='h-40 p-8'>
        <h1 className='text-center font-semibold text-5xl tracking-tight'>
          University Dashboard
        </h1>
      </div>
      <div className='h-screen'>
        <Analytics />
      </div>
      <div className='h-screen'>
        <FetchStudents />
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