export const DetailItem = ({ icon, label, value = false }) => (
  <div className='bg-white p-3 rounded-md border border-gray-100 shadow-sm'>
    <div className='flex items-center mb-1'>
      {icon && <span className='mr-2'>{icon}</span>}
      <span className='text-sm font-medium text-gray-600'>{label}:</span>
    </div>

    <p className='text-lg font-medium text-gray-800'>{value}</p>
  </div>
);

export default DetailItem;
