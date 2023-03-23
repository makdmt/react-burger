import React from "react";
import PropTypes from 'prop-types';

import orderDetailsStyle from './order-details.module.css'

function OrderDelails({ order, success }) {

  return (
    <div className={`${orderDetailsStyle.section} mt-30 mr-25 mb-30 ml-25`}>
      <p className="text text_type_digits-large mb-8">{order.number}</p>
      <h2 className="text text_type_main-medium mb-15">Индентификатор заказа</h2>
      {success ? (
        <>
          <div className={orderDetailsStyle.statusSpot}></div>
          <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </>
      ) : (
        <>
          <p className="text text_type_main-default mt-15 mb-2">{'Что-то пошло не так :('}</p>
          <p className="text text_type_main-default text_color_inactive">Сообщите номер заказа менеджеру</p>

        </>
      )}
    </div>
  )

}

OrderDelails.propTypes = {
  order: PropTypes.shape({
    number: PropTypes.number.isRequired
  }).isRequired,
  success: PropTypes.bool.isRequired
}

export default OrderDelails;
