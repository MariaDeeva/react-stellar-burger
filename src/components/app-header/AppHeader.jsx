import {Logo, ListIcon, BurgerIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from './app-header.module.css'

export default function AppHeader() {
  return (
    <header className={headerStyles['app-header']}>
      <nav className={headerStyles['menu-header']} >
        <ul className={`${headerStyles['list-header']} pb-4 pt-4`} >

          <li className='pl-5 pr-5 pb-5 pt-5 '>
            <a href='#' className={headerStyles['link-header']}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default pl-2 pr-2">Конструктор</p>
            </a>
          </li>
          <li className='pl-5 pr-5 pb-5 pt-5 '>
            <a href='#' className={headerStyles['link-header']}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive pl-2 pr-2">Лента заказов</p>
            </a>
          </li>

          <Logo />
          <li className='pl-5 pr-5 pb-5 pt-5'>
            <a href='#' className={headerStyles['link-header']}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive pl-2 pr-2">Личный кабинет</p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
