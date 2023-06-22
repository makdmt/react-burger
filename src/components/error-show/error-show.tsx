import React, { FC } from "react";
import { Link } from 'react-router-dom';

import { Button, InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './error-show.module.css'

export const ErrorShow: FC = () => {

  return (
    <section className={`${styles.section}`}>
      <p className="text text_type_main-medium mb-3">Произошла ошибка в системе  <InfoIcon type="error" /></p>
      <p className="text text_type_main-small">Попробуйте вернуться на главную и повторить попытку снова</p>
      <Link to="/"><Button htmlType="button" type="primary" size="medium" extraClass="mt-6 mb-15">Перейти на главную...</Button></Link>
    </section>
  )
}
