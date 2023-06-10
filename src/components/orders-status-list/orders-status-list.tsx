import React, { FC } from "react";

import styles from './orders-status-list.module.css'

export const OrdersStatusList: FC<{ status: string, ordersId: Array<string | number | null>, active?: boolean }> = ({ status, ordersId, active = false }) => {


  return (
    <section className={styles.section}>
      <h3 className="text text_type_main-medium mb-6">{status}</h3>
      <ul className={styles.listContainer}>
        {ordersId.map((item: string | number | null, index: number) => <li key={`${item}${index}`} className={`text text_type_digits-default mb-2 mr-3 ${active ? styles.listElementActive : null}`}>{item}</li>)}
      </ul>
    </section>
  )
}

