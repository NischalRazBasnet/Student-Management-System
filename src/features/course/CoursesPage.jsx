import React from 'react';
import CourseList from './CourseList';

const CoursesPage = () => {
  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4 text-primary'>Courses</h1>

      <CourseList />
    </div>
  );
};

export default CoursesPage;
