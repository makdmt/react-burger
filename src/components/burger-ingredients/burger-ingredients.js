import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { getItems } from '../../services/actions/burgerConstructor';

import IngredientCard from '../ingredient-card/ingredient-card';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientStyles from './burger-ingredients.module.css'


function BurgerIngredients() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  const products = useSelector(store => store.burgerConstructor.items);

  const sectionTitlesObj = {
    bun: 'Булки',
    main: 'Начинки',
    sauce: 'Соусы'
  }
  const sectionTitlesArr = Object.entries(sectionTitlesObj);

  const [currentTab, setCurrentTab] = React.useState(0)

  const scrollHandler = (e) => {
    let visibleBlockTopCoordinate = e.target.getBoundingClientRect().y;
    let visibleBlockHeight = e.target.getBoundingClientRect().height;

    const innerSections = Array.from(e.target.children);

    const visiblePartsOfInnerSections = innerSections.map((section) => {
      let innerSectionTopCoordinate = section.getBoundingClientRect().y;
      let innerSectionHeight = section.getBoundingClientRect().height;

      if ((innerSectionTopCoordinate - visibleBlockTopCoordinate) <= 0) {
        return (innerSectionTopCoordinate + innerSectionHeight - visibleBlockTopCoordinate);
      } else {
        return (visibleBlockTopCoordinate + visibleBlockHeight - innerSectionTopCoordinate);
      }
    });

    let maxVisiblePart = Math.max(...visiblePartsOfInnerSections);
    let sectionIndexWithMaxVisiblePart = visiblePartsOfInnerSections.findIndex(elm => elm === maxVisiblePart);

    sectionIndexWithMaxVisiblePart != currentTab && setCurrentTab(sectionIndexWithMaxVisiblePart);

    (e.target.scrollTop === 0) && setCurrentTab(0);
    (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) < 10 && setCurrentTab(sectionTitlesArr.length - 1);

  }

  return (
    <section className={burgerIngredientStyles.container}>

      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${burgerIngredientStyles.tabContainer} mb-8`} >
        {sectionTitlesArr.map((category, index) => {
          return (
            <Tab key={category[0]} value={index} active={currentTab === index}>{category[1]}</Tab>
          )
        })}
      </div>
      <div className={burgerIngredientStyles.ingredientsSectionsConatiner} onScroll={scrollHandler}>
        {sectionTitlesArr.reverse().map((category, index) => {
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


export default BurgerIngredients
