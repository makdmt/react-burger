import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';
import { rootReducer } from '../reducers';

interface IWsActions {
  onOpen: string,
  onClose: string,
  onError: string,
  onMessage: string,
  wsSendMessage: string,
  wsInit: string,
}

interface IWsReduxActions {
  type: string;
  payload?: string;
}

type RootState = ReturnType<typeof rootReducer>;


export const socketMiddleware = (wsUrl: string, wsActions: IWsActions , getToken?: () => string) => {
  return (store: MiddlewareAPI<Dispatch<AnyAction>, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: Dispatch<IWsReduxActions> ) => (action: IWsReduxActions)=> {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      const { authUser } = getState().userAuth;

      if (type === wsInit && typeof getToken === 'function') {
        socket = new WebSocket(`${wsUrl}?token=${getToken()}`);
      }

      if (type === wsInit && !getToken) {
        socket = new WebSocket(`${wsUrl}`);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        // if (type === wsSendMessage) {
        //   const message = { ...payload, token: user.token };
        //   socket.send(JSON.stringify(message));
        // }
      }

      next(action);
    };
  };
};
