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
import { submitOrderAndGetId, clearOrderNumber } from '../../services/actions/orderDetails'

function BurgerConstructor() {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
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

  const data = {
    "ingredients": [
      ingredientsArr.bun._id,
      ...ingredientsArr.ingredients.map((ingredient) => ingredient._id),
      ingredientsArr.bun._id
    ]
  };
  const handleOrderSubmit = () => {
    // Pass the data array to handleOrderSubmit
    const dataArray = [
      ingredientsArr.bun,
      ...ingredientsArr.ingredients,
      ingredientsArr.bun,
    ];

    dispatch(submitOrderAndGetId(dataArray, () => setModalOpen(true)));
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
        {modalOpen && (
          <Modal onClose={() => setModalOpen(false)}>
            <OrderDetails />
          </Modal>
        )}
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrderSubmit}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}



export default BurgerConstructor;