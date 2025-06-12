export const DetailItem = ({ icon, label, value, isEmail = false }) => (
  <div className='bg-white p-3 rounded-md border border-gray-100 shadow-sm'>
    <div className='flex items-center mb-1'>
      {icon && <span className='mr-2'>{icon}</span>}
      <span className='text-sm font-medium text-gray-600'>{label}:</span>
    </div>
    {isEmail ? (
      <a
        href={`mailto:${value}`}
        className='text-lg font-medium text-gray-800 hover:text-blue-600 hover:underline'
      >
        {value}
      </a>
    ) : (
      <p className='text-lg font-medium text-gray-800'>{value}</p>
    )}
  </div>
);

export default DetailItem;
