import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { ingredients } from '../../utils/data';

import appStyles from './app.module.css';

function App(): JSX.Element {

  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    ingredients: []
  })

  React.useEffect(() => {
    const getIngredients = async (url) => {
      try {
        setState({ ...state, isLoading: true });
        const res = await fetch(url);
        const data = await res.json();
        setState({ ...state, isLoading: false, ingredients: data.data});
        console.log(data);
        console.log(state);
      } catch (err) {
        setState({ ...state, isLoading: false, hasError: true })
      }
    }

    // React.useEffect(() => {
    //   const getIngredients = async(url) => {
    //     setState({...state, isLoading: true});
    //     fetch(url)
    //     .then(res => res.json())
    //     .then(data => setState({...state,isLoading: false, ingredients: data.data}))
    //     .catch(err => setState({...state, isLoading: false, hasError: true}))
    //   }

    getIngredients('https://norma.nomoreparties.space/api/ingredients');

  },[])
  // console.log(state);


  return (
    <div className={appStyles.page}>
      <AppHeader />

      <main className={appStyles.main}>
        {state.isLoading && 'Загрузка...'}
        {state.hasError && 'Произошла ошибка, попробуйте перезагрузить страницу'}

        {!state.isLoading && !state.hasError && state.ingredients.length &&
          <>
            <BurgerIngredients products={state.ingredients} />
            <BurgerConstructor mainIngredients={state.ingredients} />
          </>

        }
      </main>

    </div>
  );
}

export default App;
