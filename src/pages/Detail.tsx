import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import Info from '../components/Info';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { fetchDetails } from '../redux/slices/details';

export const DetailPage: FC = () => {
  const { id } = useParams();
  const { info, isLoading, error } = useAppSelector((state) => state.detail);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDetails(String(id)));
  }, [id, dispatch]);

  return (
    <>
      <Header />
      <div className='wrapper'>
        {isLoading && <h1>Is Loading</h1>}
        {error && <h1>{error}</h1>}
        {info && <Info info={info} />}
      </div>
    </>
  );
};
