import React, { FC, FormEventHandler } from "react";

import { useSelector, useDispatch } from '../../services/types/index';
import { resetUserPassword } from "../../services/actions/userAuth";

import { Link, Navigate, useLocation } from 'react-router-dom';

import { useForm } from "../../hooks/useForm";

import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ErrorShow } from "../error-show/error-show";
import styles from './reset-password-form.module.css'


export const ResetPasswordForm: FC<{}> = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  const { resetPasswordRequest, resetPasswordFailed, resetPasswordSuccess } = useSelector(state => state.userAuth);

  const { values: registrationData, onChange } = useForm({ password: '', token: '' })

  const onSubmit = React.useCallback<FormEventHandler<HTMLFormElement>>(event => {
    event.preventDefault();
    dispatch(resetUserPassword(registrationData))
  }, [registrationData])

  if (location?.state?.navigatedFrom !== '/forgot-password') {
    return (
      <Navigate to='/' replace={true} />
    )
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
      <PasswordInput name={"password"} value={registrationData.password} onChange={onChange} placeholder="Введите новый пароль" extraClass="mt-6" icon="ShowIcon" />
      <Input type={"text"} name={"token"} value={registrationData.token} onChange={onChange} placeholder="Введите код из письма" extraClass="mt-6" />
      <Button htmlType="submit" disabled={resetPasswordRequest} type="primary" size="medium" extraClass="mt-6 mb-15">{resetPasswordRequest ? "Загрузка..." : "Сохранить"}</Button>
      <div className={styles.promptElement}>
        <p className="text text_type_main-default text_color_inactive p-2">Вспомнили пароль?</p>
        <Link to="/login"><Button htmlType="button" type="secondary" size="medium" extraClass="p-2">Войти</Button></Link>
      </div>

    </form>
  )
}
