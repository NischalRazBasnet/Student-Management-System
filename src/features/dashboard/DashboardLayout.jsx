import { useState } from 'react';
import Drawer from '../../components/Drawer';
import { Outlet } from 'react-router';
import Pagination from '../../components/Pagination';

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <div className={`drawer ${isOpen ? 'drawer-open' : ''} lg:drawer-open`}>
      <input
        id='dashboard-drawer'
        type='checkbox'
        className='drawer-toggle'
        checked={isOpen}
        onChange={toggleDrawer}
      />

      <Drawer toggleDrawer={toggleDrawer} />
      <div className='drawer-content'>
        <Outlet />
        <div className=' place-items-center'>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
