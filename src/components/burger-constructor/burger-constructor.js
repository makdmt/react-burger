import React from 'react'
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyles from './burger-constructor.module.css'

import { ingredientPropType } from '../../utils/data'


function BurgerConstructor({ mainIngredients, completeOrderFunc}) {

  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(()=>{

    setTotalPrice(mainIngredients.reduce((a , b) => (a + b.price), 0))
  })

  return (
    <section className={`${burgerConstructorStyles.burgerConstructor} mt-25`}>
      <header className={`${burgerConstructorStyles.burgerConstructorListItem} mb-4 pr-4`} >
        <ConstructorElement
          type='top'
          isLocked={true}
          text='Краторная булка N-200i (верх)'
          price={200}
          thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
        />
      </header>
      <ul style={{height: `${4*96}px`}} className={`${burgerConstructorStyles.burgerConstructorList}`} >
        {mainIngredients.map((ingredient, index) => (
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
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text='Краторная булка N-200i (верх)'
          price={200}
          thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
        />
      </footer>
      <div className={`${burgerConstructorStyles.burgerConstructorConfirmBlock} mt-10`}>
        <p className='text text_type_digits-medium mr-10'>{totalPrice} <CurrencyIcon type="primary" /></p>
        <Button htmlType="button" type="primary" size="medium" onClick={completeOrderFunc}>Оформить заказ</Button>
      </div>

    </section>

  );
}

BurgerConstructor.propTypes = {
  mainIngredients: PropTypes.arrayOf(PropTypes.shape(ingredientPropType)).isRequired,
  completeOrderFunc: PropTypes.func
}

export default BurgerConstructor
