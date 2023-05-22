import { burgerReducer } from "./burgerConstructor";
import { userAuthReducer } from "./userAuth";
import { wsFeedReducer } from "./wsFeed";
import { wsUserOrdersReducer } from "./wsUserOrders";
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  burgerConstructor: burgerReducer,
  userAuth: userAuthReducer,
  wsFeed: wsFeedReducer,
  wsUserOrders: wsUserOrdersReducer
});
