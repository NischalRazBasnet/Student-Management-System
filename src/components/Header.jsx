import { Button } from '@material-tailwind/react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { FaSun, FaMoon, FaUserGraduate } from 'react-icons/fa';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className='fixed top-0 z-100 w-full max-w-[1750px] h-fit bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
      <div className='px-3 py-3 lg:px-5 lg:pl-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start rtl:justify-end'>
            <Button
              className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-0 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              variant='text'
            >
              <HiOutlineMenuAlt2 className=' text-2xl dark:text-white' />
            </Button>

            <a href='#' className='flex ms-2.5 md:me-24'>
              <FaUserGraduate className='text-lg sm:text-2xl h-8 me-2.5 text-violet-500 ' />
              <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
                ENROLLIX
              </span>
            </a>
          </div>
          <button
            className='dark:bg-slate-50 dark:text-slate-700 p-1.5 text-xl rounded-full'
            variant='text'
            onClick={toggleDarkMode}
          >
            {console.log(darkMode)}
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Header;
