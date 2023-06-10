import React, { FC } from "react";

import { useSelector } from '../../services/types/index';

import { OrderStatusElement } from "../order-status-element/order-status-element";
import { PriceElement } from "../price-element/price-element";
import { IconsDeck } from "../icons-deck/icons-deck";

import { RelatedTime } from "../related-time/related-time";

import styles from './order-history-element.module.css'
import { IOrderDetails, IIngredient } from "../../services/types/data";


export const OrderHistoryElement: FC<IOrderDetails> = ({ name, number, ingredients, createdAt, status }) => {

  const { items: allIngredients, currentBurgerItems } = useSelector(store => store.burgerConstructor);

  const orderPrice = React.useMemo<string | number>(() => {
    if (ingredients.length !== 0 && allIngredients.length !== 0) {
      return ingredients.reduce((acc, item) => {
        const ingredientPrice = allIngredients.find(ingredient => ingredient._id === item)?.price;
        return ingredientPrice ? acc + ingredientPrice : acc;
      }, 0)
    }
    return 'не известно'
  }, [ingredients, allIngredients])

  const ingredientsIcons = React.useMemo<Array<{ name: string, image: string }>>(() => {
    return ingredients.map((item: string | number) => {
      const ingredientDetails = allIngredients.find((ingredient: IIngredient) => ingredient._id === item);
      return ingredientDetails ? { image: ingredientDetails.image, name: ingredientDetails.name } : { image: 'не найдено', name: 'не найдено' }
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

