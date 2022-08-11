import useAuth from '../hooks/useAuth';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { PATH_AUTH } from '../routes/paths';

ComponentAuthGuard.propTypes = {
  children: PropTypes.node
};

export default function ComponentAuthGuard({ children }) {
  const { isAuthenticated, canAutoLogin } = useAuth();

  if (isAuthenticated || canAutoLogin) {
    return <>{children}</>;
  }
  return <Navigate to={PATH_AUTH.login} />;

}