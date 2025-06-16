import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './components/RootLayout';
import DashboardLayout from './features/dashboard/DashboardLayout';
import DashboardPage from './features/dashboard/DashboardPage';
import StudentsPage from './features/student/StudentsPage';
import CoursesPage from './features/course/CoursesPage';
import Login from './features/authentication/Login';
import Setup from './features/authentication/Setup';
import Student from './features/student/Student';
import Course from './features/course/Course';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <PublicRoute>
          <RootLayout />
        </PublicRoute>
      ),
      children: [
        { path: 'login', element: <Login /> },
        { path: 'setup', element: <Setup /> },
        {
          index: true,
          element: <Navigate to='/dashboard' replace />,
        },
      ],
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <RootLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'dashboard',
          element: <DashboardLayout />,
          children: [
            { index: true, element: <DashboardPage /> },
            {
              path: 'students',
              children: [
                { index: true, element: <StudentsPage /> },
                { path: ':id', element: <Student /> },
              ],
            },
            {
              path: 'courses',
              children: [
                { index: true, element: <CoursesPage /> },
                { path: ':id', element: <Course /> },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to='/dashboard' replace />,
    },
  ]);

  return (
    <div
      className='max-w-[1750px] max-h-full bg-base-200 mx-auto'
      data-theme='dark'
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
