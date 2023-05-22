import React from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { WS_USER_ORDERS_CONNECTION_START, WS_USER_ORDERS_CONNECTION_CLOSED } from '../services/actions/wsUserOrders';
import { getCookie } from '../utils/cookie-set-get';

import AppHeader from '../components/app-header/app-header';

import styles from './user-order-hist-page.module.css'
import { HistOrderDetails } from '../components/hist-order-details/hist-order-details';



export function UserOrderHistPage() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!!getCookie('refreshToken')) {
      dispatch({ type: WS_USER_ORDERS_CONNECTION_START });
      return () => dispatch({ type: WS_USER_ORDERS_CONNECTION_CLOSED });
    }
  }, [dispatch])


  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.contentBlock}>
        <HistOrderDetails />
        </div>
      </main>
    </>
  )
}
