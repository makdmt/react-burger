import PropTypes from 'prop-types';
import styles from './orders-status-list.module.css'

export function OrdersStatusList({ status, ordersId, active = false }) {


  return (
    <section className={styles.section}>
      <h3 className="text text_type_main-medium mb-6">{status}</h3>
      <ul className={styles.listContainer}>
        {ordersId.map((item, index) => <li key={`${item}${index}`} className={`text text_type_digits-default mb-2 mr-3 ${active ? styles.listElementActive : null}`}>{item}</li>)}
      </ul>
    </section>
  )
}

OrdersStatusList.propTypes = {
  status: PropTypes.string.isRequired,
  ordersId: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number,])).isRequired,
  active: PropTypes.bool
}
