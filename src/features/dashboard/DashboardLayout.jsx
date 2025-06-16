import { Outlet } from 'react-router-dom';
import Drawer from '../../components/Drawer';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrawer, setDrawer } from './dashboardSlice';
import { useEffect } from 'react';
import { getFromLocal } from '../local/local';
import { Navigate } from 'react-router-dom';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector((state) => state.dashboard.isDrawerOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        dispatch(setDrawer(true));
      } else {
        dispatch(setDrawer(false));
      }
    };

    if (!getFromLocal()) {
      return <Navigate to='/login' replace />;
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return (
    <div
      className={`drawer ${isDrawerOpen ? 'drawer-open' : ''} lg:drawer-open`}
    >
      <input
        id='dashboard-drawer'
        type='checkbox'
        className='drawer-toggle'
        checked={isDrawerOpen}
        onChange={() => dispatch(toggleDrawer())}
      />

      <div className='drawer-content flex flex-col h-full'>
        <Header />
        <div className='flex-1 p-4 bg-base-200 pt-16 lg:ml-64'>
          <Outlet />
        </div>
      </div>

      <div className='drawer-side'>
        <label
          htmlFor='dashboard-drawer'
          className='drawer-overlay'
          onClick={() => dispatch(toggleDrawer())}
        ></label>
        <Drawer />
      </div>
    </div>
  );
};

export default DashboardLayout;
