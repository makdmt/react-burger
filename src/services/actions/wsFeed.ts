import { IOrderDetails, IFeedOrders } from "../types/data";

export const WS_FEED_CONNECTION_START = 'WS_FEED_CONNECTION_START' as const;
export const WS_FEED_CONNECTION_SUCCESS = 'WS_FEED_CONNECTION_SUCCESS' as const;
export const WS_FEED_CONNECTION_ERROR = 'WS_FEED_CONNECTION_ERROR' as const;
export const WS_FEED_CONNECTION_CLOSED = 'WS_FEED_CONNECTION_CLOSED' as const;
export const WS_FEED_GET_ORDERS = 'WS_GET_FEED_ORDERS' as const;

export interface IWsConnectionStart {
  readonly type: typeof WS_FEED_CONNECTION_START;
}
export interface IWsConnectionSuccess {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}
export interface IWsConnectionError {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
}
export interface IWsConnectionClosed  {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}
export interface IWsGetOrders {
  readonly type: typeof WS_FEED_GET_ORDERS;
  readonly payload: IFeedOrders
}

export type TWsFeedActions =
IWsConnectionStart
| IWsConnectionSuccess
| IWsConnectionError
| IWsConnectionClosed
| IWsGetOrders


export const wsConnectionSuccess = (): IWsConnectionSuccess => {
  return {
    type: WS_FEED_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = (): IWsConnectionError => {
  return {
    type: WS_FEED_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = (): IWsConnectionClosed => {
  return {
    type: WS_FEED_CONNECTION_CLOSED
  };
};

export const wsGetOrders = (orders: IFeedOrders): IWsGetOrders => {
  return {
    type: WS_FEED_GET_ORDERS,
    payload: orders
  };

  // export const wsSendMessage = message => {
  //   return {
  //     type: WS_SEND_MESSAGE,
  //     payload: message
  //   };
  // };
};
