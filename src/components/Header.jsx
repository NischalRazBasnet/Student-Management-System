import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { FaUserGraduate } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import AdminProfile from './AdminProfile';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDrawer } from '../features/dashboard/dashboardSlice';

const Header = () => {
  const { admin } = useSelector((state) => state.adminSlice);
  const isDrawerOpen = useSelector((state) => state.dashboard.isDrawerOpen);
  const dispatch = useDispatch();

  return (
    <div className='flex justify-between bg-base-100 shadow-xl fixed max-w-screen w-full top-0 z-50'>
      <div className='flex py-3'>
        <button
          className='flex items-center p-2 text-sm text-gray-500 rounded-lg focus:outline-0 focus:ring-3 focus:ring-gray-700 btn btn-ghost lg:hidden'
          onClick={() => dispatch(toggleDrawer())}
        >
          {isDrawerOpen ? <IoMdClose /> : <HiOutlineMenuAlt2 />}
        </button>
        <a
          href='/'
          className='flex items-center ms-2.5 sm:ms-5 gap-3.5 normal-case text-2xl font-bold'
        >
          <FaUserGraduate className='w-6 h-6 text-primary' />
          <span className='hidden sm:inline'>EnrollX</span>
        </a>
      </div>
      <div className='flex items-center rounded-full py-2 pr-10 lg:ml-auto'>
        {admin && <AdminProfile />}
      </div>
    </div>
  );
};

export default Header;
