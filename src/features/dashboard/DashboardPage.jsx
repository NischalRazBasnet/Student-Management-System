// import { useNavigate } from "react-router";
import { Spinner } from '@material-tailwind/react';
import { useGetStudentsQuery } from '../student/studentApi';

const DashboardPage = () => {
  const { isLoading, error, data } = useGetStudentsQuery();
  // const nav = useNavigate();

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

  return (
    <div>
      <div className=' p-4 space-y-6'>
        <h1 className='text-3xl font-bold mb-4 text-primary'>Welcome Admin,</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[...Array(3)].map((_, index) => (
            <div key={index} className='card bg-base-100 shadow-xl'>
              <div className='card-body'>
                <h2 className='card-title'>Card {index + 1}</h2>
                <p>Some content here...</p>
              </div>
            </div>
          ))}
        </div>
        {console.log(data)}
        <div className='overflow-x-auto'>
          <table className='table table-zebra'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Shift</th>
                <th>Enrollment Date</th>
              </tr>
            </thead>
            {data &&
              data.map(
                ({ _id, firstName, lastName, course, shift, createdAt }) => {
                  const enrollDate = new Date(createdAt).toLocaleDateString();
                  return (
                    <tbody key={_id}>
                      <tr>
                        <td>
                          {firstName}
                          {lastName}
                        </td>
                        <td>{course.title}</td>
                        <td>{shift}</td>
                        <td>{enrollDate}</td>
                      </tr>
                    </tbody>
                  );
                }
              )}{' '}
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
