import {
    ORDER_NUMBER_REQUEST,
    ORDER_NUMBER_SUCCESS,
    ORDER_NUMBER_FAILURE,
    ORDER_NUMBER_CLEAR,
  } from '../actions/orderDetails';
  
  const orderDetailsState = {
    orderNumber: '',
    loading: false,
    error: '',
  };
  export const orderDetailsReducer = (state = orderDetailsState, action) => {
    switch (action.type) {
      case ORDER_NUMBER_REQUEST:
        return { ...state, orderNumber: '', loading: true, error: '' };
      case ORDER_NUMBER_SUCCESS:
        return {
          ...state,
          loading: false,
          error: '',
          orderNumber: action.payload,
        };
      case ORDER_NUMBER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          orderNumber: '',
        };
      case ORDER_NUMBER_CLEAR:
        return { ...state, orderNumber: '', loading: false, error: '' };
      default:
        return state;
    }
  };