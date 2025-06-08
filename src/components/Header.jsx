import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { FaUserGraduate } from 'react-icons/fa';

const Header = ({ toggleDrawer }) => {
  return (
    <div className='navbar bg-base-100 shadow-xl sticky top-0 z-30'>
      <div className='flex-none '>
        <button
          className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg focus:outline-0 focus:ring-3 focus:ring-gray-700  lg:hidden'
          onClick={toggleDrawer}
        >
          <HiOutlineMenuAlt2 className='w-6 h-6' />
        </button>
      </div>
      <div>
        <a
          href='/'
          className='flex items-center ms-2.5 sm:ms-5 gap-3.5 normal-case text-2xl font-bold'
        >
          <FaUserGraduate className='w-6 h-6 text-primary ' />
          <span className='max-sm:hidden'>EnrollX</span>
        </a>
      </div>
    </div>
  );
};

export default Header;
