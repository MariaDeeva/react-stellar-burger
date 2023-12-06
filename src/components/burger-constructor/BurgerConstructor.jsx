import React, { useState, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import { useSelector, useDispatch } from "react-redux";
import BunElement from './bun-element/BunElement';
import { v4 as uuidv4 } from 'uuid';
import OtherElement from './other-element/OtherElement';
import { ADD_INGREDIENT } from '../../services/actions/burgerConstructor';
import { useDrop } from 'react-dnd';
import axios from 'axios';
import {API_URL} from '../../utils/api'


function BurgerConstructor() {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [orderNum, setOrderNum] = useState();

  const ingredientsArr = useSelector(state => state.constructorReducer);
  const ElmArr = useMemo(() => ingredientsArr.ingredients.filter(
    ingredient => ingredient.type !== 'bun'
  ), [ingredientsArr.ingredients]);

  //возможно стоимость булки должна умножаться на двое (ingredientsArr.bun ? ingredientsArr.bun.price * 2 : 0)
  const totalPrice = useMemo(() => {
    return (
      (ingredientsArr.bun ? ingredientsArr.bun.price : 0) +
      ingredientsArr.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)
    );
  }, [ingredientsArr]);

  async function postOrderData(ingredientsIds) {
    try {
      const response = await axios.post(`${API_URL}/orders`, { ingredients: ingredientsIds });
  
      if (response.data.success) {
        setOrderNum(response.data.order.number);
        setModalOpen(true);
      } else {
        console.error('Не удалось получить номер заказа');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
  
  const handleModalOpen = async () => {
    const ingredientsIds = ingredientsArr.ingredients
      .filter((ingredient) => ingredient.type !== 'bun')
      .map((ingredient) => ingredient._id);
  
    await postOrderData(ingredientsIds);
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: item => {
      dispatch({
        type: ADD_INGREDIENT,
        payload: { ...item, key: uuidv4() }
      });
    }
  });

  return (
    <section className={`${styles.section} mt-25`} ref={dropTarget}>
      <div className={`${styles.list}  pt-4 pl-4`}>
        <div className={`${styles['burger-bun']} pl-8`}>
          <BunElement
            type='top'
            position='(верх)'
          />
        </div>
        <ul className={`${styles.scroll} custom-scroll mt-4 mb-4`} >
          {ElmArr.map((ingredient, index) => {
            return (
              <OtherElement
                key={ingredient.key}
                ingredient={ingredient}
                index={index}
              />
            )
          })}
        </ul>
        <div className={`${styles['burger-bun']} pl-8`}>
          <BunElement
            type='bottom'
            position='(низ)'
          />
        </div>
      </div>
      <div className={`${styles.order} mr-4 mt-10`}>
        <div className={styles.total}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        {modalOpen && orderNum && (
          <Modal onClose={() => setModalOpen(false)}>
            <OrderDetails orderNum={orderNum} />
          </Modal>
        )}
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleModalOpen}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}



export default BurgerConstructor;