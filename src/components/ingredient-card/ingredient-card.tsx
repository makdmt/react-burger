import React, { FC, useState, useEffect } from 'react'
// import PropTypes from 'prop-types';

import { useSelector } from '../../services/types/index';
import { useNavigate } from 'react-router-dom';

import { useDrag } from 'react-dnd/dist/hooks';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientCardStyles from './ingredient-card.module.css'

import { IIngredient } from '../../services/types/data';

const IngredientCard: FC<IIngredient> = (ingredient) => {

  const currentBurgerIngredients = useSelector(store => store.burgerConstructor.currentBurgerItems);

  const navigate = useNavigate();

  const ingredientId = ingredient._id;
  const [counter, setCounter] = useState(0);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredientId },
  })

  useEffect(() => {
    setCounter(currentBurgerIngredients.reduce((a, b) => {
      return b.ingredientDetails._id === ingredientId
        ? b.ingredientDetails.type === "bun"
          ? (a + 2)
          : (a + 1)
        : a
    }, 0))
  }, [currentBurgerIngredients])


  const openModalFunction = (productId: string) => () => {
    navigate(`/ingredients/${productId}`, { replace: false, state: { background: '/' } });
  }

  return (
      <div className={`${ingredientCardStyles.igredientCard} mb-8 ml-4 mr-2 `} onClick={openModalFunction(ingredient._id)} ref={dragRef}>
        <Counter count={counter} size="default" />
        <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name} />
        <p className="text text_type_digits-default mt-1 mb-1">{ingredient.price} <CurrencyIcon type="primary" /></p>
        <figcaption className={`${ingredientCardStyles.ingredientName} text text_type_main-default`}>{ingredient.name}</figcaption>
      </div>
  )
}

// IngredientCard.propTypes = PropTypes.shape(ingredientPropType).isRequired;

export default IngredientCard;
