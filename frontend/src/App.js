import React from 'react';
import './App.css';
// import data from './data';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';


function App() {
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
            <Link to="/">amazona</Link>
          </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>
            <a href="signin.html">Sign In</a>
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
            <Route path="/product/:id" exact={true} component={ProductScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">
          All rights reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
