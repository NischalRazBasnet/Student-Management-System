import Header from './components/Header';
import { useState, useEffect } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
    </div>
  );
};
export default App;

//   const router = createBrowserRouter([
//     {
//       path: '/',
//       element: (
//         <RootLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
//       ),
//       children: [
//         {
//           index: true,
//           element: <Sample />,
//         },
//       ],
//     },
//   ]);

//   return (
//     <div className={`${darkMode && 'dark'}max-w-[1750px] mx-auto`}>
//       <RouterProvider router={router} />
//     </div>
//   );
