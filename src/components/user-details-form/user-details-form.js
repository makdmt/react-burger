import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { editUserInfo, RESET_AUTH_REQUEST_STATUSES } from "../../services/actions/userAuth";

import { Link, NavLink } from 'react-router-dom';

import { Input, EmailInput, PasswordInput, Button, InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './user-details-form.module.css'

export function UserDetailsForm() {

  const dispatch = useDispatch();
  const { patchUserInfoRequest, patchUserInfoSuccess, patchUserInfoFailed, authUser } = useSelector(store => store.userAuth)
  const [formData, setFormData] = React.useState({ name: authUser?.name ?? '', email: authUser?.email ?? '', password: '' });
  const [ formChanged, setFormChanged] = React.useState(false);

  React.useEffect(() => {
    return () => dispatch({ type: RESET_AUTH_REQUEST_STATUSES });
  }, [])


  const onChange = event => {
    setFormChanged(true);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const onSubmit = React.useCallback(event => {
    event.preventDefault();
    dispatch(editUserInfo(formData))
  })

  const onReset = React.useCallback(event => {
    event.preventDefault();
    setFormChanged(false);
    setFormData({ name: authUser?.name ?? '', email: authUser?.email ?? '', password: '' })
  })


  return (
    <form name='userDetails' onSubmit={onSubmit} onReset={onReset} className={`${styles.section}`}>
      <Input type={"text"} name={"name"} value={formData.name} onChange={onChange} icon="EditIcon" placeholder="Имя" extraClass="" />
      <EmailInput type={"email"} name={"email"} value={formData.email} onChange={onChange} icon="EditIcon" placeholder="Логин" extraClass="mt-6" />
      <PasswordInput type={"password"} name={"password"} value={formData.password} onChange={onChange} icon="EditIcon" placeholder="Пароль" extraClass="mt-6" />
      {formChanged && <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mr-7">{patchUserInfoRequest ? 'Сохранение...' : 'Сохранить'}</Button>}
      {formChanged && <Button htmlType="reset" type="primary" size="medium" extraClass="mt-6 mr-7">Отмена</Button> }
      {patchUserInfoFailed && <p>Произошла ошибка в системе <InfoIcon type='error' /> <br />попробуйте еще раз...</p>}
      {patchUserInfoSuccess && <p>Данные успешно сохранены <InfoIcon type='success' /></p>}
    </form>
  )
}
