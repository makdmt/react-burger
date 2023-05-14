import React from 'react';

import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../components/app-header/app-header';

import styles from './not-found404-page.module.css'


export function NotFound404Page() {
  return (
    <>
    <AppHeader />
      <main className={styles.main}>
      <div className={styles.contentBlock}>
        <img src="https://miro.medium.com/v2/resize:fit:800/1*hFwwQAW45673VGKrMPE2qQ.png" alt="page not found" className={styles.img} />
        <Link to="/"><Button htmlType="button" type="primary" size="large" extraClass='mt-15'>Перейти на главную...</Button></Link>
      </div>
      </main>
    </>
  )
}
