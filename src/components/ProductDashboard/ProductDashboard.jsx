import React, { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import AddProducts from "../AddProducts/AddProducts";
import "./ProductDashboard.css";

const ProductDashboard = ({ products, addToCart, updateProductList }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleAddProduct = (newProduct) => {
    updateProductList((prevProducts) => [...prevProducts, newProduct]);
    setShowAddProduct(false);
  };

  const closeModal = () => {
    setShowAddProduct(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === "price-asc") {
      return a.price - b.price;
    } else if (sortOption === "price-desc") {
      return b.price - a.price;
    } else if (sortOption === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "name-desc") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <div className="product-container">
      <div className="serchabar" tabIndex={0}>
        <input
          type="text"
          className="search-bar"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="controls">
        <select value={sortOption} onChange={handleSortChange}>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>

        <button className="UpdateProductList" onClick={updateProductList}>
          Update Product List
        </button>

        <button className="AddProducts" onClick={() => setShowAddProduct(true)}>
          Add Product
        </button>
      </div>
      {/* <h2>Product Dashboard</h2> */}
      <div className="product-list">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
      {showAddProduct && (
        <AddProducts addProduct={handleAddProduct} closeModal={closeModal} />
      )}
    </div>
  );
};

export default ProductDashboard;
