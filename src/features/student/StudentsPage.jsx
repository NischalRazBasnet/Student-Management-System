import { StudentList } from './StudentList';

const StudentsPage = () => {
  return (
    <div className='p-4 min-h-screen'>
      <h1 className='text-3xl font-bold mb-4 text-primary'>Students</h1>

      <StudentList />
    </div>
  );
};

export default StudentsPage;
