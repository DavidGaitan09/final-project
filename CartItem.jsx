import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNum = parseFloat(item.cost.replace('$', ''));
      return total + costNum * item.quantity;
    }, 0).toFixed(2);
  };

  const calculateTotalCost = (item) => {
    const costNum = parseFloat(item.cost.replace('$', ''));
    return (costNum * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Total del Carrito: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map((item, index) => (
          <div key={index} style={{ display: 'flex', gap: '20px', alignItems: 'center', margin: '15px 0', borderBottom: '1px solid #eee' }}>
            <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
            <div>
              <h3>{item.name}</h3>
              <p>Precio Unitario: {item.cost}</p>
              <p>Subtotal: ${calculateTotalCost(item)}</p>
              <div>
                <button onClick={() => handleDecrement(item)}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <button onClick={() => handleRemove(item)} style={{ marginTop: '10px', color: 'red' }}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
        <button onClick={onContinueShopping}>Continuar Comprando</button>
        <button onClick={() => alert('Próximamente')}>Pago (Checkout)</button>
      </div>
    </div>
  );
}

export default CartItem;
