import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductCRUD_Screen from './screens/ProductCRUD_Screen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

function App() {

  return (
    <BrowserRouter>
      <main className="main">
        <Route path="/ProductCRUD" component={ProductCRUD_Screen} />
        <Route path="/product/:id" exact={true} component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/signin" component={SigninScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/" exact={true} component={HomeScreen} />
        <Route path="/order/:id" component={OrderScreen} />
      </main>
      <footer className="footer">
        Copyright © 2020 Group 3, BCS Coding, University of Toronto. All Rights Reserved.
      </footer>
    </BrowserRouter>
  );
}

export default App;
