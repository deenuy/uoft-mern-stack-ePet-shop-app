import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {
    productListReducer,
    productDetailsReducer,
    productSaveReducer,
    productDeleteReducer,
    productReviewSaveReducer,
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';

import {
    userSigninReducer,
    userRegisterReducer,
    userUpdateReducer,
} from './reducers/userReducers';

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    myOrderListReducer,
    orderListReducer,
    orderDeleteReducer,
} from './reducers/orderReducers';

const cartItems = Cookie.getJSON('cartItems') || [];

const initialState = { cart: { cartItems, shipping: {}, payment: {} } };
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    productReviewSave: productReviewSaveReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));

export default store;