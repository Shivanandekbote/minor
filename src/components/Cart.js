import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../css/cart.css';

const Cart = ({ cartItems, removeFromCart }) => {
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  return (
    <Box className="cart-container">
      <Typography variant="h2">Your Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <Card key={index} className="cart-item">
                <CardContent>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <Typography variant="h3">{item.name}</Typography>
                    <Typography variant="body1">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body1">
                      Price: ${item.price} per kg
                    </Typography>
                    <Typography variant="body1">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => removeFromCart(index)}
                      endIcon={<FontAwesomeIcon icon={faTrashAlt} />}
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ul>
          <div className="cart-total">
            <Typography variant="h3">Total Price: ${getTotalPrice()}</Typography>
            <Button variant="contained" color="primary">
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
      <Link to="/shop" className="continue-shopping">
        Continue Shopping
      </Link>
    </Box>
  );
};

export default Cart;
