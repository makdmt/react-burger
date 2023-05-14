import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { forgotUserPassword } from "../../services/actions/userAuth";

import { Link, Navigate } from 'react-router-dom';

import { Input, EmailInput, PasswordInput, Button, ShowIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { ErrorShow } from "../error-show/error-show";

import styles from './forgot-password-form.module.css'

export function ForgotPasswordForm() {

  const [registrationData, setRegistrationData] = React.useState({email: ''});
  const dispatch = useDispatch();

  const {forgotPasswordRequest, forgotPasswordFailed, forgotPasswordSuccess} = useSelector(state => state.userAuth);

  const onChange = event => {
    setRegistrationData({...registrationData, [event.target.name]: event.target.value});
  }

  const onSubmit = React.useCallback(event => {
    event.preventDefault();
    dispatch(forgotUserPassword(registrationData))
  })


  if (forgotPasswordSuccess) {
    return (
      <Navigate to='/reset-password' replace={true} state={{navigatedFrom: '/forgot-password'}} />
    )
  }

  if (forgotPasswordFailed) {
    return (
      <ErrorShow />
    )
  }

  return (
    <form name="forgot-password" onSubmit={onSubmit} className={`${styles.section}`}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <EmailInput type={"email"} name={"email"} value={registrationData.email} onChange={onChange} placeholder="E-mail" extraClass="mt-6" />
      <Button htmlType="submit" disabled={forgotPasswordRequest} type="primary" size="medium" extraClass="mt-6 mb-15">{forgotPasswordRequest ? "Загрузка..." : "Восстановить"}</Button>
      <div className={styles.promptElement}>
        <p className="text text_type_main-default text_color_inactive p-2">Вспомнили пароль?</p>
        <Link to="/login"><Button htmlType="button" type="secondary" size="medium" extraClass="p-2">Войти</Button></Link>
      </div>
    </form>
  )
}
