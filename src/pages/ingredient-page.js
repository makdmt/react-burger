import React from 'react';
import { useParams } from 'react-router-dom';

import AppHeader from '../components/app-header/app-header';

import styles from './ingredient-page.module.css'
import { IngredientDetails } from '../components/ingredient-details/ingredient-details';


export function IngredientPage() {

  const { id } = useParams();

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.contentBlock}>
        <IngredientDetails id={id} />
        </div>
      </main>
    </>
  )
}
