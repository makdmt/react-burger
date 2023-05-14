import React from 'react';

import { Link, NavLink, useLocation } from 'react-router-dom';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

import headerStyles from './app-header.module.css'

function AppHeader() {

  const location = useLocation();

  return (
    <header className={headerStyles.header}>
      <nav className={`${headerStyles.menu} mt-4 mb-4`}>
        <NavLink to='/' end className={({ isActive }) => isActive ?
          `${headerStyles.button} text text_type_main-default pl-5 pr-5`
          : `${headerStyles.button} text text_type_main-default text_color_inactive pl-5 pr-5`}>
          <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
          Конструктор
        </NavLink>

        <NavLink to='/feed' end className={({ isActive }) => isActive ?
          `${headerStyles.button} text text_type_main-default pl-5 pr-5`
          : `${headerStyles.button} text text_type_main-default text_color_inactive pl-5 pr-5`}>
          <BurgerIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
          Лента заказов
        </NavLink>

      </nav>
      <Link to="/" className={`${headerStyles.logo} `}>
        <Logo height='40' />
      </Link>
      <NavLink to='/profile' state={{ navigateAfter: '/profile' }} className={({ isActive }) => isActive ? `${headerStyles.button} ${headerStyles.lkButton} text text_type_main-default pl-5 pr-5 mt-4 mb-4` : `${headerStyles.button} ${headerStyles.lkButton} text text_type_main-default text_color_inactive pl-5 pr-5 mt-4 mb-4`}>
        <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'} />
        Личный кабинет
      </NavLink>
    </header>
  );
}

export default AppHeader
