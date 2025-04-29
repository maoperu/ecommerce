import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import itemsData from '../assets/items.json';
import Cintillo from './Cintillo';
import Header from './Header';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL_PRODUCTION;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URL}/items/${id}`);
        if (!response.ok) {
          throw new Error('Server error');
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.log('Using fallback data:', error);
        const fallbackItem = itemsData.items.find(item => item.id === parseInt(id));
        setItem(fallbackItem);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Cintillo />
      <Header />
      <div className="item-detail">
        <button className="back-button" onClick={() => navigate('/')}>
          <span style={{ fontSize: '1.2em' }}>←</span> Volver
        </button>
        <div className="item-detail-content">
          <div className="item-detail-image">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="item-detail-info">
            <h1>{item.name}</h1>
            <p className="item-detail-description">{item.description}</p>
            <p className="item-detail-price">${item.price}</p>
            <div className="item-detail-buttons">
              <button className="add-to-cart-button">
                Añadir al Carrito
              </button>
              <button className="buy-now-button">
                Comprar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetail;