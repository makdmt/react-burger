import React, { FC, FormEventHandler } from "react";

import { useForm } from "../../hooks/useForm";
import { useSelector, useDispatch } from '../../services/types/index';
import { login, RESET_AUTH_REQUEST_STATUSES } from "../../services/actions/userAuth";

import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { EmailInput, PasswordInput, Button, InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ErrorShow } from "../error-show/error-show";

import styles from './login-form.module.css'


export const LoginForm: FC<{}> = () => {

  const { values: registrationData, onChange } = useForm({ email: '', password: '' });
  const dispatch = useDispatch();

  const { authRequest, authIncorrectPassword, authServerFailed, authUser } = useSelector(state => state.userAuth);

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    authUser && navigate('/', { replace: true });
    return () => { dispatch({ type: RESET_AUTH_REQUEST_STATUSES }) };
  }, [])


  const onLoginSubmit = React.useCallback<FormEventHandler<HTMLFormElement>>(event => {
    event.preventDefault();
    dispatch(login(registrationData))
  }, [registrationData])


  if (authUser) {
    return (
      location?.state?.navigateAfter ? <Navigate to={location.state.navigateAfter} replace={true} /> : <Navigate to='/' replace={true} />
    )
  }

  if (authServerFailed) {
    return (
      <ErrorShow />
    )
  }

  return (
    <form name="login" onSubmit={onLoginSubmit} className={`${styles.section}`}>
      <p style={{ textAlign: 'center' }} className="text text_type_main-medium mb-6">{location?.state?.loginMessage && location.state.loginMessage}</p>
      <p className="text text_type_main-medium">Вход</p>
      <EmailInput name={"email"} value={registrationData.email} onChange={onChange} placeholder="E-mail" extraClass="mt-6" />
      <PasswordInput name={"password"} value={registrationData.password} onChange={onChange} placeholder="Пароль" extraClass="mt-6" icon="ShowIcon" />
      {authIncorrectPassword && <p className="text text_type_main-default mt-6 mr-6">Неверный пароль или логин <InfoIcon type="error" /></p>}
      <Button htmlType="submit" disabled={authRequest} type="primary" size="medium" extraClass="mt-6 mb-15">{authRequest ? "Загрузка..." : "Войти"}</Button>
      <div className={styles.promptElement}>
        <p className="text text_type_main-default text_color_inactive p-2">Вы — новый пользователь?</p>
        <Link to="/register"><Button htmlType="button" type="secondary" size="medium" extraClass="p-2">Зарегистрироваться</Button></Link>
      </div>
      <div className={styles.promptElement}>
        <p className="text text_type_main-default text_color_inactive p-2">Забыли пароль?</p>
        <Link to="/forgot-password"><Button htmlType="button" type="secondary" size="medium" extraClass="p-2">Восстановить пароль</Button></Link>
      </div>
    </form>
  )
}
