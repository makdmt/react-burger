import React from "react";
import PropTypes from 'prop-types';

export function OrderStatusElement({ status, extraClass = null }) {

  const statuses = {
    done: ['Выполнен', 'white'],
    created: ['Готовится', '#00CCCC'],
    canceled: ['Отменен', 'red'],
    default: ['Не определен', '#8585AD']
  }

  const checkedStatus = React.useMemo(() => {
    if (statuses.hasOwnProperty(status)) {
      return status;
    } else {
      return 'default';
    }
  }, [status])

  return (
    <p style={{ color: statuses[checkedStatus][1] }} className={`text text_type_main-default ${extraClass}`}>{statuses[checkedStatus][0]}</p>
  )
}

OrderStatusElement.propTypes = {
  status: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
}
