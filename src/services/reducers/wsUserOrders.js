import {
  WS_USER_ORDERS_CONNECTION_START,
  WS_USER_ORDERS_CONNECTION_SUCCESS,
  WS_USER_ORDERS_GET_ORDERS,
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_USER_ORDERS_CONNECTION_ERROR
} from "../actions/wsUserOrders"
;

const initialState = {
  wsUserOrdersConnected: false,
  userOrders: []
}

export const wsUserOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_USER_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsUserOrdersConnected: true
      };

    case WS_USER_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        wsUserOrdersConnected: false
      };


    case WS_USER_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsUserOrdersConnected: false
      };


    case WS_USER_ORDERS_GET_ORDERS:
      return {
        ...state,
        userOrders: action.payload
      };

    // case WS_FEED_GET_ORDERS:
    //   return {
    //     ...state,
    //     feedOrders: !!state.feedOrders.length
    //       ? [...state.feedOrders, { ...action.payload }]
    //       : [{ ...action.payload }]
    //   };


    default:
      return state;
  }

}
