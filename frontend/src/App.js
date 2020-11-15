import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductCRUD_Screen from './screens/ProductCRUD_Screen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import { useSelector } from 'react-redux';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

function App() {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
            </button>
            <Link to="/">ePet-shop</Link>
          </div>
          <div className="header-links">
            <Link to="/ProductCRUD">Services</Link>
            <Link to="/cart">Cart</Link>
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
                <Link to="/signin">Sign In</Link>
              )}
          </div>
        </header>
        <aside className="sidebar">
          <a href="index.html" id="hmenu-customer-profile-link" onClick="$Nav.getNow('signInRedirect')('nav_em_hd_re_signin', 'https://www.amazon.ca/ap/signin?openid.pape.max_auth_age=0&amp;openid.return_to=https%3A%2F%2Fwww.amazon.ca%2F%3F_encoding%3DUTF8%26ref_%3Dnav_em_hd_re_signin&amp;openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&amp;openid.assoc_handle=caflex&amp;openid.mode=checkid_setup&amp;openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&amp;openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&amp;&amp;ref_=nav_em_hd_clc_signin', 'nav_em_hd_clc_signin')" data-nav-ref="nav_em_hd_re_signin">
            <div id="hmenu-customer-profile">
              <div className="customer-profile"> <span className="profile-icon"><i className="far fa-user-circle"></i></span> Hello, Sign in</div>
              <button className="sidebar-close-button" onClick={closeMenu}>X</button>
            </div>
          </a>
          <div className="hmenu-header">Shop by Category</div>
          <ul className="hmenu-content">
            <li>
              <a href="index.html" className="hmenu-item" data-menu-id="1">
                Fashion
                <i className="fas fa-chevron-right hmenu-icon"></i>
              </a>
            </li>
            <li>
              <a href="index.html" className="hmenu-item" data-menu-id="1">
                Food
                  <i className="fas fa-chevron-right hmenu-icon"></i>
              </a>
            </li>
            <li>
              <a href="index.html" className="hmenu-item" data-menu-id="1">
                Pet Care
                  <i className="fas fa-chevron-right hmenu-icon"></i>
              </a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
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
          </div>
        </main>
        <footer className="footer">
          Copyright © 2020 Group 3, BCS Coding, University of Toronto. All Rights Reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
