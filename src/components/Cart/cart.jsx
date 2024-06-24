import React from "react";
import PropTypes from "prop-types";
import "./cart.css";
import { useNavigate } from "react-router-dom";

const Cart = ({
  cart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  checkout,
}) => {
  const navigate = useNavigate();
  const DELIVERY_CHARGE = 80;

  const calculateDiscountedPrice = (price) => {
    return price * 0.98;
  };

  const calculateTotal = () => {
    const total = cart.reduce(
      (acc, item) => acc + calculateDiscountedPrice(item.price) * item.quantity,
      0
    );
    return (total + DELIVERY_CHARGE).toFixed(2);
  };

  const calculateTotalDiscountedPrice = () => {
    const total = cart.reduce(
      (acc, item) => acc + calculateDiscountedPrice(item.price) * item.quantity,
      0
    );
    return total.toFixed(2);
  };

  const calculateItemCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const handleCCAPayment = () => {
    navigate("/ccavenue-payment");
  };

  const handleDecrementQuantity = (itemId) => {
    const item = cart.find((item) => item.id === itemId);
    if (item.quantity > 1) {
      decrementQuantity(itemId);
    } else {
      decrementQuantity(itemId);
    }
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <div className="empty-cart-message">Cart is empty</div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div>ID: {item.id}</div>
                <div>{item.name}</div>
                <div>Original Price: ${item.price.toFixed(2)}</div>
                <div>
                  Discounted Price: $
                  {calculateDiscountedPrice(item.price).toFixed(2)}
                </div>
                <div>
                  <button
                    onClick={() => handleDecrementQuantity(item.id)}
                    aria-label={`Decrease quantity of ${item.name}`}
                    style={{ fontSize: "24px", padding: "10px" }}
                  >
                    <b>-</b>
                  </button>
                  <b>
                    <span>{item.quantity}</span>
                  </b>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    aria-label={`Increase quantity of ${item.name}`}
                    style={{ fontSize: "24px", padding: "10px" }}
                  >
                    <b>+</b>
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div>Total Items: {calculateItemCount()}</div>
            <div>
              <b>Total Price:</b> ${calculateTotalDiscountedPrice()} + $80
              (including Rs. 80 delivery charge) = <b>{calculateTotal()}</b>
            </div>
          </div>
          <button
            className="checkout-button"
            onClick={checkout}
            aria-label="Checkout with Stripe"
          >
            Checkout with Stripe
          </button>
          <button
            className="ccavenue-button"
            onClick={handleCCAPayment}
            aria-label="Checkout with CCAvenue"
          >
            Checkout with CCAvenue
          </button>
        </>
      )}
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  incrementQuantity: PropTypes.func.isRequired,
  decrementQuantity: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
};

export default Cart;
