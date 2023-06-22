import React, { FC } from 'react'
import { IIngredient } from '../../services/types/data';
// import { ingredientPropType } from '../../utils/data'

import { useSelector, useDispatch } from '../../services/types/index';
import { addIngredientToConstructor, removeIngredientFromConstructor } from '../../services/actions/burgerConstructor';

import { useDrag, useDrop } from 'react-dnd/dist/hooks';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorElementStyles from './burger-constructor-element.module.css'


const BurgerConstructorElement: FC<{ ingredientUuid: string, ingredient: IIngredient }> = ({ ingredientUuid, ingredient }) => {
  // const BurgerConstructorElement = ({ ingredientUuid, ingredient }) => {

  const { items: allIngredients } = useSelector(store => store.burgerConstructor);
  const currentBurgerIngredients = useSelector(store => store.burgerConstructor.currentBurgerItems);
  const dispatch = useDispatch();

  const ingredientId = ingredient._id;
  const ingredientIndexInArray = currentBurgerIngredients.findIndex(elm => elm.uuid === ingredientUuid);


  const [{ dragOpacity }, dragRef] = useDrag(() => ({
    type: "ingredientInConstructor",
    item: { ingredientId, ingredientUuid, ingredientIndexInArray },
    collect: monitor => ({
      dragOpacity: monitor.isDragging() ? 0 : 1
    })
  }), [ingredientIndexInArray, currentBurgerIngredients])

  const [{ dropOpacity }, dropTarget] = useDrop(() => ({
    accept: "ingredientInConstructor",
    drop(movingIngredient: { ingredientId: string, ingredientUuid: string, ingredientIndexInArray: number }) {
      dispatch(removeIngredientFromConstructor(movingIngredient.ingredientUuid));
      dispatch(addIngredientToConstructor(movingIngredient.ingredientId, allIngredients, ingredientIndexInArray));
    },
    collect: monitor => ({
      dropOpacity: monitor.isOver() ? 0.5 : 1,
    })
  }), [currentBurgerIngredients, allIngredients]);

  const opacity = dragOpacity === 0 ? 0 : dropOpacity;


  return (
    <li className={`${burgerConstructorElementStyles.burgerConstructorListItem} pr-2 mb-4`} style={{ opacity }} ref={(elm) => { dragRef(elm); dropTarget(elm) }}>
      <DragIcon type="primary" />
      <ConstructorElement
        type={undefined}
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => dispatch(removeIngredientFromConstructor(ingredientUuid))}
      />
    </li>
  );
}

// BurgerConstructorElement.propTypes = {
//   ingredientUuid: PropTypes.string.isRequired,
//   ingredient: PropTypes.shape(ingredientPropType).isRequired
// }

export default BurgerConstructorElement
