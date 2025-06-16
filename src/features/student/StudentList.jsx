import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Spinner,
} from '@material-tailwind/react';
import { useGetStudentsQuery } from './studentApi';
import { baseUrl } from '../../app/mainApi';
import { useNavigate } from 'react-router';

export function StudentList() {
  const { isLoading, error, data } = useGetStudentsQuery();
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
    <div className='grid dashboard-grid gap-4 max-md:place-items-center'>
      {console.log(data)}
      {data &&
        data.map(({ _id, firstName, lastName, image, course, shift }) => {
          return (
            <Card
              onClick={() => nav(`/dashboard/students/${_id}`)}
              key={_id}
              className='dashboard-card w-59 card bg-base-100 shadow-lg card-shadow cursor-pointer'
            >
              <CardHeader className=' relative h-28 m-3 overflow-hidden rounded-xl'>
                <img
                  className=' w-full h-full object-cover'
                  src={`${baseUrl}${image}`}
                  alt='card-image'
                />
              </CardHeader>

              <CardBody className='p-4'>
                <Typography
                  variant='h5'
                  className='text-primary mb-2 font-semibold'
                >
                  {`${firstName} ${lastName}`}
                </Typography>
                <div className='flex flex-col gap-2'>
                  <Typography
                    color='white'
                    className=' font-light leading-normal'
                  >
                    Course: {course?.title || 'N/A'}
                  </Typography>
                  <Typography
                    color='white'
                    className=' font-light leading-normal'
                  >
                    Shift: {shift}
                  </Typography>
                </div>
              </CardBody>

              <CardFooter className='flex px-4 pb-6 pt-0 mt-2 justify-end'>
                <Button
                  onClick={() => nav(`/students/${_id}`)}
                  className='rounded-md bg-slate-800 py-2 px-4 border border-slate-700 text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:scale-102 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                >
                  more
                </Button>
              </CardFooter>
            </Card>
          );
        })}
    </div>
  );
}
