import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { ILogin } from '../interface/ILogin';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { fetchUser } from '../redux/slices/auth';

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const { error, userToken } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: 'mor_2314',
      password: '83r5^_'
    },
    mode: 'onChange'
  });

  const onSubmit = (values: ILogin) => {
    dispatch(fetchUser(values));
  };

  if (userToken) {
    return <Navigate to={'/products'} />;
  }

  return (
    <>
      <Header />
      <div>
        <form className='formContainer' onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder='Username'
            type='text'
            {...register('username', { required: 'Enter username!' })}
          />
          <span className='error'>{errors.username?.message}</span>
          <input
            placeholder='Password'
            type='password'
            {...register('password', { required: 'Enter password!' })}
          />
          <span className='error'>{errors.password?.message}</span>
          {error && <h1 className='error'>{error}</h1>}
          <button className='btn' type='submit'>
            Login
          </button>
        </form>
      </div>
    </>
  );
};
