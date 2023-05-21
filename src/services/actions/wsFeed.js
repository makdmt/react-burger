export const WS_FEED_CONNECTION_START = 'WS_FEED_CONNECTION_START';
export const WS_FEED_CONNECTION_SUCCESS = 'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_GET_ORDERS = 'WS_GET_FEED_ORDERS';


export const wsConnectionSuccess = () => {
  return {
    type: WS_FEED_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_FEED_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_FEED_CONNECTION_CLOSED
  };
};

export const wsGetOrders = orders => {
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
