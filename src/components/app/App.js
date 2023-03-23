import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDelails from '../order-details/order-details';
import withModal from '../hocs/withModal';

import { AllIngredientsContext } from '../../services/userContext';

import { getIngredients, postOrder } from '../../utils/burger-api'
// import { orderData } from '../../utils/data';

import appStyles from './app.module.css';

function App(): JSX.Element {

  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    ingredients: []
  })

  const [orderData, setOrderData] =  React.useState({});

  const [modalOpened, setModalOpened] = React.useState(false);

  const openModal = (ingredientsId) => {
    postOrder(ingredientsId)
    .then(data => setOrderData(data))
    .catch(err => {
      console.log(err);
      setOrderData({order:{number: '0000'}, success: false})
    })
    .finally(() => setModalOpened(true));

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
    const loadIngredients = async () => {
      try {
        setState({ ...state, isLoading: true });
        const data = await getIngredients()
        setState({ ...state, isLoading: false, ingredients: data.data});
      } catch (err) {
        setState({ ...state, isLoading: false, hasError: true });
        console.error(err);
      }
    }

    loadIngredients();

  },[])


  return (
    <div className={appStyles.page} onKeyDown={closeModalByEsc}>
      {modalOpened && <WithModalOrderDetails closeByClickFunc={closeModalByClick} closeByEsc={closeModalByEsc} closeByX={closeModalByXbtn} {...orderData}/>}
      <AppHeader />

      <main className={appStyles.main}>
        <AllIngredientsContext.Provider value={state.ingredients}>
        {state.isLoading && 'Загрузка...'}
        {state.hasError && 'Произошла ошибка, попробуйте перезагрузить страницу'}

        {!state.isLoading && !state.hasError && state.ingredients.length &&
          <>
            <BurgerIngredients />
            <BurgerConstructor completeOrderFunc={openModal}/>
          </>

        }
        </AllIngredientsContext.Provider>
      </main>

    </div>
  );
}

export default App;
