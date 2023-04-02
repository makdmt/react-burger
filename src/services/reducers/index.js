import { burgerReducer } from "./burgerConstructor";
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  burgerConstructor: burgerReducer,
});
