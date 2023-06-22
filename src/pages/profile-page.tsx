import React from 'react';

import AppHeader from '../components/app-header/app-header';
import { UserProfileNavigation } from '../components/user-profile-navigation/user-profile-navigation';
import { UserDetailsForm } from '../components/user-details-form/user-details-form';

import styles from './profile-page.module.css'


export function ProfilePage() {

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <UserProfileNavigation />
        <UserDetailsForm />
      </main>
    </>
  )
}
