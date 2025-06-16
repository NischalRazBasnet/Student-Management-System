import CourseList from './CourseList';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../modal/modalSlice';
import CourseAddForm from './CourseAddForm';

const CoursesPage = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-3xl font-bold mb-4 text-primary'>Students</h1>
        <button
          onClick={() => dispatch(openModal())}
          className='flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/60 transition'
        >
          <FaPlus className='md:mr-2' />
          <span className='max-sm:hidden'>Add New Course</span>
        </button>
      </div>

      <CourseList />
      {isOpen && (
        <dialog open className='modal backdrop-brightness-50 backdrop-blur-sm'>
          <div className='modal-box w-11/12 max-w-3xl bg-base-200 rounded-xl'>
            <div className='flex justify-between items-center mb-6 pb-2 border-b border-base-300'>
              <h3 className='text-xl font-bold text-primary'>Add New Course</h3>
              <button
                className='btn btn-sm btn-circle btn-ghost text-gray-500 hover:text-gray-700'
                onClick={() => dispatch(closeModal())}
              >
                ✕
              </button>
            </div>

            <CourseAddForm closeModal={() => dispatch(closeModal())} />
          </div>
        </dialog>
      )}
    </div>
  );
};

export default CoursesPage;
