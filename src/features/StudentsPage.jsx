import React from 'react';

const StudentsPage = () => {
  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4 text-primary'>Students</h1>
      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Enrollment Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>2023-01-15</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsPage;
