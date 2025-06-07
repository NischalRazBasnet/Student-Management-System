import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function RootLayout({ toggleSideBar }) {
  return (
    <div>
      <Header toggleSideBar={toggleSideBar} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
