import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function BarMenu({ handleCategChange }) {

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    }
    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const categories = ["Fashion", "Food", "Pet Care", "Toy", "All"];

    return (
        <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>&#9776;</button>
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
                <div id="hmenu-customer-profile-link" data-nav-ref="nav_em_hd_re_signin">
                    <div id="hmenu-customer-profile">
                        <div className="customer-profile"> <span className="profile-icon"><i className="far fa-user-circle"></i></span> Hello!</div>
                        <button className="sidebar-close-button" onClick={closeMenu}>X</button>
                    </div>
                </div>
                <div className="hmenu-header">Shop by Category</div>
                <ul className="hmenu-content">
                    {categories.map((category) => {
                        return (
                            <li key={category}>
                                <button id={category} onClick={(e) => handleCategChange(e.target.id)} className="hmenu-item" data-menu-id="1">
                                    {category} 
                                    <i className="fas fa-chevron-right hmenu-icon"></i>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </aside>
        </div>
    )
}

export default BarMenu;