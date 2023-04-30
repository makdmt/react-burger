import React from "react";

import { useSelector } from "react-redux";

import orderDetailsStyle from './order-details.module.css'

function OrderDelails() {

  const orderDetails = useSelector(store => store.burgerConstructor.orderDetails)



  return (
    <div className={`${orderDetailsStyle.section} mt-30 mr-25 mb-30 ml-25`}>
      <p className="text text_type_digits-large mb-8">{orderDetails.orderNumber}</p>
      <h2 className="text text_type_main-medium mb-15">Индентификатор заказа</h2>
      {orderDetails.orderPostSuccess ? (
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

export default OrderDelails;
