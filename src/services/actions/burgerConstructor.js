import { getIngredients, postOrder } from '../../utils/burger-api'
import { getCookie } from '../../utils/cookie-set-get';
import { v4 as uuidv4 } from 'uuid'

const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

const ADD_MAIN_INGREDIENT_TO_BURGER = 'ADD_MAIN_INGREDIENT_TO_BURGER';
const ADD_BUN_INGREDIENT_TO_BURGER = 'ADD_BUN_INGREDIENT_TO_BURGER';
const REMOVE_IGREDIENT_FROM_BURGER = 'REMOVE_IGREDIENT_FROM_BURGER';
const RESET_BURGER = 'RESET_BURGER';

const PUT_INGREDIENT_DETAILS_TO_MODAL = 'PUT_INGREDIENT_DETAILS_TO_MODAL';
const DELETE_INGREDIENT_DETAILS_FROM_MODAL = 'DELETE_INGREDIENT_DETAILS_FROM_MODAL';

const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST'
const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
const DELETE_ORDER_DETAILS_FROM_MODAL = 'DELETE_ORDER_DETAILS_FROM_MODAL';

const PUT_HIST_ORDER_TO_MODAL = 'PUT_HIST_ORDER_TO_MODAL';
const DELETE_HIST_ORDER_FROM_MODAL = 'DELETE_HIST_ORDER_FROM_MODAL';


function getItems() {
  return function (dispatch) {
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

function completeOrder(ingredientsId) {
  return function (dispatch) {
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

const addIngredientToConstructor = (ingredientId, allIngredients, arrayIndex = 1) => (dispatch) => {
  const uuid = uuidv4();
  const [foundIngredient] = allIngredients.filter(ingredient => ingredient._id === ingredientId);
  const addingIngredient = {ingredientDetails: foundIngredient, uuid};
  foundIngredient.type === 'bun' ? dispatch({ type: ADD_BUN_INGREDIENT_TO_BURGER, payload: addingIngredient, arrayIndex: arrayIndex}) : dispatch({ type: ADD_MAIN_INGREDIENT_TO_BURGER, payload: addingIngredient, arrayIndex: arrayIndex})
}

const removeIngredientFromConstructor = (uuid) => (dispatch) => {
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
