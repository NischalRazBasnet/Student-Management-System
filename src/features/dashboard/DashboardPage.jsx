const DashboardPage = () => {
  return (
    <div>
      <div className='p-4 space-y-10'>
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
    </div>
  );
};

export default DashboardPage;
