import React from 'react';
import { useSelector, useDispatch } from '../services/types/index'
import { getItems, DELETE_ORDER_DETAILS_FROM_MODAL } from '../services/actions/burgerConstructor';

import { Outlet } from 'react-router-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../components/app-header/app-header';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import OrderDelails from '../components/order-details/order-details';
import withModal from '../components/hocs/withModal';

import appStyles from './main-page.module.css';

export function MainPage(): JSX.Element {

  const dispatch = useDispatch();

  const { itemsRequest: isLoading, itemsFailed: hasError } = useSelector(store => ({
    itemsRequest: store.burgerConstructor.itemsRequest,
    itemsFailed: store.burgerConstructor.itemsFailed
  }));

  const orderDetails = useSelector(store => store.burgerConstructor.orderDetails);

  const closeModalByClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget === event.target && dispatch({ type: DELETE_ORDER_DETAILS_FROM_MODAL });
  }

  const closeModalByXbtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch({ type: DELETE_ORDER_DETAILS_FROM_MODAL });
  }

  const closeModalByEsc = (event: KeyboardEvent) => {
    event.key === 'Escape' && dispatch({ type: DELETE_ORDER_DETAILS_FROM_MODAL });
  }

  const WithModalOrderDetails = withModal(OrderDelails);

  return (
    <div className={appStyles.page} >
      {!(orderDetails === null) && <WithModalOrderDetails closeByClickFunc={closeModalByClick} closeByEsc={closeModalByEsc} closeByX={closeModalByXbtn} />}
      <Outlet />
      <AppHeader />

      <main className={appStyles.main}>
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка, попробуйте перезагрузить страницу'}
        {!isLoading && !hasError &&
          <DndProvider key='uniq123' backend={HTML5Backend} >
            <BurgerIngredients key='uniq23'/>
            <BurgerConstructor key='uniq3'/>
          </DndProvider>
        }
      </main>
    </div>
  );
}
