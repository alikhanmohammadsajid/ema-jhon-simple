import React, { useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import { Link } from 'react-router-dom';
import { Spinner } from "react-bootstrap";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  document.title = "shop more"

  useEffect(() => {
    fetch('https://desolate-woodland-42661.herokuapp.com/products?search='+search)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [search])


  useEffect(() => {
    const savedCart = getDatabaseCart()
    const productKeys = Object.keys(savedCart)
    fetch('https://desolate-woodland-42661.herokuapp.com/productsByKeys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productKeys)
    })
      .then(res => res.json())
      .then(data => setCart(data))
  }, [])

  const handleSearch = event => {
    setSearch(event.target.value)
  }

  const handleAddProduct = (product) => {
    const ToBeAddedKey = product.key
    const sameProduct = cart.find(pd => pd.key === ToBeAddedKey)
    let count = 1
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1
      sameProduct.quantity = count
      const others = cart.filter(pd => pd.key !== ToBeAddedKey)
      newCart = [...others, sameProduct]
    }
    else {
      product.quantity = 1
      newCart = [...cart, product]
    }

    setCart(newCart)

    addToDatabaseCart(product.key, count)

  };

  document.title = "shop"
  return (
    <div className="twin-container">
      <div className="product-container">
        <div className="search">
        <input type="text" onBlur={handleSearch} className="product-search" placeholder="Search" />
        </div>
        
        {
          products.length === 0 && <Spinner animation="grow" />
        }

        {products.map((pd) => (
          <Product
            key={pd.key}
            showAddToCart={true}
            product={pd}
            handleAddProduct={handleAddProduct}>
          </Product>
        ))}
      </div>
      <div className="card-container">
        <Cart cart={cart}><Link to="/review"><button className="main-button">Review Order</button></Link></Cart>

      </div>
    </div>
  );
};

export default Shop;
