import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/HomePage';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(product => product.id !== productId));
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <HomePage products={products} addToCart={addToCart} />
        </Route>
        <Route path="/cart">
          <CartPage cart={cart} removeFromCart={removeFromCart} />
        </Route>
        <Route path="/login">
          <LoginPage onLogin={handleLogin} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
