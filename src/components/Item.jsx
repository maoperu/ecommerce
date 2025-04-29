import React from 'react';
import { useNavigate } from 'react-router-dom';

const Item = ({ id, name, price, image, description }) => {
  const navigate = useNavigate();

  return (
    <div className="item-card" onClick={() => navigate(`/item/${id}`)}>
      <img src={image} alt={name} className="item-image" />
      <h3>{name}</h3>
      <p>{description}</p>
      <p className="price">${price}</p>
      <button className="buy-button" onClick={(e) => e.stopPropagation()}>
        Add to Cart
      </button>
    </div>
  );
};

export default Item;