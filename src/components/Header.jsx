import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';

const mockSearchResults = [
  'Mochila Negra',
  'Maleta Grande',
  'Bolso Deportivo',
  'Maletín Ejecutivo',
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  return (
    <div className="main-header">
      <div className="logo-container" onClick={handleLogoClick} style={{ cursor: location.pathname !== '/' ? 'pointer' : 'default' }}>
        <img 
          src="" 
          alt="Logo" 
          className="logo"
        />
      </div>
      
      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="search-icon" />
        </div>
        {showResults && (
          <div className="search-results">
            {mockSearchResults.map((result, index) => (
              <div key={index} className="search-result-item">
                {result}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="header-buttons">
        <button className="header-button">
          <FaUser />
          <span>Login</span>
        </button>
        <button className="header-button">
          <FaShoppingCart />
          <span>Carrito</span>
        </button>
      </div>
    </div>
  );
};

export default Header;