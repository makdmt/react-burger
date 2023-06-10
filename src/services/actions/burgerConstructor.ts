import { getIngredients, postOrder } from '../../utils/burger-api'
import { getCookie } from '../../utils/cookie-set-get';
import { v4 as uuidv4 } from 'uuid';

import { IIngredient, TingredientsId, TAllIngredients, IingredientInConstructor } from '../types/data';
import { AppDispatch, AppThunk} from '../types';

const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';

const ADD_MAIN_INGREDIENT_TO_BURGER: 'ADD_MAIN_INGREDIENT_TO_BURGER' = 'ADD_MAIN_INGREDIENT_TO_BURGER';
const ADD_BUN_INGREDIENT_TO_BURGER: 'ADD_BUN_INGREDIENT_TO_BURGER' = 'ADD_BUN_INGREDIENT_TO_BURGER';
const REMOVE_IGREDIENT_FROM_BURGER: 'REMOVE_IGREDIENT_FROM_BURGER' = 'REMOVE_IGREDIENT_FROM_BURGER';
const RESET_BURGER: 'RESET_BURGER' = 'RESET_BURGER';

const PUT_INGREDIENT_DETAILS_TO_MODAL: 'PUT_INGREDIENT_DETAILS_TO_MODAL' = 'PUT_INGREDIENT_DETAILS_TO_MODAL';
const DELETE_INGREDIENT_DETAILS_FROM_MODAL: 'DELETE_INGREDIENT_DETAILS_FROM_MODAL' = 'DELETE_INGREDIENT_DETAILS_FROM_MODAL';

const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST'
const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';
const DELETE_ORDER_DETAILS_FROM_MODAL: 'DELETE_ORDER_DETAILS_FROM_MODAL' = 'DELETE_ORDER_DETAILS_FROM_MODAL';

const PUT_HIST_ORDER_TO_MODAL: 'PUT_HIST_ORDER_TO_MODAL' = 'PUT_HIST_ORDER_TO_MODAL';
const DELETE_HIST_ORDER_FROM_MODAL: 'DELETE_HIST_ORDER_FROM_MODAL' = 'DELETE_HIST_ORDER_FROM_MODAL';


export interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}
export interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: ReadonlyArray<IIngredient>;
}
export interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
}


export interface IAddMainIngredientToBurger {
  readonly type: typeof ADD_MAIN_INGREDIENT_TO_BURGER;
  readonly payload: IingredientInConstructor;
  readonly arrayIndex: number;
}
export interface IAddBunIngredientToBurger {
  readonly type: typeof ADD_BUN_INGREDIENT_TO_BURGER;
  readonly payload: IingredientInConstructor;
  readonly arrayIndex: number;
}
export interface IRemoveIngredientFromBurger {
  readonly type: typeof REMOVE_IGREDIENT_FROM_BURGER;
  readonly payload: string;

}
export interface IResetBurger {
  readonly type: typeof RESET_BURGER;
}


export interface IPutIngredientDetailsToModal {
  readonly type: typeof PUT_INGREDIENT_DETAILS_TO_MODAL;
  readonly payload: IIngredient
}
export interface IDeleteIngredientDetailFromModal {
  readonly type: typeof DELETE_INGREDIENT_DETAILS_FROM_MODAL;
}


export interface IPostOrderRequest {
  readonly type: typeof POST_ORDER_REQUEST;
}
export interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly payload: string
}
export interface IPostOrderFailed {
  readonly type: typeof POST_ORDER_FAILED;
}
export interface IDeleteOrderDetailsFromModal {
  readonly type: typeof DELETE_ORDER_DETAILS_FROM_MODAL;
}


export interface IPutHistOrderToModal {
  readonly type: typeof PUT_HIST_ORDER_TO_MODAL;
  readonly payload: any;
}
export interface IDeleteHistOrderFromModal {
  readonly type: typeof DELETE_HIST_ORDER_FROM_MODAL;
}


export type TBurgerConstructorActions =
IGetItemsRequest
| IGetItemsSuccess
| IGetItemsFailed
| IAddMainIngredientToBurger
| IAddBunIngredientToBurger
| IRemoveIngredientFromBurger
| IResetBurger
| IPutIngredientDetailsToModal
| IDeleteIngredientDetailFromModal
| IPostOrderRequest
| IPostOrderSuccess
| IPostOrderFailed
| IDeleteOrderDetailsFromModal
| IPutHistOrderToModal
| IDeleteHistOrderFromModal


const getItems: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    getIngredients()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            items: res.data
          })
        }
      })
      .catch(err => {
        dispatch({
          type: GET_ITEMS_FAILED
        });
        console.error(err);
      });
  }
};


const completeOrder: AppThunk = (ingredientsId: TingredientsId) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: POST_ORDER_REQUEST
    });
    postOrder(ingredientsId, getCookie('accessToken'))
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: POST_ORDER_SUCCESS,
          payload: res.order.number
        })
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: POST_ORDER_FAILED
      })
    })
  }
};

const addIngredientToConstructor: AppThunk = (ingredientId: string, allIngredients: TAllIngredients, arrayIndex: number = 1) => (dispatch: AppDispatch) => {
  const uuid = uuidv4();
  const [foundIngredient] = allIngredients.filter(ingredient => ingredient._id === ingredientId);
  const addingIngredient = {ingredientDetails: foundIngredient, uuid};
  foundIngredient.type === 'bun' ? dispatch({ type: ADD_BUN_INGREDIENT_TO_BURGER, payload: addingIngredient, arrayIndex: arrayIndex}) : dispatch({ type: ADD_MAIN_INGREDIENT_TO_BURGER, payload: addingIngredient, arrayIndex: arrayIndex})
}

const removeIngredientFromConstructor: AppThunk = (uuid: string) => (dispatch: AppDispatch) => {
  dispatch({ type: REMOVE_IGREDIENT_FROM_BURGER, payload: uuid })
}


export { GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  getItems,
  PUT_INGREDIENT_DETAILS_TO_MODAL,
  DELETE_INGREDIENT_DETAILS_FROM_MODAL,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  DELETE_ORDER_DETAILS_FROM_MODAL,
  ADD_MAIN_INGREDIENT_TO_BURGER,
  ADD_BUN_INGREDIENT_TO_BURGER,
  REMOVE_IGREDIENT_FROM_BURGER,
  RESET_BURGER,
  completeOrder,
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  PUT_HIST_ORDER_TO_MODAL,
  DELETE_HIST_ORDER_FROM_MODAL
 }
