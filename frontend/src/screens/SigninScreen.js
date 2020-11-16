import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import BarMenu from "../components/BarMenu";

function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
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
    dispatch(signin(email, password));

  }
  return ( 
    <div className="homescreen-container" >
      <BarMenu handleCategChange={() => props.history.push('/')}/>
      <div className="sign-in-container">
        <div className="brand">
          <a href="/"> ePet-shop </a>
        </div>
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <div className="signin-title">
                <h2>Sign In</h2>
                <p>to continue to ePet-shop</p>
              </div>
            </li>
            {/* <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
            </li> */}
            <li>
              <div className="signin-form">
                <label className="signin-label" htmlFor="email"> Email address or username</label>
                <input className="signin-input" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
              </div>
            </li>
            <li>
              <div className="signin-form">
                <label className="signin-label" htmlFor="password">Password</label>
                <input className="signin-input" type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
              </div>
            </li>
            <li>
              <button type="submit" className="button-prm signin-btn">Signin</button>
            </li>
            <li>
              <div className="divide-breaker">
                <p className="signin-new"> <span style={{background: '#fff', padding: '2rem'}}>New to ePet-shop?</span>  </p>
              </div>
            </li>
            <li>
              <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="create-new-btn" >Create your ePet-shop account</Link>
            </li>
          </ul>
        </form>
      </div>
    </div>
  )
}
export default SigninScreen;