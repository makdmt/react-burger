import React from 'react'
import PropTypes from 'prop-types';

import burgerIngredientStyles from './burger-ingredients.module.css'
import IngredientCard from '../ingredient-card/ingredient-card';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientPropType } from '../../utils/data';

// class BurgerConstructor extends React.Component {
function BurgerIngredients({ arrayOfArraysArrangedProducts }) {
  const sectionTitles = arrayOfArraysArrangedProducts.map((category) => {
    let sectionTitle;

    switch (category[0].type) {
      case 'bun':
        sectionTitle = 'Булки';
        return sectionTitle;
      case 'main':
        sectionTitle = 'Начинки';
        return sectionTitle;
      case 'sauce':
        sectionTitle = 'Соусы';
        return sectionTitle;
    }
  })

  const [current, setCurrent] = React.useState(0)


  return (
    <section className={burgerIngredientStyles.container}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${burgerIngredientStyles.tabContainer} mb-8`} >
        {sectionTitles.map((category, index) => {
          return (
            <Tab key={category} value={index} active= {current === index} onClick={setCurrent}>{category}</Tab>
          )
        })}
      </div>
      <div className={burgerIngredientStyles.ingredientsSectionsConatiner}>
        {arrayOfArraysArrangedProducts.map((category, index) => {
        return (
          <section className={burgerIngredientStyles.categorySection } key={index}>
          <h2 className={`${burgerIngredientStyles.categoryHeading} text text_type_main-medium mt-2 mb-6`}>{sectionTitles[index]}</h2>
          <IngredientCard oneCategoryIngredients={category} />
          </section>
        )

      })}
      </div>
    </section>
  )
}


BurgerIngredients.propTypes = {
  arrayOfArraysArrangedProducts: PropTypes.arrayOf(PropTypes.arrayOf(ingredientPropType)).isRequired
}

export default BurgerIngredients
