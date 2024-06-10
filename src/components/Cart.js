import React from 'react';
import { Link } from 'react-router-dom';
import '../css/cart.css';

const Cart = ({ cartItems, removeFromCart }) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price} per kg</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button className="remove-button" onClick={() => removeFromCart(index)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total Price: ${getTotalPrice()}</h3>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </>
      )}
      <Link to="/shop" className="continue-shopping">
        Continue Shopping
      </Link>
    </div>
  );
};

export default Cart;
