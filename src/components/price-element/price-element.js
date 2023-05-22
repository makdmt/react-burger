
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price-element.module.css'


export function PriceElement({ price, extraClass = null }) {
  const formatedCount = typeof price === 'number'
  ? new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(price)
  : price

  return (
    <p className={`text text_type_digits-default ${styles.textWitnIcon} ${extraClass}`}>{formatedCount}&nbsp;<CurrencyIcon /></p>
  )
}


PriceElement.propTypes = {
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  extraClass: PropTypes.string,
}
