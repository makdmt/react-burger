import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED, POST_BURGER_INGREDIENTS } from '../actions/burgerConstructor'

const initialState = {

  items: [],
  itemsRequest: false,
  itemsFailed: false,
  constructedBurgerIngredients: [],
  selectedIngredientDetails: {},

}

export const burgerReducer = (state = initialState, action) => {
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
    default: {
      return state;
    }
  }
}
