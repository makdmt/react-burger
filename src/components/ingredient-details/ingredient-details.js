import React, { useState } from "react";

import { useSelector } from "react-redux";

import ingredientDetailsStyles from "./ingredient-details.module.css";

function IngredientDetails () {

  const {name, image_large, _id, proteins, fat, carbohydrates, calories} = useSelector(state => state.burgerConstructor.selectedIngredientDetails);

  return (
    <div className={`${ingredientDetailsStyles.section} m-10 mb-15`}>

    <h2 className={`${ingredientDetailsStyles.heading} text text_type_main-large`}>Детали ингредиента</h2>
    <img src={image_large} alt={name} />
    <h3 className={`${ingredientDetailsStyles.ingredientName} text text_type_main-medium mt-4 mb-8`}>{name}</h3>

    <ul className={`${ingredientDetailsStyles.nutrients}`}>
       <li className="text text_type_main-default text_color_inactive">{`Калории,\u00A0ккал`} <br/><span className="text_type_digits-default">{calories}</span></li>
       <li className="text text_type_main-default text_color_inactive">{`Белки,\u00A0г`} <br/><span className="text_type_digits-default">{proteins}</span></li>
       <li className="text text_type_main-default text_color_inactive">{`Жиры,\u00A0г`} <br/><span className="text_type_digits-default">{fat}</span></li>
       <li className="text text_type_main-default text_color_inactive">{`Улеводы,\u00A0г`} <br/><span className="text_type_digits-default">{carbohydrates}</span></li>
    </ul>
    </div>

  )
}

export default IngredientDetails;
