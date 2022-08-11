import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, canAutoLogin } = useAuth();

  if (isAuthenticated || canAutoLogin) {
    return <Navigate to={PATH_DASHBOARD.projects} />;
  }

  return <>{children}</>;
}
