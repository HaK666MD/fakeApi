import React, { FC } from 'react';
import { IProduct } from '../interface/IProduct';

interface ICardProps {
  info: IProduct;
}

const Info: FC<ICardProps> = ({ info }) => {
  return (
    <div className='wrapper'>
      <div className='details'>
        <img width={350} src={info.image} alt='' />
        <div className='desc'>
          <h3>{info.title}</h3>
          <p>{info.description}</p>
          <h4>Category: {info.category.toUpperCase()}</h4>
          <b>Price - {info.price}$</b>
          <h4>
            Rating: {info.rating.rate} ({info.rating.count})
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Info;
