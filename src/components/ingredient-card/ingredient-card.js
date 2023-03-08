import React, { useState } from 'react'
import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientDetails from '../ingredient-details/ingredient-details';
import withModal from '../hocs/withModal';

import ingredientCardStyles from './ingredient-card.module.css'

import { ingredientPropType } from '../../utils/data'

function IngredientCard({ oneCategoryIngredients }) {

  const [modalOpened, setModalOpened] = useState(false);
  const [ingredientToModal, setIngredientToModal] = useState({});

  const openModalFunction = (productId) => () => {
    const ingredientDetails = oneCategoryIngredients.find(product => product._id === productId)
    setIngredientToModal(ingredientDetails);
    setModalOpened(true);
  }

  const closeModalByClick = (event) => {
    event.currentTarget === event.target && setModalOpened(false);
  }

  const closeModalByXbtn = (event) => {
    event.stopPropagation();
    setModalOpened(false);
  }

  const closeModalByEsc = (event) => {
    event.key === 'Escape' && setModalOpened(false);
  }

  const WithModalIngredientDetails = withModal(IngredientDetails);

  return (
    <>
      {modalOpened && <WithModalIngredientDetails closeByClickFunc={closeModalByClick} closeByX={closeModalByXbtn} closeByEsc={closeModalByEsc} {...ingredientToModal} />}
      {oneCategoryIngredients.map((ingredient, ind) => {
        return (
          <div className={`${ingredientCardStyles.igredientCard} mb-8 ml-4 mr-2 `} key={ind} onClick={openModalFunction(ingredient._id)}>
            <Counter count={1} size="default" />
            <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name} />
            <p className="text text_type_digits-default mt-1 mb-1">{ingredient.price} <CurrencyIcon type="primary" /></p>
            <figcaption className={`${ingredientCardStyles.ingredientName} text text_type_main-default`}>{ingredient.name}</figcaption>

          </div>
        )
      })}
    </>
  )
}

IngredientCard.propTypes = {
  oneCategoryIngredients: PropTypes.arrayOf(PropTypes.shape(ingredientPropType)).isRequired

}

export default IngredientCard;
