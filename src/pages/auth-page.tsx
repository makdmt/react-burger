import React, {FC} from 'react';
// import PropTypes from 'prop-types';

import AppHeader from '../components/app-header/app-header';

import styles from './auth-page.module.css'


export const AuthPage: FC<{children: React.ReactElement}> = ({ children }) => {


  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.contentBlock}>
          {children}
        </div>
      </main>
    </>
  )
}

// AuthPage.propTypes = {
//   children: PropTypes.element.isRequired
// }
