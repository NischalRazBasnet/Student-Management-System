import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { admin } = useSelector((state) => state.adminSlice);

  if (!admin) {
    return <Navigate to='/login' replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
