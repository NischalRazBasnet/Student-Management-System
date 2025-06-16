import { useDeleteCourseMutation } from '../features/course/courseApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { FaTrash } from 'react-icons/fa';
import { useDeleteStudentMutation } from '../features/student/studentApi';

const DeleteButton = ({ id, type }) => {
  const nav = useNavigate();
  const [deleteCourse] = useDeleteCourseMutation();
  const [deleteStudent] = useDeleteStudentMutation();

  const handleDelete = async () => {
    try {
      if (type === 'course') {
        await deleteCourse(id).unwrap();
        toast.success('Course Deleted Successfully!');
      } else if (type === 'student') {
        await deleteStudent(id).unwrap();
        toast.success('Student Deleted Successfully!');
      }

      nav(-1);
    } catch (err) {
      toast.error(err.data?.message || err.data || ' Failed to Delete!');
    }
  };
  return (
    <button
      onClick={handleDelete}
      className='flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400 transition'
    >
      <FaTrash className='mr-2' />
      <span className='max-sm:hidden'>Delete</span>
    </button>
  );
};

export default DeleteButton;
