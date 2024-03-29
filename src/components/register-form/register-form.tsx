import React, { FC, FormEventHandler } from "react";

import { useDispatch, useSelector } from '../../services/types/index';
import { registrateNewUser, RESET_AUTH_REQUEST_STATUSES } from "../../services/actions/userAuth";

import { Link, Navigate } from 'react-router-dom';

import { useForm } from "../../hooks/useForm";

import { Input, EmailInput, PasswordInput, Button, InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ErrorShow } from "../error-show/error-show";
import styles from './register-form.module.css'


export const RegisterForm: FC<{}> = () => {

  const { registrationRequest, registrationFailedUserExist, registrationFailed, registrationSuccess, authUser } = useSelector(state => state.userAuth);
  const dispatch = useDispatch();
  const { values: registrationData, onChange, } = useForm({ email: '', password: '', name: '' });

  React.useEffect(() => {
    return () => { dispatch({ type: RESET_AUTH_REQUEST_STATUSES }) };
  }, [])


  const onRegisterSubmit = React.useCallback<FormEventHandler<HTMLFormElement>>(event => {
    event.preventDefault();
    dispatch(registrateNewUser(registrationData))
  }, [registrationData])


  if (authUser) {
    return (
      <Navigate to='/' replace={true} />
    )
  }

  if (registrationSuccess) {
    return (
      <Navigate to='/login' replace={true} state={{ loginMessage: `Вы успешно зарегистрировались! Введите свои данные.` }} />
    )
  }

  if (registrationFailed) {
    return (
      <ErrorShow />
    )
  }

  return (
    <form name="register" onSubmit={onRegisterSubmit} className={`${styles.section}`}>
      <p className="text text_type_main-medium">Регистрация</p>
      <Input type={"text"} name={"name"} value={registrationData.name} onChange={onChange} placeholder="Имя" extraClass="mt-6" />
      <EmailInput name={"email"} value={registrationData.email} onChange={onChange} placeholder="E-mail" extraClass="mt-6" />
      <PasswordInput name={"password"} value={registrationData.password} onChange={onChange} placeholder="Пароль" extraClass="mt-6" icon="ShowIcon" />
      {registrationFailedUserExist && <p className="text text_type_main-default mt-6 mr-6">Мы не можем Вас зарегистрировать, извините <InfoIcon type="error" /><br /> Попробуйте ввести другие данные</p>}
      <Button htmlType="submit" disabled={registrationRequest} type="primary" size="medium" extraClass="mt-6 mb-15">{registrationRequest ? "Загрузка..." : "Зарегистрироваться"}</Button>
      <div className={styles.promptElement}>
        <p className="text text_type_main-default text_color_inactive p-2">Уже зарегистрированы?</p>
        <Link to="/login"><Button htmlType="button" type="secondary" size="medium" extraClass="p-2">Войти</Button></Link>
      </div>

    </form>
  )
}
