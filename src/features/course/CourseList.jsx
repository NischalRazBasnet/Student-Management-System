import { Button, Card, Spinner } from '@material-tailwind/react';
import { useGetCoursesQuery } from './courseApi';
import { useNavigate } from 'react-router';

const CourseList = () => {
  const { isLoading, error, data } = useGetCoursesQuery();
  const nav = useNavigate();
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
    <div className='grid course-grid gap-4 max-md:place-items-center'>
      {data &&
        data.map(({ _id, title, level }) => {
          return (
            <Card
              key={_id}
              className=' bg-base-100 shadow-xl min-w-[250px]'
              onClick={() => nav(`/dashboard/courses/${_id}`)}
            >
              <div className='card-body '>
                <h2 className='card-title text-gray-200'>{title}</h2>
                <p className='text-gray-500'>{level}</p>
                <div className='flex gap-2 justify-end'>
                  <Button
                    onClick={() => nav(`/course/${_id}`)}
                    className='rounded-md bg-slate-800 py-2 px-4 border border-slate-700 text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:scale-102 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  >
                    more
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
    </div>
  );
};

export default CourseList;
