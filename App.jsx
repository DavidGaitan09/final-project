import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <h1>Welcome to Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <AboutUs />
          <button className="get-started-button" onClick={handleGetStarted}>
            Comenzar
          </button>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
