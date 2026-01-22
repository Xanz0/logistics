// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../../utils/auth.js';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const isAuth = isAuthenticated();
  const userRole = getUserRole();
  
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    const redirectPath = userRole === 'driver' ? '/driver' : '/customer';
    return <Navigate to={redirectPath} replace />;
  }
  
  return children;
};

export default ProtectedRoute;