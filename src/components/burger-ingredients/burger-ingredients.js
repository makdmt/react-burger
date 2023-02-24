import React from 'react'
import PropTypes from 'prop-types';

import IngredientCard from '../ingredient-card/ingredient-card';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientStyles from './burger-ingredients.module.css'

import { ingredientPropType } from '../../utils/data';

function BurgerIngredients({ products }) {


  const sectionTitlesObj = {
    bun: 'Булки',
    main: 'Начинки',
    sause: 'Соусы'
  }

  const sectionTitlesArr = Object.entries(sectionTitlesObj);

  const [current, setCurrent] = React.useState(0)


  return (
    <section className={burgerIngredientStyles.container}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${burgerIngredientStyles.tabContainer} mb-8`} >
        {sectionTitlesArr.map((category, index) => {
          return (
            <Tab key={category[0]} value={index} active={current === index} onClick={setCurrent}>{category[1]}</Tab>
          )
        })}
      </div>
      <div className={burgerIngredientStyles.ingredientsSectionsConatiner}>
        {sectionTitlesArr.map((category, index) => {
          return (
            <section className={burgerIngredientStyles.categorySection} key={index}>
              <h2 className={`${burgerIngredientStyles.categoryHeading} text text_type_main-medium mt-2 mb-6`}>{category[1]}</h2>
              <IngredientCard oneCategoryIngredients={products.filter((product) => { return product.type == category[0] })} />
            </section>)
        })}
      </div>
    </section>
  )
}


BurgerIngredients.propTypes = {
  products: PropTypes.arrayOf(ingredientPropType).isRequired
}

export default BurgerIngredients
