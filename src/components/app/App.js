import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDelails from '../order-details/order-details';
import withModal from '../hocs/withModal';

import { orderData, serverUrl } from '../../utils/data';

import appStyles from './app.module.css';

function App(): JSX.Element {

  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    ingredients: []
  })

  const [modalOpened, setModalOpened] = React.useState(false);

  const openModal = () => {
    setModalOpened(true);
  }

  const closeModalByClick = (event) => {
    event.currentTarget === event.target && setModalOpened(false);
  }

  const closeModalByXbtn = (event) => {
    event.stopPropagation();
    setModalOpened(false);
  }

  const closeModalByEsc = (event) => {
    event.key === 'Escape' && setModalOpened(false);
  }

  const WithModalOrderDetails = withModal(OrderDelails);


  React.useEffect(() => {
    const getIngredients = async (url) => {
      try {
        setState({ ...state, isLoading: true });
        const res = await fetch(url);
        const data = await res.json();
        setState({ ...state, isLoading: false, ingredients: data.data});
      } catch (err) {
        setState({ ...state, isLoading: false, hasError: true })
      }
    }

    getIngredients(serverUrl);

  },[])


  return (
    <div className={appStyles.page} onKeyDown={closeModalByEsc}>
      {modalOpened && <WithModalOrderDetails closeByClickFunc={closeModalByClick} closeByEsc={closeModalByEsc} closeByX={closeModalByXbtn} {...orderData}/>}
      <AppHeader />

      <main className={appStyles.main}>
        {state.isLoading && 'Загрузка...'}
        {state.hasError && 'Произошла ошибка, попробуйте перезагрузить страницу'}

        {!state.isLoading && !state.hasError && state.ingredients.length &&
          <>
            <BurgerIngredients products={state.ingredients} />
            <BurgerConstructor mainIngredients={state.ingredients} completeOrderFunc={openModal}/>
          </>

        }
      </main>

    </div>
  );
}

export default App;
