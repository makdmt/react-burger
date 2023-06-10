import React, { FC } from "react";

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price-element.module.css'


export const PriceElement: FC<{ price: string | number, extraClass?: string | undefined }> = ({ price, extraClass = null }) => {
  const formatedCount = typeof price === 'number'
    ? new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(price)
    : price

  return (
    <p className={`text text_type_digits-default ${styles.textWitnIcon} ${extraClass}`}>{formatedCount}&nbsp;<CurrencyIcon type='primary' /></p>
  )
}

