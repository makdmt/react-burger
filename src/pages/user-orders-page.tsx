import React, { FC } from 'react';

import { useDispatch, useSelector } from '../services/types/index'
import { WS_USER_ORDERS_CONNECTION_START, WS_USER_ORDERS_CONNECTION_CLOSED } from '../services/actions/wsUserOrders';

import { Outlet } from 'react-router-dom';

import AppHeader from '../components/app-header/app-header';
import { UserProfileNavigation } from '../components/user-profile-navigation/user-profile-navigation';
import { OrderHistory } from '../components/order-history/order-history';

import styles from './user-orders-page.module.css'


export const UserOrdersPage: FC = () => {

  const dispatch = useDispatch();
  const { wsUserOrdersConnected, userOrders } = useSelector(store => store.wsUserOrders);

  const ordersToRender = React.useMemo(() => {
    const res = userOrders ? [...userOrders.orders] : null;
    if (!!res) return res.reverse();
    return [];
  }, [userOrders])

  React.useEffect(() => {
    dispatch({ type: WS_USER_ORDERS_CONNECTION_START });
    return () => { dispatch({ type: WS_USER_ORDERS_CONNECTION_CLOSED }) };
  }, [])


  return (
    <>
      <Outlet />
      <AppHeader />
      <main className={styles.main}>
        <UserProfileNavigation />
        {userOrders && userOrders.orders && <div className={styles.rightBlock}><OrderHistory orders={ordersToRender} /></div>}
      </main>
    </>
  )
}
