import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const { admin } = useSelector((state) => state.adminSlice);

  if (admin) {
    return <Navigate to='/dashboard' replace />;
  }

  return children ? children : <Outlet />;
};

export default PublicRoute;
