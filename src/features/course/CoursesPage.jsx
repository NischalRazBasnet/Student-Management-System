import React from 'react';

const CoursesPage = () => {
  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4 text-primary'>Courses</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {['Math', 'Science', 'History'].map((course, index) => (
          <div key={index} className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title'>{course}</h2>
              <p>Course description...</p>
              <div className='badge badge-primary'>20 students</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
