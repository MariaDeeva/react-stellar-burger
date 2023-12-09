import React  from 'react';
import styles from './order-details.module.css';
import done from '../../images/done1.svg';
import { useSelector } from 'react-redux';

export default function OrderDetails() {

const orderNum = useSelector((state)=>state.orderDetailsReducer.orderNum)
        return (
          <div className={`${styles.container} pt-30 pb-30`}>
            <h2 className='text text_type_digits-large pb-8'>{orderNum}</h2>
            <p className='text text_type_main-medium'>идентификатор заказа</p>
            <img className={`${styles.image} pt-15 pb-15`} src={done} alt='done'/>
            <p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
          </div>
        )
      }
