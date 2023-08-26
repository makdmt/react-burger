import { IFeedOrders } from "../types/data";

export const WS_USER_ORDERS_CONNECTION_START = 'WS_USER_ORDERS_CONNECTION_START' as const;
export const WS_USER_ORDERS_CONNECTION_SUCCESS = 'WS_USER_ORDERS_CONNECTION_SUCCESS' as const;
export const WS_USER_ORDERS_CONNECTION_ERROR = 'WS_USER_ORDERS_CONNECTION_ERROR' as const;
export const WS_USER_ORDERS_CONNECTION_CLOSED = 'WS_USER_ORDERS_CONNECTION_CLOSED' as const;
export const WS_USER_ORDERS_GET_ORDERS = 'WS_USER_ORDERS_GET_ORDERS' as const;

export interface IWsUserOrdersConnectionStart {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_START;
}
export interface IWsUserOrdersConnectionSuccess {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_SUCCESS;
}
export interface IWsUserOrdersConnectionError {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_ERROR;
}
export interface IWsUserOrdersConnectionClosed  {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_CLOSED;
}
export interface IWsUserOrdersGetOrders {
  readonly type: typeof WS_USER_ORDERS_GET_ORDERS;
  readonly payload: IFeedOrders
}

export type TWsUserOrdersActions =
IWsUserOrdersConnectionStart
| IWsUserOrdersConnectionSuccess
| IWsUserOrdersConnectionError
| IWsUserOrdersConnectionClosed
| IWsUserOrdersGetOrders
