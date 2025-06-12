import Header from './Header';
import { Outlet } from 'react-router';
import Pagination from './Pagination';

const RootLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
