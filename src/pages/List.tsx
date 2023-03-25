import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { fetchProducts } from '../redux/slices/products';
import { Card } from '../components/Card';
import { Header } from '../components/Header';

export const ListPage: FC = () => {
  const { list, isLoading, error } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className='wrapper'>
        {isLoading && <h1>Is Loading ...</h1>}
        {error && <h1>{error}</h1>}
        {list &&
          list.map((product) => <Card key={product.id} product={product} />)}
      </div>
    </>
  );
};
