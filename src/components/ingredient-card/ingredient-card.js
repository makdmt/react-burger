import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { PUT_INGREDIENT_DETAILS_TO_MODAL, DELETE_INGREDIENT_DETAILS_FROM_MODAL } from '../../services/actions/burgerConstructor';

import { useDrag } from 'react-dnd/dist/hooks';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientDetails from '../ingredient-details/ingredient-details';
import withModal from '../hocs/withModal';

import ingredientCardStyles from './ingredient-card.module.css'

import { ingredientPropType } from '../../utils/data'

function IngredientCard(ingredient) {

  const allIngredients = useSelector(store => store.burgerConstructor.items);
  const ingredientToModal = useSelector(state => state.burgerConstructor.selectedIngredientDetails);
  const currentBurgerIngredients = useSelector(store => store.burgerConstructor.currentBurgerItems);

  const dispatch = useDispatch();
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


  const openModalFunction = (productId) => () => {
    const ingredientDetails = allIngredients.find(product => product._id === productId)
    dispatch({ type: PUT_INGREDIENT_DETAILS_TO_MODAL, payload: ingredientDetails });
  }

  const closeModalByClick = (event) => {
    event.currentTarget === event.target && dispatch({ type: DELETE_INGREDIENT_DETAILS_FROM_MODAL });;
  }

  const closeModalByXbtn = (event) => {
    event.stopPropagation();
    dispatch({ type: DELETE_INGREDIENT_DETAILS_FROM_MODAL });
  }

  const closeModalByEsc = (event) => {
    event.key === 'Escape' && dispatch({ type: DELETE_INGREDIENT_DETAILS_FROM_MODAL });
  }

  const WithModalIngredientDetails = withModal(IngredientDetails);

  return (
    <>
      {!!ingredientToModal && <WithModalIngredientDetails closeByClickFunc={closeModalByClick} closeByX={closeModalByXbtn} closeByEsc={closeModalByEsc} />}
      <div className={`${ingredientCardStyles.igredientCard} mb-8 ml-4 mr-2 `} onClick={openModalFunction(ingredient._id)} ref={dragRef}>
        <Counter count={counter} size="default" />
        <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name} />
        <p className="text text_type_digits-default mt-1 mb-1">{ingredient.price} <CurrencyIcon type="primary" /></p>
        <figcaption className={`${ingredientCardStyles.ingredientName} text text_type_main-default`}>{ingredient.name}</figcaption>

      </div>
    </>
  )
}

IngredientCard.propTypes = PropTypes.shape(ingredientPropType).isRequired;

export default IngredientCard;
