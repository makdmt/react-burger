import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_CLOSED } from '../services/actions/wsFeed'

import { Outlet } from 'react-router-dom';

import AppHeader from '../components/app-header/app-header';
import { OrderHistory } from '../components/order-history/order-history';
import { OrdersStatusesTable } from '../components/orders-statuses-table/orders-statuses-table';
import { ProfitInDigits } from '../components/profit-in-digits/profit-in-digits';


import styles from './feed-page.module.css';

export function FeedPage(): JSX.Element {

  const dispatch = useDispatch();

  const { wsFeedConnected, feedOrders } = useSelector(store => store.wsFeed);

  const orderDetails = useSelector(store => store.burgerConstructor.orderDetails);

  // React.useEffect(() => {
  //   dispatch({ type: WS_FEED_CONNECTION_START });
  //   return () => dispatch({ type: WS_FEED_CONNECTION_CLOSED });
  // }, [])


  const ordersToFeed = React.useMemo(() => {
    if (feedOrders && feedOrders.orders) {
      return feedOrders.orders.map(order => {
        const orderWOutStatus = { ...order }
        delete orderWOutStatus.status
        return orderWOutStatus;
      })
    }
  }, [feedOrders])


  return (
    <div className={styles.page} >
      <Outlet />
      <AppHeader />

      <main className={styles.main}>
        <h1 className={`text text_type_main-large mt-10 mb-5 ${styles.pageHeading}`}>Лента заказов</h1>
        {!wsFeedConnected && 'нет данных, подождите... или попробуйте обновить страницу'}
        {wsFeedConnected && !!feedOrders && !!feedOrders.orders && <OrderHistory orders={ordersToFeed} />}
        {wsFeedConnected && !!feedOrders && !!feedOrders.orders &&
          <div>
            <OrdersStatusesTable />
            <ProfitInDigits heading={'Выполнено за все время:'} count={feedOrders.total} />
            <ProfitInDigits heading={'Выполнено за сегодня:'} count={feedOrders.totalToday} />
          </div>
        }
      </main>
    </div>
  );
}
