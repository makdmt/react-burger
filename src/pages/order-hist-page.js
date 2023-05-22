import React from 'react';
import { useParams } from 'react-router-dom';

import AppHeader from '../components/app-header/app-header';

import styles from './order-hist-page.module.css'
import { HistOrderDetails } from '../components/hist-order-details/hist-order-details';


export function OrderHistPage() {

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
