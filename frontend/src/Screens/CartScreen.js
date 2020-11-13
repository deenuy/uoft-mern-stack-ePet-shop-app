import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// fontawesome Explicit import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'

function CartScreen(props) {

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      console.log("Added: " + productId )
      dispatch(addToCart(productId, qty));
    }
  }, []);

  console.log('Cart Items: ' + cartItems.length);

  const checkoutHandler = () => {
    alert("Check-out");
  }

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h2>
              Shopping Cart
            </h2>
            </li>
            {
              cartItems.length === 0 ?
              <div>
                Cart is empty
              </div>
              :
              cartItems.map(item =>
                <li className="cart-item" key={item._id}>
                  <div className="cart-container">
                    <div className="cart-image">
                      <img className="cart-item-img" src={item.image} alt="product" />
                    </div>
                    <div className="cart-item-details">
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            <h3 className="cart-item-title">{item.name}</h3>
                          </Link>
                        </div>
                        <div className="cart-item-stock">
                          {item.countInStock > 0 ? <div className="item-in-stock">In stock</div> : <div className="item-stock-empty">Unavilable</div> }
                        </div>
                        <div className="item-qty">
                          Qty:
                          <select className="item-qty-btn" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                            {[...Array(item.countInStock).keys()].map(x =>
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="item-remove-icon">
                        <FontAwesomeIcon icon={faTrash} onClick={() => removeFromCartHandler(item.product)} style={{width: "5rem", height: "1.2rem", paddingTop: ".6rem", cursor: "pointer"}} />
                        {/* <button type="button" className="button-prm" onClick={() => removeFromCartHandler(item.product)} >
                          Delete
                        </button> */}
                      </div>
                    </div>
                    <div className="cart-price">
                      <h3 className="item-price">${item.price  * item.qty} </h3>
                    </div>
                  </div>
                </li>
              )
          }
        </ul>
      </div>
      <div className="cart-checkout">
        <div className="cart-action">
          <h3>
            Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
          :
          $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h3>
          <button onClick={checkoutHandler} className="button primary full-width button-prm" disabled={cartItems.length === 0}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartScreen;