import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useEffect, useState } from 'react';

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDrawer = () => {
    if (window.innerWidth < 768) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`drawer ${isOpen ? 'drawer-open' : ''}`}>
      <input
        id='dashboard-drawer'
        type='checkbox'
        className='drawer-toggle'
        checked={isOpen}
        onChange={() => {
          toggleDrawer;
        }}
      />

      <div className='drawer-content flex flex-col min-h-screen'>
        {/* <Header className='' toggleDrawer={toggleDrawer} /> */}
        <div className='flex-1 p-4 bg-base-200 '>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
