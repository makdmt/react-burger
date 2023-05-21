import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../services/actions/userAuth";

import { deleteCookie } from "../../utils/cookie-set-get";

import { Link, NavLink, useNavigate } from 'react-router-dom';

import { ErrorShow } from "../error-show/error-show";

import { Input, EmailInput, PasswordInput, Button, InfoIcon  } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './user-profile-navigation.module.css'

export function UserProfileNavigation() {

  const dispatch = useDispatch();
  const { logoutRequest, logoutFailed, authUser } = useSelector(store => store.userAuth);

  const [exitBtnPushed, setExitBtnPushed] = React.useState(false);

  const onLogoutClick = React.useCallback(() => {
    setExitBtnPushed(true);
    dispatch(logout())
  }, [dispatch]);

  // React.useEffect(() => {
  //   logoutFailed && setExitBtnPushed(false);
  // }, [logoutFailed])


  return (
    <nav className={`${styles.section}`}>
      <NavLink to="/profile" end className={({ isActive }) => isActive ? "text text_type_main-medium mb-10 mt-5" : "text text_type_main-medium text_color_inactive mb-10"}>Профиль</NavLink>
      <NavLink to="/profile/orders" className={({ isActive }) => isActive ? "text text_type_main-medium mb-10" : "text text_type_main-medium text_color_inactive mb-10"}>История заказов</NavLink>
      <a type='button' onClick={onLogoutClick} className={exitBtnPushed ? "text text_type_main-medium mb-10" :"text text_type_main-medium text_color_inactive mb-10"}>{logoutRequest ? 'Выходим...' : 'Выход'}</a>
      {logoutFailed && <p>Произошла ошибка в системе <InfoIcon type='error' /> попробуйте еще раз...</p>}

    </nav>
  )
}
