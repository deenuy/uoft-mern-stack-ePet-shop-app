import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import BarMenu from "../components/BarMenu";

function ShippingScreen(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    props.history.push('payment');
  }
  return (
    <div className="homescreen-container" >
      <BarMenu handleCategChange={() => props.history.push('/')}/>
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>

            <li>
              <label className="form-label" htmlFor="address">
                Address
            </label>
              <input className='form-input' type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
              </input>
            </li>
            <li>
              <label className="form-label" htmlFor="city">
                City
            </label>
              <input className='form-input' type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
              </input>
            </li>
            <li>
              <label className="form-label" htmlFor="postalCode">
                Postal Code
            </label>
              <input className='form-input' type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
              </input>
            </li>
            <li>
              <label className="form-label" htmlFor="country">
                Country
            </label>
              <input className='form-input' type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
              </input>
            </li>
            <li>
              <button type="submit" className="button-prm shipping-btns">Continue</button>
            </li>

          </ul>
        </form>
      </div>
    </div>
  )
}
export default ShippingScreen;