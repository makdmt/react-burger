import React, { FC } from 'react'
import { useSelector, useDispatch } from '../../services/types/index';

import IngredientCard from '../ingredient-card/ingredient-card';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientStyles from './burger-ingredients.module.css'


const BurgerIngredients: FC = () => {


  const products = useSelector(store => store.burgerConstructor.items);

  const sectionTitlesObj = {
    bun: 'Булки',
    main: 'Начинки',
    sauce: 'Соусы'
  }
  const sectionTitlesArr = Object.entries(sectionTitlesObj);

  const [currentTab, setCurrentTab] = React.useState(0)

  const scrollHandler = (e: React.UIEvent<HTMLElement, Event>) => {


    let visibleBlockTopCoordinate = e.currentTarget.getBoundingClientRect().y;
    let visibleBlockHeight = e.currentTarget.getBoundingClientRect().height;

    const innerSections = Array.from(e.currentTarget.children);

    const distancesFromVisibleTop = innerSections.map((section) => {
      let innerSectionTopCoordinate = section.getBoundingClientRect().y;
      let innerSectionHeight = section.getBoundingClientRect().height;

      const distance = {
        distance: 0,
        isVisible: false
      }

      distance.distance = Math.abs(innerSectionTopCoordinate - visibleBlockTopCoordinate);

      if ((innerSectionTopCoordinate - visibleBlockTopCoordinate) < 0 && (innerSectionHeight - distance.distance) > (visibleBlockHeight / 4)) {
        distance.isVisible = true;
      }

      if ((innerSectionTopCoordinate - visibleBlockTopCoordinate) > 0 && (innerSectionTopCoordinate - visibleBlockTopCoordinate) < (visibleBlockHeight * 3 / 4)) {
        distance.isVisible = true;
      }

      return distance;
    });

    let sectionIndexWithMinDistanceFromVisibleTop = distancesFromVisibleTop.findIndex(elm => {
      return elm === distancesFromVisibleTop.reduce((prev, cur) => cur.distance < prev.distance ? cur : prev, { distance: Infinity })
    });

    let newActiveTabIndex = 0;

    if (distancesFromVisibleTop[sectionIndexWithMinDistanceFromVisibleTop].isVisible) {
      newActiveTabIndex = sectionIndexWithMinDistanceFromVisibleTop;
    } else {
      newActiveTabIndex = sectionIndexWithMinDistanceFromVisibleTop - 1 >= 0 ? sectionIndexWithMinDistanceFromVisibleTop - 1 : 0;
    }

    newActiveTabIndex != currentTab && setCurrentTab(newActiveTabIndex);

    // let minDistanceFromVisibleTop = Math.min(...distancesFromVisibleTop);
    // let sectionWithMinDistanceFromVisibleTop = distancesFromVisibleTop.findIndex(elm => elm === minDistanceFromVisibleTop);
  }

  const tabClickHandler = React.useCallback((tabNumber: string): void => {
    const scrolledContainer = document.querySelector(`.${burgerIngredientStyles.ingredientsSectionsConatiner}`);
    if (scrolledContainer?.children) {
      const targetsToScroll = Array.from(scrolledContainer.children);
      const targetToScroll = targetsToScroll[parseInt(tabNumber)];
      targetToScroll.scrollIntoView({ behavior: "smooth" });
    }

  }, [])


  return (
    <section className={burgerIngredientStyles.container}>

      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${burgerIngredientStyles.tabContainer} mb-8`} >
        {sectionTitlesArr.map((category, index) => {
          return (
            <Tab key={category[0]} value={String(index)} onClick={tabClickHandler} active={currentTab === index} >{category[1]}</Tab>
          )
        })}
      </div>
      <div className={burgerIngredientStyles.ingredientsSectionsConatiner} onScroll={scrollHandler}>
        {sectionTitlesArr.map((category, index) => {
          return (
            <section className={burgerIngredientStyles.categorySection} key={index}>
              <h2 className={`${burgerIngredientStyles.categoryHeading} text text_type_main-medium mt-2 mb-6`}>{category[1]}</h2>
              {products.filter((product) => { return product.type == category[0] }).map((product, index) => (<IngredientCard key={index} {...product} />))}
            </section>)
        })}
      </div>
    </section>
  )
}

export default BurgerIngredients
