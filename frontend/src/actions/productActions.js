import axios from 'axios';

const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } = require("../constants/productConstants")

const listProducts = (petClass, category) => async (dispatch) => {

    var filter = petClass ? '?petClass=' + petClass : '';
    if (filter.length !== 0) {
        filter = filter + (category ? '&category=' + category : '');
    } else {
        filter = filter + (category ? '?category=' + category : '');
    }

    try{
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get("/api/products" + filter);
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.messages})
    }

}

const detailsProduct = (productId) => async (dispatch) => {
    console.log(productId);
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
        const {data} = await axios.get("/api/products/" + productId);
        console.log(data);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message});
    }
}

export {listProducts, detailsProduct}