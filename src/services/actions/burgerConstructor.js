import { getIngredients, postOrder } from '../../utils/burger-api'

const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

const PUT_INGREDIENT_DETAILS_TO_MODAL = 'PUT_INGREDIENT_DETAILS_TO_MODAL';
const DELETE_INGREDIENT_DETAILS_FROM_MODAL = 'DELETE_INGREDIENT_DETAILS_FROM_MODAL';


const POST_BURGER_INGREDIENTS = 'POST_BURGER_INGREDIENTS';



function getItems() {
  return function(dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    getIngredients().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data
        });
      } else {
        dispatch({
          type: GET_ITEMS_FAILED
        });
      }
    });
  };
}



export { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED, getItems, POST_BURGER_INGREDIENTS }
