import { burgerReducer } from "./burgerConstructor";
import { userAuthReducer } from "./userAuth";
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  burgerConstructor: burgerReducer,
  userAuth: userAuthReducer
});
