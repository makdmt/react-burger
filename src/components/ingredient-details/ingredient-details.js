import React from "react";
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from "react-redux";
import { PUT_INGREDIENT_DETAILS_TO_MODAL, DELETE_INGREDIENT_DETAILS_FROM_MODAL } from "../../services/actions/burgerConstructor";

import ingredientDetailsStyles from "./ingredient-details.module.css";

export function IngredientDetails({ id }) {

  const allIngredients = useSelector(store => store.burgerConstructor.items);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const ingredientDetails = allIngredients.find(product => product._id === id)
    dispatch({ type: PUT_INGREDIENT_DETAILS_TO_MODAL, payload: ingredientDetails });

    return () => dispatch({ type: DELETE_INGREDIENT_DETAILS_FROM_MODAL})
  }, [allIngredients, dispatch, id]);

  const selectedIngredient = useSelector(state => state.burgerConstructor.selectedIngredientDetails);


  return (
    <div className={`${ingredientDetailsStyles.section} m-10 mb-15`}>

      <h2 className={`${ingredientDetailsStyles.heading} text text_type_main-large`}>Детали ингредиента</h2>
      <img src={selectedIngredient?.image_large} alt={selectedIngredient?.name} />
      <h3 className={`${ingredientDetailsStyles.ingredientName} text text_type_main-medium mt-4 mb-8`}>{selectedIngredient?.name}</h3>

      <ul className={`${ingredientDetailsStyles.nutrients}`}>
        <li className="text text_type_main-default text_color_inactive">{`Калории,\u00A0ккал`} <br /><span className="text_type_digits-default">{selectedIngredient?.calories}</span></li>
        <li className="text text_type_main-default text_color_inactive">{`Белки,\u00A0г`} <br /><span className="text_type_digits-default">{selectedIngredient?.proteins}</span></li>
        <li className="text text_type_main-default text_color_inactive">{`Жиры,\u00A0г`} <br /><span className="text_type_digits-default">{selectedIngredient?.fat}</span></li>
        <li className="text text_type_main-default text_color_inactive">{`Улеводы,\u00A0г`} <br /><span className="text_type_digits-default">{selectedIngredient?.carbohydrates}</span></li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  id: PropTypes.string.isRequired
}

