import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Sample from './Sample';

const App = () => {
  // const [darkMode, setDarkMode] = useState(false);

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  // };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout toggleSideBar={toggleSideBar} />,
      children: [
        {
          index: true,
          element: <Sample />,
        },
      ],
    },
  ]);

  return (
    <div className={`max-w-[1750px] mx-auto`}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
