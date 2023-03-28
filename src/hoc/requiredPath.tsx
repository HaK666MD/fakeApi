import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';

export const PrivateWrapper = () => {
  const token = localStorage.getItem('Token');
  const { userToken } = useAppSelector((state) => state.auth);
  return token || userToken ? <Outlet /> : <Navigate to='/' />;
};
