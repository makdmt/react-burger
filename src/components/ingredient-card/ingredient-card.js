import React from 'react'
import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientCardStyles from './ingredient-card.module.css'

import { ingredientPropType } from '../../utils/data'

  function IngredientCard({ oneCategoryIngredients }) {
    return (
      <>
         { oneCategoryIngredients.map((ingredient, ind) => {
            return (
              <div className={`${ingredientCardStyles.igredientCard} mb-8 ml-4 mr-2 `} key={ind}>
                <Counter count={1} size="default" />
                <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name}/>
                <p className="text text_type_digits-default mt-1 mb-1">{ingredient.price} <CurrencyIcon type="primary" /></p>
                <figcaption className={`${ingredientCardStyles.ingredientName} text text_type_main-default`}>{ingredient.name}</figcaption>
              </div>
            )
          })}
          </>

    )}

    IngredientCard.propTypes = {
      oneCategoryIngredients: PropTypes.arrayOf(ingredientPropType).isRequired

    }

    export default IngredientCard;
