import UniversityDashboard from '@/pages/universityDashboard';
import Analytics from '../sections/DegreeSearch';
import SkillGap from '../sections/SkillGap';
import FetchStudents from '../sections/FetchStudents';
import EmployerList from '../sections/EmployerList';
 

const Dashboard = () => {
  return (
    <div className='flex flex-col'>
      <div className='h-40 p-8'>
        <h1 className='text-center font-semibold text-5xl tracking-tight'>
          University Dashboard
        </h1>
      </div>
      <div className='h-full'>
        <Analytics />
      </div>
      <div className='h-full'>
        <FetchStudents />
      </div>
      <div className='h-full'>
        <EmployerList />
      </div>
      <div className='h-full'>
        <SkillGap />
      </div>
    </div>
  );
};

export default Dashboard;