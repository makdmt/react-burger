import React, { FC } from "react";

import styles from './profit-in-digits.module.css'

export const ProfitInDigits: FC<{ heading: string, count: number }> = ({ heading, count }) => {

  const formatedCount = new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(count);

  return (
    <section className={`${styles.section} mt-15`}>
      <h3 className="text text_type_main-medium">{heading}</h3>
      <p className={`text text_type_digits-large ${styles.digits}`}>{formatedCount}</p>
    </section>
  )
}

