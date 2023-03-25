import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '../interface/IProduct';

interface ICardProps {
  product: IProduct;
}

export const Card: FC<ICardProps> = ({ product }) => {
  return (
    <div className='card'>
      <h5>{product.title}</h5>
      <img height={65} src={product.image} alt='Sneakers' />
      <b>${product.price}</b>
      <span>Rating - {product.rating.rate}</span>
      <Link className='nav' to={`/products/${product.id}`}>
        Show Details
      </Link>
    </div>
  );
};
