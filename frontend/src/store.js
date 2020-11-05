import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
    productListReducer,
    productDetailsReducer,
    productSaveReducer,
    productDeleteReducer,
    productReviewSaveReducer,
} from './reducers/productReducers';

const initialState = {};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    productReviewSave: productReviewSaveReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));

export default store;