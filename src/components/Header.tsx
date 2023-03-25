import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { logout, me } from '../redux/slices/auth';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector((state) => state.auth);

  const token = localStorage.getItem('Token');
  useEffect(() => {
    if (token) {
      dispatch(me(token));
    }
  }, [token, dispatch]);

  return (
    <nav className='header'>
      {userToken && (
        <>
          <Link className='logo' to={'/products'}>
            <img
              width={30}
              src='https://fakestoreapi.com/icons/logo.png'
              alt='Logo'
            ></img>
          </Link>
          <button className='btn' onClick={() => dispatch(logout())}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
};
