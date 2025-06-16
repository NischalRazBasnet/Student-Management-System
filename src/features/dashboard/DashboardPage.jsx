import { useState, useMemo } from 'react';
import { useGetCoursesQuery } from '../course/courseApi';
import DashboardTable from './DashboardTable';
import { FaUsers, FaBook, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { Input } from '@material-tailwind/react';
import { useGetStudentsQuery } from '../student/studentApi';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: studentsData,
    isLoading: isLoadingStudents,
    error: studentsError,
  } = useGetStudentsQuery();

  const {
    data: coursesData,
    isLoading: isLoadingCourses,
    error: coursesError,
  } = useGetCoursesQuery();

  const stats = useMemo(() => {
    const totalStudents = studentsData?.length || 0;
    const totalCourses = coursesData?.length || 0;
    const newEnrollments =
      studentsData?.filter(
        (s) =>
          new Date(s.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length || 0;

    return [
      {
        title: 'Total Students',
        value: totalStudents,
        icon: <FaUsers className='text-2xl' />,
      },
      {
        title: 'Total Courses',
        value: totalCourses,
        icon: <FaBook className='text-2xl' />,
      },
      {
        title: 'New Enrollments',
        value: newEnrollments,
        icon: <FaCalendarAlt className='text-2xl' />,
      },
    ];
  }, [studentsData, coursesData]);

  if (isLoadingStudents || isLoadingCourses) {
    return (
      <div className='flex justify-center mt-10'>
        <div className='loading loading-spinner text-primary w-12 h-12'></div>
      </div>
    );
  }

  if (studentsError || coursesError) {
    const error = studentsError || coursesError;
    return (
      <div className='alert alert-error max-w-3xl mx-auto mt-8'>
        <div className='flex-1'>
          <h2 className='text-xl font-bold'>
            {error?.data?.message || 'Error loading data'}
          </h2>
          <p>Status: {error?.status}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='p-4 text-2xl md:text-3xl font-bold text-primary'>
          Welcome Admin,
        </h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {stats.map((stat, index) => (
          <div key={index} className='card bg-base-100 shadow-sm'>
            <div className='card-body p-4 md:p-5'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-gray-400 text-sm font-medium'>
                    {stat.title}
                  </h3>
                  <p className='text-2xl md:text-3xl font-bold mt-1'>
                    {stat.value}
                  </p>
                </div>
                <div className='p-3 rounded-full bg-primary text-gray-200'>
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='bg-base-100 rounded-xl shadow-sm md:p-6'>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-1'>
          <div className='tabs tabs-boxed rounded-2xl  bg-base-200  p-1'>
            {['students', 'courses'].map((tab) => (
              <button
                key={tab}
                className={`tab ${
                  activeTab === tab
                    ? 'tab-active bg-primary rounded-2xl transition-all ease-in duration-300 text-gray-200 text-lg'
                    : ''
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className='w-full md:w-64'>
            <div className='form-control'>
              <div className='input-group'>
                <Input
                  value={searchTerm}
                  className='input-primary appearance-none !border-primary focus:!border-primary text-white placeholder:text-gray-500 placeholder:opacity-80 text-sm sm:text-base hover:scale-100'
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  name='search'
                  placeholder='Search'
                  icon={<FaSearch />}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size='md'
                />
              </div>
            </div>
          </div>
        </div>

        <DashboardTable
          activeTab={activeTab}
          students={studentsData || []}
          courses={coursesData || []}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
