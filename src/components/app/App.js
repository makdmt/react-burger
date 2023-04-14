import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, DELETE_ORDER_DETAILS_FROM_MODAL } from '../../services/actions/burgerConstructor';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDelails from '../order-details/order-details';
import withModal from '../hocs/withModal';

import appStyles from './app.module.css';

function App(): JSX.Element {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  const { itemsRequest: isLoading, itemsFailed: hasError } = useSelector(store => ({
    itemsRequest: store.burgerConstructor.itemsRequest,
    itemsFailed: store.burgerConstructor.itemsFailed
  }));

  const orderDetails = useSelector(store => store.burgerConstructor.orderDetails);

  const closeModalByClick = (event) => {
    event.currentTarget === event.target && dispatch({ type: DELETE_ORDER_DETAILS_FROM_MODAL });
  }

  const closeModalByXbtn = (event) => {
    event.stopPropagation();
    dispatch({ type: DELETE_ORDER_DETAILS_FROM_MODAL });
  }

  const closeModalByEsc = (event) => {
    event.key === 'Escape' && dispatch({ type: DELETE_ORDER_DETAILS_FROM_MODAL });
  }

  const WithModalOrderDetails = withModal(OrderDelails);

  return (
    <div className={appStyles.page} >
      {!(orderDetails === null) && <WithModalOrderDetails closeByClickFunc={closeModalByClick} closeByEsc={closeModalByEsc} closeByX={closeModalByXbtn} />}
      <AppHeader />

      <main className={appStyles.main}>
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка, попробуйте перезагрузить страницу'}
        {!isLoading && !hasError &&
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </>
        }
      </main>
    </div>
  );
}

export default App;
