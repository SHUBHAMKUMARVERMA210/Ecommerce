import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProductDashboard from "./components/ProductDashboard/ProductDashboard";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import Cart from "./components/Cart/cart";
import Checkout from "./components/Checkout/checkout";
import CCAvenuePayment from "./components/CCAAvenuePayment/CCAAvenuePayment";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8085/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data); // Assuming data is an array of products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.productId === product.productId
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId)
    );
  };

  const incrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const checkout = () => {
    console.log("Proceed to checkout");
  };

  const handleCheckout = () => {
    console.log("Order placed", cart);
    setCart([]);
  };

  const updateProductList = () => {
    // Assuming you want to add a new product
    setProducts((products) => [
      ...products,
      {
        productId: 3,
        productName: "Product 3",
        price: 150,
        description: "Product 3 description",
      },
    ]);
  };

  const calculateItemCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <div className="app">
      <Navbar cartCount={calculateItemCount()} />
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route
          path="/products"
          element={
            <ProductDashboard
              products={products}
              addToCart={addToCart}
              updateProductList={updateProductList}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              checkout={checkout}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} handleCheckout={handleCheckout} />}
        />
        <Route
          path="/ccavenue-payment"
          element={<CCAvenuePayment cart={cart} />}
        />
        <Route path="/" element={<h1>Welcome to our eCommerce site!</h1>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
