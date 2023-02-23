import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import {ingredients, arrangeByCategory } from '../../utils/data';

import appStyles from './app.module.css';

const ingredientsByCategories = arrangeByCategory(ingredients,'type');

function App(): JSX.Element {
  return (
    <div className={appStyles.page}>
      <AppHeader/>
      <main className={appStyles.main}>
        <BurgerIngredients arrayOfArraysArrangedProducts={ingredientsByCategories} />
        <BurgerConstructor mainIngredients={ingredients} />
      </main>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
