import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { resetUserPassword } from "../../services/actions/userAuth";

import { Link, Navigate, useLocation } from 'react-router-dom';

import { Input, EmailInput, PasswordInput, Button, ShowIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { ErrorShow } from "../error-show/error-show";

import styles from './reset-password-form.module.css'

export function ResetPasswordForm() {

  const location = useLocation();

  const [registrationData, setRegistrationData] = React.useState({password: '', token: ''});
  const dispatch = useDispatch();

  const {resetPasswordRequest, resetPasswordFailed, resetPasswordSuccess} = useSelector(state => state.userAuth);

  const onChange = event => {
    setRegistrationData({...registrationData, [event.target.name]: event.target.value});
  }

  const onSubmit = React.useCallback(event => {
    event.preventDefault();
    dispatch(resetUserPassword(registrationData))
  })

  if (location?.state?.navigatedFrom !== '/forgot-password') {
    return null;
  }

  if (resetPasswordSuccess) {
    return (
      <Navigate to='/' replace={true} />
    )
  }

  if (resetPasswordFailed) {
    return (
      <ErrorShow />
    )
  }

  return (
    <form name="reset-password" onSubmit={onSubmit} className={`${styles.section}`}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <PasswordInput type={"password"} name={"password"} value={registrationData.password} onChange={onChange} placeholder="Введите новый пароль" extraClass="mt-6" icon="ShowIcon" />
      <Input type={"text"} name={"token"} value={registrationData.token} onChange={onChange} placeholder="Введите код из письма" extraClass="mt-6" />
      <Button htmlType="submit" disabled={resetPasswordRequest} type="primary" size="medium" extraClass="mt-6 mb-15">{resetPasswordRequest ? "Загрузка..." : "Сохранить"}</Button>
      <div className={styles.promptElement}>
        <p className="text text_type_main-default text_color_inactive p-2">Вспомнили пароль?</p>
        <Link to="/login"><Button htmlType="button" type="secondary" size="medium" extraClass="p-2">Войти</Button></Link>
      </div>

    </form>
  )
}
