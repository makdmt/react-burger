// import PropTypes from 'prop-types';
import React, {FC} from 'react';
import { PriceElement } from '../price-element/price-element';
import styles from './hist-order-ingredient-list-element.module.css'

import { IIngredient } from '../../services/types/data';

type TIngredientInOrderHist = Omit<IIngredient, '_id' | 'type' | 'proteins' | 'fat' | 'carbohydrates' | 'calories' | 'image_mobile' | 'image_large' | '__v'> & {count: number | string}

export const HistOrderIngredientListElement: FC<TIngredientInOrderHist> = ({ image, name, price, count }) => {


  return (
    <li className={`${styles.listElement} mb-4`}>
      <div className={`${styles.gradientBackground}`}>
        <div className={styles.iconContainer}>
          <img src={image} alt={name} />
        </div>
      </div>
      <p className="text text_type_main-small ml-4 mr-4">{name}</p>
      <PriceElement price={`${count} x ${price}`} extraClass={styles.lastElement}/>
    </li>
  )
}


// HistOrderIngredientListElement.propTypes = {
//   image: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
// }
