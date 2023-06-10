import React, {FC, FormEventHandler} from "react";

import { useSelector, useDispatch } from '../../services/types/index';
import { editUserInfo, RESET_AUTH_REQUEST_STATUSES } from "../../services/actions/userAuth";

import { useForm } from "../../hooks/useForm";
import { Input, EmailInput, PasswordInput, Button, InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './user-details-form.module.css'


export const UserDetailsForm: FC<{}> = () => {

  const dispatch = useDispatch();
  const { patchUserInfoRequest, patchUserInfoSuccess, patchUserInfoFailed, authUser } = useSelector(store => store.userAuth)

  React.useEffect(() => {
    return () => {dispatch({ type: RESET_AUTH_REQUEST_STATUSES });}
  }, [])

  const {values: formData, onChange, onReset} = useForm({name: authUser?.name ?? '', email: authUser?.email ?? '', password: ''})

  const onSubmit = React.useCallback<FormEventHandler<HTMLFormElement>>((event: any )=> {
    event.preventDefault();
    dispatch(editUserInfo(formData))
  },[formData])

  const formChanged = React.useMemo<boolean>(() => {
    if (formData.name === authUser.name && formData.email === authUser.email && formData.password === '') {
      return false;
    } else {
      return true;
    }
  },[formData, authUser])


  return (
    <form name='userDetails' onSubmit={onSubmit} onReset={onReset} className={`${styles.section}`}>
      <Input type={"text"} name={"name"} value={formData.name} onChange={onChange} icon="EditIcon" placeholder="Имя" extraClass="" />
      <EmailInput name={"email"} value={formData.email} onChange={onChange} isIcon={true} placeholder="Логин" extraClass="mt-6" />
      <PasswordInput name={"password"} value={formData.password} onChange={onChange} icon="EditIcon" placeholder="Пароль" extraClass="mt-6" />
      {formChanged && <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mr-7">{patchUserInfoRequest ? 'Сохранение...' : 'Сохранить'}</Button>}
      {formChanged && <Button htmlType="reset" type="primary" size="medium" extraClass="mt-6 mr-7">Отмена</Button> }
      {patchUserInfoFailed && <p>Произошла ошибка в системе <InfoIcon type='error' /> <br />попробуйте еще раз...</p>}
      {patchUserInfoSuccess && <p>Данные успешно сохранены <InfoIcon type='success' /></p>}
    </form>
  )
}
