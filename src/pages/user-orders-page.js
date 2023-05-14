import React from 'react';

import AppHeader from '../components/app-header/app-header';
import { UserProfileNavigation } from '../components/user-profile-navigation/user-profile-navigation';
import { UserDetailsForm } from '../components/user-details-form/user-details-form';

import styles from './user-orders-page.module.css'


export function UserOrders() {

  return (
    <>
      <AppHeader />

      <main className={styles.main}>
          <>
              <UserProfileNavigation />
              <p className='text text_type_main-medium'>Тут будет история заказов...</p>
          </>

      </main>
    </>
  )
}
