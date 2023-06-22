import React, { useState, FC } from 'react'

import { useSelector, useDispatch } from '../../services/types/index';

import { useSearchParams, useLocation, useNavigate, URLSearchParamsInit } from 'react-router-dom';

import { completeOrder, addIngredientToConstructor, RESET_BURGER } from '../../services/actions/burgerConstructor';

import { useDrop } from 'react-dnd/dist/hooks';

import { ConstructorElement, Button, CurrencyIcon, LogoutIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element'

import burgerConstructorStyles from './burger-constructor.module.css'


const BurgerConstructor: FC = () => {

  const { items: allIngredients, orderPostRequest } = useSelector(store => store.burgerConstructor);
  const currentBurgerIngredients = useSelector(store => store.burgerConstructor.currentBurgerItems);

  const { authUser } = useSelector(state => state.userAuth);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentBurgerUrlParams, setCurrentBurgerUrlParams] = useSearchParams({});

  React.useEffect(() => {
    const params = currentBurgerIngredients.reduce((acc: { [Property: string]: number }, item) => {
      if (acc.hasOwnProperty(item.ingredientDetails._id)) {
        acc[item.ingredientDetails._id] += 1;
      } else {
        acc[item.ingredientDetails._id] = 1;
      }
      return acc;
    }, {})
    const stringedParam: { [Property: string]: string } = {};
    for (const key in params) stringedParam[key] = String(params[key])

    setCurrentBurgerUrlParams(stringedParam);
  }, [currentBurgerIngredients])

  const location = useLocation();
  const [toggledOrderBtn, setToggledOrderBtn] = useState(false);


  const [{ backgroundColor }, dropTarget] = useDrop({
    accept: "ingredient",
    drop({ ingredientId }: { ingredientId: string }) {
      dispatch(addIngredientToConstructor(ingredientId, allIngredients));
    },
    collect: monitor => ({
      backgroundColor: monitor.isOver() ? "#1C1C21" : "unset",
    })
  });

  // React.useEffect(() => {

  //   if (allIngredients.length !== 0) {
  //     dispatch({type: RESET_BURGER})
  //     const initialBurgerIngredients = [];
  //     while (!initialBurgerIngredients.some(elm => (elm.type === 'bun'))  || initialBurgerIngredients.length < 5) {
  //       let ingredientIndex = Math.floor(Math.random() * (allIngredients.length));
  //       if (initialBurgerIngredients.indexOf(allIngredients[ingredientIndex]) === -1) initialBurgerIngredients.push(allIngredients[ingredientIndex]);
  //     }
  //     initialBurgerIngredients.forEach(elm => {
  //       dispatch(addIngredientToConstructor(elm._id, allIngredients))})
  //   }
  // }, [dispatch, allIngredients])

  let [currentBunIngredient] = currentBurgerIngredients.filter(ingredient => ingredient.ingredientDetails.type === 'bun');

  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useMemo(() => {

    setTotalPrice(currentBurgerIngredients.reduce((a, b) => {
      return (b.ingredientDetails.type === 'bun' ? 2 * b.ingredientDetails.price + a : b.ingredientDetails.price + a)
    }, 0))
  }, [currentBurgerIngredients]);


  const completeOrderBtnHandler = React.useCallback(() => {
    if (currentBurgerIngredients.length === 0) {
      setToggledOrderBtn(!toggledOrderBtn);
      return;
    }
    if (authUser) {
      let burgerIngredientsId = currentBurgerIngredients.map(ingredient => ingredient.ingredientDetails._id);
      dispatch(completeOrder(burgerIngredientsId));
    } else {
      navigate('/auth', { replace: true, state: { navigateAfter: `${location.pathname}${location.search}`, loginMessage: `Для отправки заказа, необходимо авторизоваться!` } });
    }

  }, [currentBurgerIngredients, authUser, toggledOrderBtn, location])

  return (
    <section className={`${burgerConstructorStyles.burgerConstructor} mt-25`} style={{ backgroundColor }}>
      <header className={`${burgerConstructorStyles.burgerConstructorListItem} mb-4 pr-4`} >
        {!!currentBunIngredient && <ConstructorElement
          type='top'
          isLocked={true}
          text={currentBunIngredient.ingredientDetails.name + ' (верх)'}
          price={currentBunIngredient.ingredientDetails.price}
          thumbnail={currentBunIngredient.ingredientDetails.image}
        />}
      </header>
      <ul style={{ height: `${4 * 96}px` }} className={`${burgerConstructorStyles.burgerConstructorList}`} ref={dropTarget}>
        {currentBurgerIngredients.length === 0 && (
          <p className='text text_type_main-default' style={!toggledOrderBtn ? {} : { color: '#00CCCC' }}><LogoutIcon type={toggledOrderBtn ? "success" : "primary"} /> Выберите индгрединеты слева и перетащите сюда!</p>
        )}
        {currentBurgerIngredients.filter(ingredient => ingredient.ingredientDetails.type != 'bun').map((ingredient) => (
          <BurgerConstructorElement key={ingredient.uuid} ingredientUuid={ingredient.uuid} ingredient={ingredient.ingredientDetails} />
        ))}
      </ul>

      <footer className={`${burgerConstructorStyles.burgerConstructorListItem} pr-4`} >
        {!!currentBunIngredient && <ConstructorElement
          type='bottom'
          isLocked={true}
          text={currentBunIngredient.ingredientDetails.name + ' (низ)'}
          price={currentBunIngredient.ingredientDetails.price}
          thumbnail={currentBunIngredient.ingredientDetails.image}
        />}
      </footer>
      <div className={`${burgerConstructorStyles.burgerConstructorConfirmBlock} mt-10`}>
        <p className='text text_type_digits-medium mr-10'>{totalPrice} <CurrencyIcon type="primary" /></p>
        <Button htmlType="button" disabled={orderPostRequest} type="primary" size="medium" onClick={completeOrderBtnHandler}>{orderPostRequest ? 'Отправляем заказ...' : 'Оформить заказ'}</Button>
      </div>

    </section>

  );
}

export default BurgerConstructor
