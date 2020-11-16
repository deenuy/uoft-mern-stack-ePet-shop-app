import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import Cookie from "js-cookie";
import BarMenu from "../components/BarMenu";

function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { order } = orderCreate;
  const [firstTime, setFirstTime] = useState(true);

  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  var itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  var taxPrice = (0.15 * itemsPrice)
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);
  itemsPrice = itemsPrice.toFixed(2);
  taxPrice = taxPrice.toFixed(2);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    console.log("placeOrderHandler OK");
    dispatch(createOrder({ orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice }));
    setFirstTime(false);
  }

  useEffect(() => {
    if (order && !firstTime) {
      console.log("order._id = " + JSON.stringify(order._id));
      props.history.push("/order/" + order._id);
    }
  }, [order]);


  return <div>
    <div className="homescreen-container" >
    <BarMenu handleCategChange={() => props.history.push('/')}/>
      <div className="placeorder">
        <div className="placeorder-info">
          <div className="order-add-payment">
            <div className="order-address">
              <h3> Shipping </h3>
              <p>{cart.shipping.address}, </p>
              <p>{cart.shipping.city}, </p>
              <p>{cart.shipping.postalCode}, </p>
              <p>{cart.shipping.country}</p>
            </div>
            <div className="order-payment">
              <h3>Payment</h3>
              <p>Payment Method: {cart.payment.paymentMethod}</p>
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>
                  Shopping Cart
              </h3>
              </li>
              {
                cartItems.length === 0 ?
                  <div> Cart is empty </div> :
                  cartItems.map(item =>
                    <li className="item-list" key={item.product}>
                      <div className="order-item-img">
                        <img className="order-item-image" src={item.image} alt="product" />
                      </div>
                      <div className="order-cart-item">
                        <div className="cart-item-name">
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>
                        </div>
                        <div className="cart-qty">
                          Qty: {item.qty}
                        </div>
                      </div>
                      <div className="cart-price">
                        ${item.price}
                      </div>
                    </li>
                  )
              }
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${taxPrice}</div>
            </li>
            <li className="order-total">
              <div>Order Total</div>
              <div>${totalPrice}</div>
            </li>
            <li>
              <button className="button-prm place-order-btn" onClick={placeOrderHandler} >Place Order</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

}

export default PlaceOrderScreen;