import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetStudentQuery } from './studentApi';
import { baseUrl } from '../../app/MainApi';
import {
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBook,
  FaClock,
} from 'react-icons/fa';
import { Button, Spinner } from '@material-tailwind/react';
import { NavLink, useNavigate } from 'react-router';
import DetailItem from '../../components/DetailItem';

const Student = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const { data: student, isLoading, error } = useGetStudentQuery(id);
  console.log(student);

  // const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();

  // const handleDelete = async () => {
  // if (
  //   window.confirm(
  //     'Are you sure you want to delete this student? This action cannot be undone.'
  //   )
  //   ) {
  //     try {
  //       await deleteStudent({ id }).unwrap();
  //       alert('Student deleted successfully');
  //       navigate('/students');
  //     } catch (err) {
  //       alert(
  //         `Failed to delete student: ${
  //           err?.data?.message || err.error || 'Please try again'
  //         }`
  //       );
  //     }
  //   }
  // };

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
  if (!student) {
    return (
      <div className='max-w-4xl mx-auto p-6 text-center'>
        <h2 className='text-2xl font-bold mb-4'>Student Not Found</h2>
        <p>The requested student could not be found.</p>
        <button
          onClick={() => nav(-1)}
          className='mt-4 inline-flex items-center text-blue-600 hover:underline'
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
          <button
            // onClick={handleDelete}
            // disabled={isDeleting}
            className='flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400 transition'
          >
            <FaTrash className='mr-2' />
            {/* {isDeleting ? 'Deleting...' : 'Delete'} */}
          </button>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-8'>
        {/* Student Profile Image */}
        <div className='md:w-1/3 flex justify-center'>
          <div className='relative'>
            <img
              src={baseUrl + student.image}
              alt={`${student.firstName} ${student.lastName}`}
              className='w-64 h-64 object-cover rounded-full border-4 border-primary/70 shadow-md'
            />
            <div className='absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full font-medium'>
              {student.shift} Shift
            </div>
          </div>
        </div>

        {/* Student Details */}
        <div className='md:w-2/3'>
          <h1 className='text-3xl font-bold text-gray-100 mb-2'>
            {student.firstName} {student.lastName}
          </h1>
          <p className='text-lg text-gray-600 mb-6'>Student Profile</p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
            <DetailItem
              icon={<FaUser className='text-primary' />}
              label='Age'
              value={student.age}
            />
            <DetailItem
              icon={<FaPhone className='text-primary' />}
              label='Phone'
              value={student.phoneNo}
            />
            <DetailItem
              icon={<FaEnvelope className='text-primary' />}
              label='Email'
              value={student.email}
              isEmail={true}
            />
            <DetailItem
              icon={<FaMapMarkerAlt className='text-primary' />}
              label='Address'
              value={student.address}
            />
          </div>

          {/* Course Details Section */}
          <div className='bg-blue-50 rounded-lg p-4 mb-6'>
            <div className='flex items-center mb-3'>
              <FaBook className='text-primary mr-2 text-xl' />
              <h3 className='text-xl font-semibold text-gray-800'>
                Enrolled Course
              </h3>
            </div>

            {student.course ? (
              <>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <DetailItem
                    label='Course Title'
                    value={
                      <Link
                        to={`/course/${student.course._id}`}
                        className='text-primary hover:font-bold'
                      >
                        {student.course.title}
                      </Link>
                    }
                  />
                  <DetailItem
                    label='Course Level'
                    value={student.course.level}
                  />
                  <DetailItem
                    icon={<FaClock className='text-primary' />}
                    label='Duration'
                    value={`${student.course.duration} hours`}
                  />
                </div>
                <div className='mt-4'>
                  <h4 className='font-medium text-gray-700 mb-1 line-clamp-1'>
                    Description:
                  </h4>
                  <p className='text-gray-600'>{student.course.description}</p>
                </div>
              </>
            ) : (
              <p className='text-gray-600'>No course assigned</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
