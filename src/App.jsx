import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './components/RootLayout';
import DashboardLayout from './dashboard/DashboardLayout';
import DashboardPage from './features/DashboardPage';
import StudentsPage from './features/StudentsPage';
import CoursesPage from './features/CoursesPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: 'dashboard',
          element: <DashboardLayout />,
          children: [
            { index: true, element: <DashboardPage /> },
            { path: 'students', element: <StudentsPage /> },
            { path: 'courses', element: <CoursesPage /> },
          ],
        },
        {
          index: true,
          element: <Navigate to='/dashboard' replace />,
        },
      ],
    },
  ]);

  return (
    <div className='min-h-screen bg-base-200' data-theme='dark'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
