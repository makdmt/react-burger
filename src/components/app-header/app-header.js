import React from 'react'

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

import headerStyles from './app-header.module.css'
class AppHeader extends React.Component {
  render() {
    return (
      <header className={headerStyles.header}>
        <nav className={`${headerStyles.menu} mt-4 mb-4`}>
          <button style={{color: 'white'}} className={`${headerStyles.button} text text_type_main-default pl-5 pr-5 mr-2`} type='button'>
            <BurgerIcon type={'primary'} />
            Конструктор
          </button>
          <button className={`${headerStyles.button} text text_type_main-default text_color_inactive pl-5 pr-5`} type='button'>
            <ListIcon type={'secondary'} />
            Лента заказов
          </button>
        </nav>
        <div className={`${headerStyles.logo} ` }>
          <Logo height='40' />
        </div>
        <button className={`${headerStyles.button} ${headerStyles.lkButton} text text_type_main-default text_color_inactive pl-5 pr-5 mt-4 mb-4`} type='button'>
          <ProfileIcon type={'secondary'} />
          Личный кабинет
        </button>
      </header>
    );
  }
}

export default AppHeader
