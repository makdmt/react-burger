import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { completeOrder, addIngredientToConstructor, RESET_BURGER } from '../../services/actions/burgerConstructor';

import { useDrop } from 'react-dnd/dist/hooks';

import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element'

import burgerConstructorStyles from './burger-constructor.module.css'


function BurgerConstructor() {

  const { items: allIngredients } = useSelector(store => store.burgerConstructor);
  const currentBurgerIngredients = useSelector(store => store.burgerConstructor.currentBurgerItems);

  const dispatch = useDispatch();

  const [{ backgroundColor }, dropTarget] = useDrop({
    accept: "ingredient",
    drop({ ingredientId }) {
      dispatch(addIngredientToConstructor(ingredientId, allIngredients));
    },
    collect: monitor => ({
      backgroundColor: monitor.isOver() ? "#1C1C21" : "unset",
    })
  });

  React.useEffect(() => {

    if (allIngredients.length !== 0) {
      dispatch({type: RESET_BURGER})
      const initialBurgerIngredients = [];
      while (!initialBurgerIngredients.some(elm => (elm.type === 'bun'))  || initialBurgerIngredients.length < 5) {
        let ingredientIndex = Math.floor(Math.random() * (allIngredients.length));
        if (initialBurgerIngredients.indexOf(allIngredients[ingredientIndex]) === -1) initialBurgerIngredients.push(allIngredients[ingredientIndex]);
      }
      initialBurgerIngredients.forEach(elm => {
        dispatch(addIngredientToConstructor(elm._id, allIngredients))})
    }
  }, [dispatch, allIngredients])

  let [currentBunIngredient] = currentBurgerIngredients.filter(ingredient => ingredient.ingredientDetails.type === 'bun');

  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {

    setTotalPrice(currentBurgerIngredients.reduce((a, b) => {
      return (b.ingredientDetails.type === 'bun' ? 2 * b.ingredientDetails.price + a : b.ingredientDetails.price + a)
    }, 0))
  }, [currentBurgerIngredients]);


  const completeOrderBtnHandler = () => {
    let burgerIngredientsId = currentBurgerIngredients.map(ingredient => ingredient.ingredientDetails._id);
    dispatch(completeOrder(burgerIngredientsId));
  }

  return (
    <section className={`${burgerConstructorStyles.burgerConstructor} mt-25`} style={{backgroundColor}}>
      <header className={`${burgerConstructorStyles.burgerConstructorListItem} mb-4 pr-4`} >
        {!!currentBunIngredient && <ConstructorElement
          type='top'
          isLocked={true}
          text={currentBunIngredient.ingredientDetails.name + ' (верх)'}
          price={currentBunIngredient.ingredientDetails.price}
          thumbnail={currentBunIngredient.ingredientDetails.image}
        />}
      </header>
      <ul style={{ height: `${4 * 96}px`}} className={`${burgerConstructorStyles.burgerConstructorList}`} ref={dropTarget}>
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
        <Button htmlType="button" type="primary" size="medium" onClick={completeOrderBtnHandler}>Оформить заказ</Button>
      </div>

    </section>

  );
}

export default BurgerConstructor
