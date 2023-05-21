import React from "react";
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from "react-redux";
import { PUT_HIST_ORDER_TO_MODAL, DELETE_HIST_ORDER_FROM_MODAL } from "../../services/actions/burgerConstructor";

import { useLocation, useParams } from "react-router-dom";

import { OrderStatusElement } from "../order-status-element/order-status-element";
import { HistOrderIngredientListElement } from "../hist-order-ingredient-list-element/hist-order-ingredient-list-element";
import { RelatedTime } from "../related-time/related-time";
import { PriceElement } from "../price-element/price-element";

import styles from "./hist-order-details.module.css";

export function HistOrderDetails() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const storeBranch = React.useMemo(() => {
    const branch = location.pathname.split('/')[1]
    switch (branch) {
      case 'feed':
        return ['wsFeed', 'feedOrders']
      case 'profile':
        return ['wsUserOrders', 'userOrders']
    }
  }, [location])


  const allOrders = useSelector(store => store[storeBranch[0]][storeBranch[1]].orders);
  const { items: allIngredients, currentBurgerItems } = useSelector(store => store.burgerConstructor);


  React.useEffect(() => {
    if (allOrders && allOrders.length > 0) {
      const orderDetails = allOrders.find(order => order._id === id)
      dispatch({ type: PUT_HIST_ORDER_TO_MODAL, payload: orderDetails });

      return () => dispatch({ type: DELETE_HIST_ORDER_FROM_MODAL })
    }
  }, [allOrders, dispatch, id]);

  const selectedOrder = useSelector(state => state.burgerConstructor.histOrderInModal);

  const ingredientToRender = React.useMemo(() => {
    if (selectedOrder && selectedOrder.ingredients.length > 0) {
      const ingredientsWitnCounts = selectedOrder.ingredients.reduce((acc, item) => {
        acc.hasOwnProperty(item) ? acc[item] += 1 : acc[item] = 1;
        return acc;
      }, {})

      return Object.entries(ingredientsWitnCounts);
    }
  }, [selectedOrder])

  const orderPrice = React.useMemo(() => {
    if (selectedOrder && selectedOrder.ingredients.length !== 0 && allIngredients !== 0) {
      return selectedOrder.ingredients.reduce((acc, item) => {
        return acc + allIngredients.find(ingredient => ingredient._id === item).price
      }, 0)
    }
    return 'не известно'
  }, [selectedOrder, allIngredients])

  if (!!selectedOrder && ingredientToRender) {
    return (
      <div className={`${styles.section} m-10 mb-15`}>
        <h2 className={`text text_type_digits-default mb-10 ${styles.orderNumber}`}>#{selectedOrder.number}</h2>
        <h3 className={`text text_type_main-medium`}>{selectedOrder.name}</h3>
        <OrderStatusElement status={selectedOrder.status} extraClass={'mt-3'} />
        <p className={`text text_type_main-medium mt-15 mb-6`}>Состав:</p>
        <ul className={`${styles.listContainer} pr-6`}>
          {ingredientToRender.map((ingredient, index) => {
            const ingredientDetails = allIngredients.find(item => item._id === ingredient[0]);
            return <HistOrderIngredientListElement key={index} image={ingredientDetails.image} name={ingredientDetails.name} price={ingredientDetails.price} count={ingredient[1]} />
          })}
        </ul>
        <div className={`${styles.flexLineSpaceBetween} mt-6`}>
          <RelatedTime time={selectedOrder.createdAt} />
          <PriceElement price={orderPrice} />
        </div>
      </div>
    )
  }
}

// HistOrderDetails.propTypes = {
//   id: PropTypes.string.isRequired
// }
