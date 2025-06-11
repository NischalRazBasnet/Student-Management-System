import React from 'react';
import StudentSubHead from './StudentSubHead';
import { StudentList } from './StudentList';

const StudentsPage = () => {
  return (
    <div className='p-4'>
      <StudentSubHead />
      <StudentList />
      {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {[...Array(3)].map((_, index) => (
          <div key={index} className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title'>Card {index + 1}</h2>
              <p>Some content here...</p>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default StudentsPage;
