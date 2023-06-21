import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook,
   useSelector as selectorHook,
   useDispatch as dispatchHook } from "react-redux";
import { Action, ActionCreator } from "redux";
import { store } from "../..";
import { Root } from "react-dom/client";
import { TBurgerConstructorActions } from "../actions/burgerConstructor";
import { TWsFeedActions } from "../actions/wsFeed";
import { TUserAuthActions } from "../actions/userAuth";


type TAppActions = TBurgerConstructorActions | TWsFeedActions | TUserAuthActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, RootState, Action, TAppActions>>;
// export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, Action, TAppActions>;

// export type AppDispatch = ThunkDispatch<RootState, never, TAppActions>;
// export const useDispatch = () => dispatchHook<AppDispatch>()



// export type ApThunk = <ReturnType, Action, RootState, TAppActions>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export type AppDispatch = typeof store.dispatch;
// type DispatchFunc = () => AppDispatch
// export type AppDispatch = ThunkDispatch< RootState, unknown, TAppActions >;
// export const useDispatch = () => dispatchHook<AppDispatch | ThunkAction<void, Action, RootState, TAppActions>>();
export const useDispatch = () => dispatchHook<any>();
// export const useDispatch: DispatchFunc = dispatchHook;


