import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Authcontext.jsx';

const PrivateRoute = () => {
  const { auth } = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
