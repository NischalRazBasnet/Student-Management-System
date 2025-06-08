import { MdDashboard } from 'react-icons/md';
import { FaBook, FaUser } from 'react-icons/fa';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const menuItems = [
  { label: 'Dashboard', href: '/dashboard', icon: <MdDashboard /> },
  {
    label: 'Students',
    href: '/dashboard/students',
    icon: <FaUser />,
  },
  {
    label: 'Courses',
    href: '/dashboard/courses',
    icon: <FaBook />,
  },
];

const Drawer = ({ toggleDrawer }) => {
  return (
    <div className='drawer-side z-20'>
      <label
        htmlFor='dashboard-drawer'
        className='drawer-overlay'
        onClick={toggleDrawer}
      ></label>

      <ul className='menu p-4 w-60 min-h-full bg-base-100 text-base-content'>
        {menuItems.map((item) => (
          <li key={item.label} onClick={toggleDrawer}>
            <NavItem to={item.href}>
              {item.icon}
              {item.label}
            </NavItem>
          </li>
        ))}
      </ul>
    </div>
  );
};

const NavItem = ({ to, children }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: to === '/dashboard' });

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 text-lg mb-2 hover:text-primary ${
        match ? 'text-primary font-medium' : ''
      }`}
    >
      {children}
    </Link>
  );
};

export default Drawer;
