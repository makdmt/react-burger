import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { OrdersStatusList } from '../orders-status-list/orders-status-list';
import styles from './orders-statuses-table.module.css'

export function OrdersStatusesTable() {

  const { wsFeedConnected, feedOrders } = useSelector(store => store.wsFeed);

  const ordersToReadyStatus = React.useMemo(() => {
    if (feedOrders && feedOrders.orders) {
      return feedOrders.orders.map(order => {
        if (order.status === 'done') return order.number;
      })
    }
  }, [feedOrders])

  const ordersToInworkStatus = React.useMemo(() => {
    if (feedOrders && feedOrders.orders) {
      return feedOrders.orders.map(order => {
        if (order.status === 'created') return order.number;
      })
    }
  }, [feedOrders])


  return (
    <section className={styles.section}>
      <OrdersStatusList status={'Готовы:'} ordersId={ordersToReadyStatus} active={true} />
      <OrdersStatusList status={'В работе:'} ordersId={ordersToInworkStatus} active={false} />

    </section>
  )
}
