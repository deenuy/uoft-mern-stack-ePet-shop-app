import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import BarMenu from "../components/BarMenu";

function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  }
  return (
  <div className="homescreen-container" >
    <BarMenu handleCategChange={() => props.history.push('/')}/>
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Create Account</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label className="form-label" htmlFor="name">
              Name
          </label>
            <input className="form-input" type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
            </input>
          </li>
          <li>
            <label className="form-label" htmlFor="email">
              Email
          </label>
            <input className="form-input" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
            </input>
          </li>
          <li>
            <label className="form-label" htmlFor="password">Password</label>
            <input className="form-input" type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
            </input>
          </li>
          <li>
            <label className="form-label" htmlFor="rePassword">Re-Enter Password</label>
            <input className="form-input" type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
            </input>
          </li>
          <li>
            <button type="submit" className="button-prm">Register</button>
          </li>
          <li>
            Already have an account at e-Petshop?
          <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button-prm signin-btn2">Sign in</Link>

          </li>

        </ul>
      </form>
    </div>
  </div>
  )
}
export default RegisterScreen;