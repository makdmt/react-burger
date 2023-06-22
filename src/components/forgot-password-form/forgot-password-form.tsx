import React, { FC, FormEventHandler } from "react";

import { useForm } from "../../hooks/useForm";
import { useSelector, useDispatch } from '../../services/types/index';
import { forgotUserPassword } from "../../services/actions/userAuth";

import { Link, Navigate } from 'react-router-dom';

import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { ErrorShow } from "../error-show/error-show";

import styles from './forgot-password-form.module.css'

export const ForgotPasswordForm: FC = () => {

  const { values: registrationData, onChange } = useForm<{ email: string }>({ email: '' });
  const dispatch = useDispatch();
  const { forgotPasswordRequest, forgotPasswordFailed, forgotPasswordSuccess, authUser } = useSelector(state => state.userAuth);


  const onSubmit = React.useCallback<FormEventHandler<HTMLFormElement>>(event => {
    event.preventDefault();
    dispatch(forgotUserPassword(registrationData))
  }, [registrationData, dispatch])

  if (authUser) {
    return (
      <Navigate to='/' replace={true} />
    )
  }

  if (forgotPasswordSuccess) {
    return (
      <Navigate to='/reset-password' replace={true} state={{ navigatedFrom: '/forgot-password' }} />
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
      <EmailInput name={"email"} value={registrationData.email} onChange={onChange} placeholder="E-mail" extraClass="mt-6" />
      <Button htmlType="submit" disabled={forgotPasswordRequest} type="primary" size="medium" extraClass="mt-6 mb-15">{forgotPasswordRequest ? "Загрузка..." : "Восстановить"}</Button>
      <div className={styles.promptElement}>
        <p className="text text_type_main-default text_color_inactive p-2">Вспомнили пароль?</p>
        <Link to="/login"><Button htmlType="button" type="secondary" size="medium" extraClass="p-2">Войти</Button></Link>
      </div>
    </form>
  )
}
