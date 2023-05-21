import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

import { OrderHistoryElement } from '../order-history-element/order-history-element'
import styles from './order-history.module.css'


export function OrderHistory({ orders }) {
  return (
    <section className={`${styles.container} pr-2`}>
      {orders.map((order, index) => {
        return (
          <Link to={order._id} state={{background: true}} key={index}><OrderHistoryElement {...order} /></Link>
        )
      })}
    </section>
  )
}

OrderHistory.propTypes = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  createdAt: PropTypes.string.isRequired,
  status: PropTypes.string,
}).isRequired).isRequired;

