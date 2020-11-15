import Axios from "axios";
import Cookie from "js-cookie";
import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL
} from "../constants/orderConstants";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const { userSignin: { userInfo } } = getState();
    const newOrder = await Axios.post("/api/orders", order, {
      headers: {
        Authorization: ' Bearer ' + userInfo.token
      }
    });
    console.log("newOrder._id = " + newOrder.data._id);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder.data });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
}

const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get("/api/orders/mine", {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
}

const listOrders = () => async (dispatch, getState) => {

  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get("/api/orders", {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
}

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get("/api/orders/" + orderId, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    //console.log("payload: data = " + JSON.stringify(data));
    dispatch({
      type: ORDER_DETAILS_SUCCESS, payload: {
        _id: data._id,
        shippingAddress: data.shippingAddress.address +
          " " + data.shippingAddress.city +
          " " + data.shippingAddress.postalCode +
          " " + data.shippingAddress.country,
        orderItems: data.orderItems,
        isPaid: data.isPaid,
        paidAt: data.paidAt,
        user: data.user,
        paymentMethod: data.paymentMethod,
        itemsPrice: data.itemsPrice,
        taxPrice: data.taxPrice,
        shippingPrice: data.shippingPrice,
        totalPrice: data.totalPrice
      }
    })
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
}

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
    //console.log("order (payOrder) = " + JSON.stringify(order));
    //console.log("paymentResult (payOrder) = " + paymentResult);
    dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    //console.log("payOrder (data) = " + JSON.stringify(data));
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
  } catch (error) {
    //console.log("payOrder (error) = " + error)
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }
}

const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.delete("/api/orders/" + orderId, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }
}
export { createOrder, detailsOrder, payOrder, listMyOrders, listOrders, deleteOrder };