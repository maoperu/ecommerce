import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Item from './Item';
import Cintillo from './Cintillo';
import Header from './Header';
import ItemDetail from './ItemDetail';
import itemsData from '../assets/items.json';
import styles from './Landing.module.css';

const DotsLoader = () => (
  <div className={styles['dots-loader']}>
    {[...Array(5)].map((_, i) => (
      <div key={i} className={styles.dot}></div>
    ))}
  </div>
);

const Landing = () => {
  const [items, setItems] = useState([]);
  const [logoUrl, setLogoUrl] = useState('');
  const [titulo, setTitulo] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL_PRODUCTION;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const logoResponse = await fetch(`${API_URL}/logo`);
        if (!logoResponse.ok) throw new Error('Logo fetch error');
        const logoData = await logoResponse.json();
        setLogoUrl(logoData.logo);

        const tituloResponse = await fetch(`${API_URL}/titulo`);
        if (!tituloResponse.ok) throw new Error('Error al obtener el título');
        const tituloData = await tituloResponse.json();
        if (tituloData.titulo) {
          setTitulo(tituloData.titulo);
        }
        
        const response = await fetch(`${API_URL}/items`);
        if (!response.ok) {
          throw new Error('Server error');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.log('Using fallback data:', error);
        setItems(itemsData.items);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className={styles.landing}>
      <Cintillo />
      {isLoading ? (
        <div className={styles['loading-container']}>
          <DotsLoader />
        </div>
      ) : (
        <>
          <Header logoUrl={logoUrl}/>
          <Routes>
            <Route path="/" element={
              <>
                <div className="header">
                  <h1>{titulo}</h1>
                  <p>Productos Recomendados</p>
                </div>
                <div className="items-grid">
                  {items.map(item => (
                    <Item key={item.id} {...item} />
                  ))}
                </div>
              </>
            } />
            <Route path="/item/:id" element={<ItemDetail items={items} />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default Landing;