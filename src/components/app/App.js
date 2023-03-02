import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { ingredients } from '../../utils/data';

import appStyles from './app.module.css';

function App(): JSX.Element {
  return (
    <div className={appStyles.page}>
      <AppHeader/>
      <main className={appStyles.main}>
        <BurgerIngredients products={ingredients} />
        <BurgerConstructor mainIngredients={ingredients} />
      </main>
    </div>
  );
}

export default App;
