import React from "react";
import PropTypes from 'prop-types';

import { useSelector } from "react-redux";

import { OrderStatusElement } from "../order-status-element/order-status-element";
import { PriceElement } from "../price-element/price-element";
import { IconsDeck } from "../icons-deck/icons-deck";

import { RelatedTime } from "../related-time/related-time";


import styles from './order-history-element.module.css'

export function OrderHistoryElement({ name, number, ingredients, createdAt, status }) {

  const { items: allIngredients, currentBurgerItems } = useSelector(store => store.burgerConstructor);

  const orderPrice = React.useMemo(() => {
    if (ingredients.length !== 0 && allIngredients !== 0) {
      return ingredients.reduce((acc, item) => {
        return acc + allIngredients.find(ingredient => ingredient._id === item).price
      }, 0)
    }
    return 'не известно'
  }, [ingredients, allIngredients])

  const ingredientsIcons = React.useMemo(() => {
    return ingredients.map((item) => {
      const ingredientDetails = allIngredients.find(ingredient => ingredient._id === item);
      return { image: ingredientDetails?.image, name: ingredientDetails?.name }
    })
  }, [ingredients, allIngredients])


  return (
    <div className={`${styles.section} mb-4 p-6`}>
      <div className={styles.flexLineSpaceBetween}>
        <p className="text text_type_digits-default mr-6">#{number}</p>
        <RelatedTime time={createdAt} />
      </div>
      <div className="mt-6 mb-6">
        <p className="text text_type_main-medium">{name}</p>
        {!!status && <OrderStatusElement status={status} />}
      </div>
      <div className={styles.flexLineSpaceBetween}>
        {!!ingredientsIcons && <IconsDeck icons={ingredientsIcons} />}
        <PriceElement price={orderPrice} extraClass={'ml-6'} />
      </div>
    </div>
  )
}

OrderHistoryElement.propTypes = PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    createdAt: PropTypes.string.isRequired,
    status: PropTypes.string,
}).isRequired;
