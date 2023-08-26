import React, { FC } from 'react'
import { Link } from "react-router-dom";

import { OrderHistoryElement } from '../order-history-element/order-history-element'
import styles from './order-history.module.css'
import { IOrderDetails } from '../../services/types/data';


export const OrderHistory: FC<{ orders: ReadonlyArray<IOrderDetails> }> = ({ orders }) => {
  return (
    <section className={`${styles.container} pr-2`}>
      {orders.map((order, index) => {
        return (
          <Link to={order._id} state={{ background: true }} key={index}><OrderHistoryElement {...order} /></Link>
        )
      })}
    </section>
  )
}


