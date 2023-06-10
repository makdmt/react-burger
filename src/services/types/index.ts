import { ThunkAction } from "redux-thunk";
import { TypedUseSelectorHook,
   useSelector as selectorHook,
   useDispatch as dispatchHook } from "react-redux";
import { Action, ActionCreator } from "redux";
import { store } from "../..";
import { Root } from "react-dom/client";
import { TBurgerConstructorActions } from "../actions/burgerConstructor";
import { TWsFeedActions } from "../actions/wsFeed";


type TAppActions = TBurgerConstructorActions | TWsFeedActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TAppActions>>;
// export type ApThunk = <ReturnType, Action, RootState, TAppActions>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>();


