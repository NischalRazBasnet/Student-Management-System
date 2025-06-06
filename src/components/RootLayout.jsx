import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function RootLayout({ darkMode, toggleDarkMode }) {
  return (
    <div>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
