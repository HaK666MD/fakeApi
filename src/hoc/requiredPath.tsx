import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';

export const PrivateWrapper = ({ children }: { children: JSX.Element }) => {
  const { userToken } = useAppSelector((state) => state.auth);
  return userToken ? children : <Navigate to='/' />;
};
