import { useParams, Link } from 'react-router-dom';
import { useGetStudentQuery } from './studentApi';
import { baseUrl } from '../../app/mainApi';
import {
  FaEdit,
  FaArrowLeft,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBook,
  FaClock,
} from 'react-icons/fa';
import { Spinner } from '@material-tailwind/react';
import { useNavigate } from 'react-router';
import DetailItem from '../../components/DetailItem';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../modal/modalSlice';
import StudentEditForm from './StudentEditForm';
import DeleteButton from '../../components/DeleteButton';

const Student = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);

  const { data: student, isLoading, error } = useGetStudentQuery(id);
  console.log(student);

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
          className='mt-4 inline-flex items-center text-primary hover:underline'
        >
          <FaArrowLeft className='mr-2' /> Back
        </button>
      </div>
    );
  }

  return (
    <div className='max-w-full min-h-screen mx-auto p-4 md:p-6 bg-base-300 rounded-lg shadow-md'>
      <div className='flex justify-between items-center my-6'>
        <button
          onClick={() => nav(-1)}
          className=' inline-flex items-center text-white hover:text-primary cursor-pointer text-2xl'
        >
          <FaArrowLeft className='mr-2' /> Back
        </button>
        <div className='flex space-x-5'>
          <button
            onClick={() => dispatch(openModal())}
            className='flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/60 transition'
          >
            <FaEdit className='mr-2' /> Edit
          </button>
          <DeleteButton id={student._id} type='student' />
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='md:w-1/2 flex justify-center'>
          <div className='relative'>
            <img
              src={baseUrl + student.image}
              alt={`${student.firstName} ${student.lastName}`}
              className='w-64 h-64 object-cover rounded-full border-4 border-primary/70 shadow-md lg:size-96'
            />
            <div className='absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full font-medium'>
              {student.shift} Shift
            </div>
          </div>
        </div>

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

          <div className='bg-blue-50 rounded-lg p-4 mb-6'>
            <div className='flex items-center mb-3'>
              <FaBook className='text-primary mr-2 text-xl' />
              <h3 className='text-xl font-semibold text-gray-800'>
                Enrolled Course
              </h3>
            </div>

            {student.course ? (
              <>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                  <DetailItem
                    label='Course Title'
                    value={
                      <Link
                        to={`courses/${student.course._id}`}
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
                    value={`${student.course.duration} months`}
                  />
                </div>
              </>
            ) : (
              <p className='text-gray-600'>No course assigned</p>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <dialog open className='modal backdrop-brightness-50 backdrop-blur-sm'>
          <div className='modal-box w-11/12 max-w-3xl bg-base-200 rounded-xl'>
            <div className='flex justify-between items-center mb-6 pb-2 border-b border-base-300'>
              <h3 className='text-xl font-bold text-primary'>
                Edit Student Detail
              </h3>
              <button
                className='btn btn-sm btn-circle btn-ghost text-gray-500 hover:text-gray-700'
                onClick={() => dispatch(closeModal())}
              >
                ✕
              </button>
            </div>

            {
              <StudentEditForm
                student={student}
                closeModal={() => dispatch(closeModal())}
              />
            }
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Student;
