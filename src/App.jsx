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

// const checkSession = () => {
//   return localStorage.getItem('admin') !== null;
// };

// const ProtectedRoute = ()=>{
//   if(!checkSession()){
//     return <Navigate to='/login' replace />
//   }
//   return <Outlet />
// }

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

        { path: 'login', element: <Login /> },
        { path: 'setup', element: <Setup /> },
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
