import { MdDashboard } from 'react-icons/md';
import { FaBook, FaUser } from 'react-icons/fa';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../features/dashboard/dashboardSlice';

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

const Drawer = () => {
  const dispatch = useDispatch();

  return (
    <ul className='menu p-4 fixed top-14 w-60 h-full bg-base-100 text-base-content'>
      {menuItems.map((item) => (
        <li
          key={item.label}
          onClick={() => window.innerWidth < 1024 && dispatch(toggleDrawer())}
        >
          <NavItem to={item.href}>
            {item.icon}
            {item.label}
          </NavItem>
        </li>
      ))}
    </ul>
  );
};

const NavItem = ({ to, children }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: to === '/dashboard' });

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 text-lg ${
        match ? 'text-primary font-medium' : ''
      }`}
    >
      {children}
    </Link>
  );
};

export default Drawer;
