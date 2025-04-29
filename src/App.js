import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import ItemDetail from './components/ItemDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/item/:id" element={<ItemDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
