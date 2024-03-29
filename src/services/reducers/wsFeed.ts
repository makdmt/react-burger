import { TWsFeedActions } from "../actions/wsFeed";
import { IFeedOrders } from "../types/data";

import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_ORDERS,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR
} from "../actions/wsFeed";

interface IWsFeedState {
  wsFeedConnected: boolean,
  feedOrders: IFeedOrders | null
}

const initialState: IWsFeedState = {
  wsFeedConnected: false,
  feedOrders: null
}

export const wsFeedReducer = (state = initialState, action: TWsFeedActions): IWsFeedState => {
  switch (action.type) {
    case WS_FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        wsFeedConnected: true
      };

    case WS_FEED_CONNECTION_CLOSED:
      return {
        ...state,
        wsFeedConnected: false
      };


    case WS_FEED_CONNECTION_ERROR:
      return {
        ...state,
        wsFeedConnected: false
      };


    case WS_FEED_GET_ORDERS:
      return {
        ...state,
        feedOrders: action.payload
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
