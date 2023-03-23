import React from 'react'
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { AllIngredientsContext } from '../../services/userContext';
import burgerConstructorStyles from './burger-constructor.module.css'

import { ingredientPropType } from '../../utils/data'

const burgerInitialState = {
  burgerIngredients: []
};

function burgerReducer(state, action) {
  switch (action.type) {
    case 'set bun':
     let currentIngredients = state.burgerIngredients.filter(ingredient => ingredient.type != 'bun');
     currentIngredients.push(action.payload);
    return {burgerIngredients: currentIngredients};
    case 'set main':
      state.burgerIngredients.push(action.payload);
      return {burgerIngredients: state.burgerIngredients};
    case 'reset':
      return burgerInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
}
}


function BurgerConstructor({ completeOrderFunc}) {

  const allIngredients = React.useContext(AllIngredientsContext);
  const [burgerState, burgerDispatcher] = React.useReducer(burgerReducer, burgerInitialState, undefined);
  let [bunIngredient] = burgerState.burgerIngredients.filter(ingredient => ingredient.type === 'bun');

  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
     burgerDispatcher({ type: 'set bun', payload: allIngredients.filter(ingredient => ingredient.type == 'bun')[Math.floor(Math.random()*2)] });
     for (let i = 1; i <= 3; i++) {
      let ingredientIndex = Math.floor(Math.random()*(allIngredients.length -2));
       burgerDispatcher({ type: 'set main', payload: allIngredients.filter(ingredient => ingredient.type != 'bun')[ingredientIndex]});
     }

  }, [])

  React.useEffect(()=>{

    setTotalPrice(burgerState.burgerIngredients.reduce((a , b) => {
      return (b.type === 'bun' ? 2*b.price + a : b.price + a)}, 0))
  },[burgerState.burgerIngredients])

  const completeOrder = () => {
    let burgerIngredientsId = burgerState.burgerIngredients.map(ingredient => ingredient._id);
    completeOrderFunc(burgerIngredientsId);
  }

  return (
    <section className={`${burgerConstructorStyles.burgerConstructor} mt-25`}>
      <header className={`${burgerConstructorStyles.burgerConstructorListItem} mb-4 pr-4`} >
        {!!bunIngredient && <ConstructorElement
          type='top'
          isLocked={true}
          text={bunIngredient.name + ' (верх)'}
          price={bunIngredient.price}
          thumbnail={bunIngredient.image}
        />}
      </header>
      <ul style={{height: `${4*96}px`}} className={`${burgerConstructorStyles.burgerConstructorList}`} >
        {burgerState.burgerIngredients.filter(ingredient => ingredient.type !='bun').map((ingredient, index) => (
          <li className={`${burgerConstructorStyles.burgerConstructorListItem} pr-2 mb-4`} key={index}>
            <DragIcon type="primary" />
            <ConstructorElement
              type={ingredient.type}
              isLocked={ingredient.isLocked}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </li>
        ))}
      </ul>

      <footer className={`${burgerConstructorStyles.burgerConstructorListItem} pr-4`} >
      {!!bunIngredient && <ConstructorElement
          type='bottom'
          isLocked={true}
          text={bunIngredient.name + ' (низ)'}
          price={bunIngredient.price}
          thumbnail={bunIngredient.image}
        />}
      </footer>
      <div className={`${burgerConstructorStyles.burgerConstructorConfirmBlock} mt-10`}>
        <p className='text text_type_digits-medium mr-10'>{totalPrice} <CurrencyIcon type="primary" /></p>
        <Button htmlType="button" type="primary" size="medium" onClick={completeOrder}>Оформить заказ</Button>
      </div>

    </section>

  );
}

BurgerConstructor.propTypes = {
 // burgerIngredients: PropTypes.arrayOf(PropTypes.shape(ingredientPropType)).isRequired,
  completeOrderFunc: PropTypes.func
}

export default BurgerConstructor
