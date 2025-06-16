import { NavLink } from 'react-router-dom';

const DashboardTable = ({ activeTab, students, courses, searchTerm }) => {
  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phoneNo.includes(searchTerm)
  );

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (activeTab === 'students') {
    if (filteredStudents.length === 0) {
      return (
        <div className='text-center py-10'>
          <div className='text-lg font-medium'>No students found</div>
        </div>
      );
    }

    return (
      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th>Name</th>
              <th className='hidden md:table-cell'>Email</th>
              <th>Contact</th>
              <th className='hidden sm:table-cell'>Course</th>
              <th className='hidden md:table-cell'>Enrolled</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => {
              const enrollDate = new Date(
                student.createdAt
              ).toLocaleDateString();
              return (
                <tr key={student._id}>
                  <td>
                    <div className='flex items-center gap-3'>
                      <div className='avatar placeholder'>
                        <div className='bg-neutral text-neutral-content rounded-full w-8 text-center p-1.5'>
                          <span>
                            {student.firstName.charAt(0)}
                            {student.lastName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className='font-bold'>
                          {student.firstName} {student.lastName}
                        </div>
                        <div className='text-sm text-gray-500 md:hidden'>
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className=''>{student.email}</td>
                  <td>
                    <a
                      href={`tel:${student.phoneNo}`}
                      className='link link-hover'
                    >
                      {student.phoneNo}
                    </a>
                  </td>
                  <td className='hidden sm:table-cell'>
                    <span className='badge badge-primary text-gray-200 py-5 p-3 '>
                      {student.course?.title || 'N/A'}
                    </span>
                  </td>
                  <td className='hidden md:table-cell'>{enrollDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  if (filteredCourses.length === 0) {
    return (
      <div className='text-center py-10'>
        <div className='text-lg font-medium'>No courses found</div>
      </div>
    );
  }

  return (
    <div className='overflow-x-auto'>
      <table className='table table-zebra w-full'>
        <thead>
          <tr>
            <th>Course Title</th>
            <th className='hidden md:table-cell'>Duration</th>
            <th>Enrolled Students</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <tr key={course._id}>
              <td className='font-medium'>{course.title}</td>
              <td className='hidden md:table-cell'>
                {course.duration || 'N/A'} months
              </td>
              <td>
                <span className='badge badge-primary'>
                  {course.enrollments?.length || 0} students
                </span>
              </td>
              <td>
                <NavLink
                  to={`/dashboard/courses/${course._id}`}
                  className='btn btn-sm btn-outline btn-primary'
                >
                  View
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
