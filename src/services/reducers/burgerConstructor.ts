import { TBurgerConstructorActions } from '../actions/burgerConstructor'
import { IIngredient, IingredientInConstructor, IOrderDetails, IorderToPost } from '../types/data'
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  ADD_MAIN_INGREDIENT_TO_BURGER,
  ADD_BUN_INGREDIENT_TO_BURGER,
  REMOVE_IGREDIENT_FROM_BURGER,
  RESET_BURGER,
  PUT_INGREDIENT_DETAILS_TO_MODAL,
  DELETE_INGREDIENT_DETAILS_FROM_MODAL,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  DELETE_ORDER_DETAILS_FROM_MODAL,
  PUT_HIST_ORDER_TO_MODAL,
  DELETE_HIST_ORDER_FROM_MODAL

} from '../actions/burgerConstructor'

interface IburgerConstructorState {
  readonly items: ReadonlyArray<IIngredient>,
  readonly itemsRequest: boolean,
  readonly itemsFailed: boolean,
  readonly currentBurgerItems: ReadonlyArray<IingredientInConstructor>,
  readonly orderPostRequest: boolean,
  readonly orderDetails: IorderToPost | null,
  readonly selectedIngredientDetails: IIngredient | null,
  readonly histOrderInModal: IOrderDetails | null
}

const initialState: IburgerConstructorState = {

  items: [],
  itemsRequest: false,
  itemsFailed: false,
  currentBurgerItems: [],
  orderPostRequest: false,
  orderDetails: null,
  selectedIngredientDetails: null,
  histOrderInModal: null
}

export const burgerReducer = (state = initialState, action: TBurgerConstructorActions): IburgerConstructorState => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      }
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsRequest: false,
        items: action.items
      }
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: true
      }
    }

    case ADD_MAIN_INGREDIENT_TO_BURGER: {
      let newCurrentBurgerItems = [...state.currentBurgerItems];
      // let newCurrentBurgerItems = state.currentBurgerItems.slice();
      newCurrentBurgerItems.splice(action.arrayIndex, 0, action.payload);
      return {
        ...state,
        currentBurgerItems: newCurrentBurgerItems
      }
    }
    case ADD_BUN_INGREDIENT_TO_BURGER: {
      let newCurrentBurgerItems = [...state.currentBurgerItems].filter(ingredient => ingredient.ingredientDetails.type != 'bun');
      // let newCurrentBurgerItems = state.currentBurgerItems.slice().filter(ingredient => ingredient.type != 'bun');
      newCurrentBurgerItems.unshift(action.payload);

      return {
        ...state,
        currentBurgerItems: newCurrentBurgerItems
      }
    }
    case REMOVE_IGREDIENT_FROM_BURGER: {
      let newCurrentBurgerItems = [...state.currentBurgerItems].filter(ingredient => ingredient.uuid != action.payload);

      return {
        ...state,
        currentBurgerItems: newCurrentBurgerItems
      }
    }
    case RESET_BURGER: {
      return {
        ...state,
        currentBurgerItems: initialState.currentBurgerItems
      }
    }

    case PUT_INGREDIENT_DETAILS_TO_MODAL: {
      return {
        ...state,
        selectedIngredientDetails: action.payload
      }
    }
    case DELETE_INGREDIENT_DETAILS_FROM_MODAL: {
      return {
        ...state,
        selectedIngredientDetails: null
      }
    }
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderPostRequest: true
      }
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderPostRequest: false,
        orderDetails: {
          ...state.orderDetails,
          orderNumber: action.payload,
          orderPostSuccess: true
        }
      }
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderPostRequest: false,
        orderDetails: {
          ...state.orderDetails,
          orderNumber: '0000',
          orderPostSuccess: false
        }
      }
    }
    case DELETE_ORDER_DETAILS_FROM_MODAL: {
      return {
        ...state,
        orderDetails: null
      }
    }
    case PUT_HIST_ORDER_TO_MODAL: {
      return {
        ...state,
        histOrderInModal: action.payload
      }
    }
    case DELETE_HIST_ORDER_FROM_MODAL: {
      return {
        ...state,
        histOrderInModal: null
      }
    }
    default: {
      return state;
    }
  }
}

