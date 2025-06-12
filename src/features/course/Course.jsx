import { useParams } from 'react-router-dom';
import { FaEdit, FaTrash, FaArrowLeft, FaBook, FaClock } from 'react-icons/fa';
import { IoDocument } from 'react-icons/io5';
import { HiChartBar } from 'react-icons/hi2';
import { Spinner } from '@material-tailwind/react';
import { NavLink, useNavigate } from 'react-router';
import { useGetCourseQuery } from './courseApi';
import DetailItem from '../../components/DetailItem';

const Course = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const { data: course, isLoading, error } = useGetCourseQuery(id);
  console.log(course);

  if (isLoading) {
    return (
      <div className='flex justify-center mt-10'>
        <Spinner className='h-8 w-8' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center p-10'>
        <h2 className='text-red-500 text-xl font-bold'>
          {error?.data?.message || 'Error loading students'}
        </h2>
        <p className='text-gray-600 mt-2'>Status: {error?.status}</p>
      </div>
    );
  }
  if (!course) {
    return (
      <div className='max-w-4xl mx-auto p-6 text-center'>
        <h2 className='text-2xl font-bold mb-4'>Student Not Found</h2>
        <p>The requested student could not be found.</p>
        <button
          onClick={() => nav(-1)}
          className='mt-4 inline-flex items-center text-primary hover:underline'
        >
          <FaArrowLeft className='mr-2' /> Back
        </button>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-4 md:p-6 bg-base-300 rounded-lg shadow-md'>
      <div className='flex justify-between items-center mb-6'>
        <button
          onClick={() => nav(-1)}
          className='mt-4 inline-flex items-center text-white hover:text-primary cursor-pointer'
        >
          <FaArrowLeft className='mr-2' /> Back
        </button>
        <div className='flex space-x-3'>
          <NavLink
            to={`/students/edit/${id}`}
            className='flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/60 transition'
          >
            <FaEdit className='mr-2' /> Edit
          </NavLink>
          <button className='flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400 transition'>
            <FaTrash className='mr-2' />
            Delete
          </button>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-8'>
        <div className='md:w-full'>
          <div className='bg-base-300 rounded-lg p-4 mb-6'>
            <div className='flex items-center mb-3'>
              <FaBook className='text-primary mr-2 text-xl' />
              <h3 className='text-xl font-semibold text-gray-100 underline'>
                Course Information
              </h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <DetailItem
                icon={<IoDocument className='text-primary' />}
                label='Course Title'
                value={course.title}
              />
              <DetailItem
                icon={<HiChartBar className='text-primary' />}
                label='Course Level'
                value={course.level}
              />
              <DetailItem
                icon={<FaClock className='text-primary' />}
                label='Duration'
                value={`${course.duration} hours`}
              />
            </div>
            <div className='mt-4 bg-base-content p-3 rounded-xl'>
              <h4 className='font-medium text-gray-900 mb-1 underline text-justify'>
                Description:
              </h4>
              <p className='text-gray-800'>{course.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
