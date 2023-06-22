import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook,
   useSelector as selectorHook,
   useDispatch as dispatchHook } from "react-redux";
import { Action, ActionCreator } from "redux";
import { store } from "../..";
import { Root } from "react-dom/client";
import { TBurgerConstructorActions } from "../actions/burgerConstructor";
import { TWsFeedActions } from "../actions/wsFeed";
import { TWsUserOrdersActions } from "../actions/wsUserOrders";
import { TUserAuthActions } from "../actions/userAuth";


export type RootState = ReturnType<typeof store.getState>;
type TAppActions = TBurgerConstructorActions | TWsFeedActions | TWsUserOrdersActions | TUserAuthActions;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, Action, TAppActions>;
export type AppDispatch = ThunkDispatch<RootState, Action, TAppActions>;
// export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>();
// type DispatchFunc = () => AppDispatch
// export const useDispatch: DispatchFunc = dispatchHook;



