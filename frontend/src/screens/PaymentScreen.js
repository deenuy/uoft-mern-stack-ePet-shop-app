import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import BarMenu from "../components/BarMenu";

function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push('placeorder');
  };
  return (
    <div className="homescreen-container" >
      <BarMenu handleCategChange={() => props.history.push('/')}/>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>

            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod1"
                  value="Paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label className="rdio-btn" htmlFor="paymentMethod1">Paypal</label>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod2"
                  value="Cash"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label className="rdio-btn" htmlFor="paymentMethod2">Cash</label>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod3"
                  value="Credit Card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label className="rdio-btn" htmlFor="paymentMethod3">Credit Card</label>
              </div>
            </li>

            <li>
              <button type="submit" className="button-prm payment-btn">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default PaymentScreen;
