import React from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useNavigate } from 'react-router-dom';

interface RequireAuthRouteProps {
  children: React.ReactNode;
  fallbackPath?: string;
}

const RequireAuthRoute: React.FC<RequireAuthRouteProps> = ({ children, fallbackPath }) => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate(fallbackPath || '/login');
  }
  return <>{children}</>;
};

export default RequireAuthRoute;
