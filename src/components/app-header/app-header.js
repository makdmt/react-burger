import React from 'react' 
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
class AppHeader extends React.Component {
    render() {
        return (
            <header>
                <BurgerIcon type={'primary'} /> 
                <a href="#" className='text text_type_main-default text_color_inactive'>Конструктор</a>           
                <ListIcon type={'secondary'} /> 
                <a href="#" className='text text_type_main-default text_color_inactive'>Лента заказов</a>           
                 <Logo />
                 <ProfileIcon type={'secondary'} /> 
                <a href="#" className='text text_type_main-default text_color_inactive'>Личный кабинет</a>         
                
            </header>
        );
    }
}

export default AppHeader