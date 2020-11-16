import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';

function OrderScreen(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success, error: errorPay } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsOrder(props.match.params.id));
    return () => {
    };
  }, []);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
    props.history.push("/profile");
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  return (loading ? <div>Loading ...</div> : error ? <div>{error}</div> :
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Shipping
          </h3>
          <div>
            {order.shippingAddress}
          </div>
          <div>
            {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
          </div>
        </div>
        <div>
          <h3>Payment</h3>
          <div>
            Payment Method: {order.paymentMethod}
          </div>
          <div>
            {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Shopping Cart
              </h3>
              <div>
                Price
              </div>
              </li>
              {
                order.orderItems && order.orderItems.length === 0 ?
                <div>
                  Cart is empty
            </div>
                :
                order.orderItems.map(item =>
                  <li key={item._id}>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>

                      </div>
                      <div>
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
        {!order.isPaid ?
          <li className="placeorder-actions-payment">
              <button onClick={() => handleSuccessPayment(true)}>Pay</button> 
          </li>
          : ""
          }
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>${order.itemsPrice}</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>${order.shippingPrice}</div>
          </li>
          <li>
            <div>Tax</div>
            <div>${order.taxPrice}</div>
          </li>
          <li>
            <div>Order Total </div>
            <div>${order.totalPrice}</div>
          </li>
        </ul>
      </div>
    </div >
  )
}

export default OrderScreen;