import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, DELETE_ORDER_DETAILS_FROM_MODAL } from '../services/actions/burgerConstructor';

import { Outlet } from 'react-router-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MultiBackend, TouchTransition, MouseTransition, Preview, usePreview } from 'react-dnd-multi-backend';

import IngredientCard from '../components/ingredient-card/ingredient-card';

import AppHeader from '../components/app-header/app-header';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import OrderDelails from '../components/order-details/order-details';
import withModal from '../components/hocs/withModal';

import appStyles from './main-page.module.css';

const HTML5toTouch = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: MouseTransition
    },
    {
      id: 'touch',
      backend: TouchBackend,
      preview: true,
      transition: TouchTransition
    }
  ]
};


const IngredientPreview = () => {

  const preview = usePreview();
  const allIngredients = useSelector(store => store.burgerConstructor.items);

  if (!preview.display) {
    return null
  }

  const { itemType, item, style } = preview;

  const newStyle = {
    ...style,
    opacity: .4
  };

  const ingredient = allIngredients.find(i => i._id === item.ingredientId)

  return (
    <div style={newStyle}>
      {/* <IngredientCard {...ingredient} /> */}
      <img src={ingredient.image} alt={ingredient.name} />
    </div>
  );
}


export function MainPage(): JSX.Element {

  const dispatch = useDispatch();

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
      <Outlet />
      <AppHeader />

      <main className={appStyles.main}>
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка, попробуйте перезагрузить страницу'}
        {!isLoading && !hasError &&
          <DndProvider key='uniq123' backend={MultiBackend} options={HTML5toTouch} >
            <IngredientPreview />
            <BurgerIngredients key='uniq23' />
            <BurgerConstructor key='uniq3' />
          </DndProvider>
        }
      </main>
    </div>
  );
}
