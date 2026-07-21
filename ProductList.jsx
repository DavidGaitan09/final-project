
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", cost: "$12" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2017/07/07/18/57/lavender-2482348_1280.jpg", cost: "$18" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2015/06/02/01/02/jasmine-794380_1280.jpg", cost: "$20" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", cost: "$10" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", cost: "$22" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#2e7d32', color: 'white' }}>
        <h2>Paradise Nursery</h2>
        <div>
          <button onClick={() => setShowCart(false)} style={{ margin: '0 10px' }}>Inicio / Plantas</button>
          <button onClick={() => setShowCart(true)}>
            Carrito ({totalQuantity})
          </button>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h2>{categoryObj.category}</h2>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.cost}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)}
                    >
                      {addedToCart[plant.name] || cartItems.some(item => item.name === plant.name) ? 'Agregado' : 'Agregar al Carrito'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
