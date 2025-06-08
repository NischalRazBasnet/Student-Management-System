import { useState } from 'react';
import Drawer from '../components/Drawer';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <div className={`drawer ${isOpen ? 'drawer-open' : ''} lg:drawer-open`}>
      <input
        id='my-drawer'
        type='checkbox'
        className='drawer-toggle'
        checked={isOpen}
        onChange={toggleDrawer}
      />
      <div className='drawer-content'>
        <Outlet />
      </div>
      <Drawer onToggle={toggleDrawer} isOpen={isOpen} />
    </div>
  );
};

export default DashboardLayout;
