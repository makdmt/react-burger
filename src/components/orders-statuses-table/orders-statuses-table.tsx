import React, { FC } from 'react';
import { useSelector, useDispatch } from '../../services/types/index';

import { OrdersStatusList } from '../orders-status-list/orders-status-list';
import styles from './orders-statuses-table.module.css'
import { IOrderDetails } from '../../services/types/data';

export const OrdersStatusesTable: FC = () => {

  const { wsFeedConnected, feedOrders } = useSelector(store => store.wsFeed);

  const ordersToReadyStatus = React.useMemo<Array<string | number | null>>(() => {
    if (feedOrders && feedOrders.orders) {
      return feedOrders.orders.map((order: IOrderDetails) => {
        if (order.status === 'done') return order.number;
        return null;
      })
    }
    return [null];
  }, [feedOrders])

  const ordersToInworkStatus = React.useMemo<Array<string | number | null>>(() => {
    if (feedOrders && feedOrders.orders) {
      return feedOrders.orders.map((order: IOrderDetails) => {
        if (order.status === 'created') return order.number;
        return null;
      })
    }
    return [null];
  }, [feedOrders])


  return (
    <section className={styles.section}>
      <OrdersStatusList status={'Готовы:'} ordersId={ordersToReadyStatus} active={true} />
      <OrdersStatusList status={'В работе:'} ordersId={ordersToInworkStatus} active={false} />
    </section>
  )
}
