import React, { useState, useMemo, useContext } from 'react';
import styles from './burger-constructor.module.css';
import BurgerElement from './burger-element/burger-element';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import BurgerContext from '../../utils/BurgerContext';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, removeIngredient, setIngredients } from '../../services/actions/burgerConstructor';

const OrderURL = 'https://norma.nomoreparties.space/api/orders';

function BurgerConstructor() {

  
  const ingredients = useSelector(state => state.ingredients);
 const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch(); 
  const { burgerArr } = useContext(BurgerContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderNum, setOrderNum] = useState();
  
  const handleAddIngredient = ingredient => {
    dispatch(addIngredient(ingredient));
  };

  const handleRemoveIngredient = index => {
    dispatch(removeIngredient(index));
  };

  const handleSetIngredients = ingredients => {
    dispatch(setIngredients(ingredients));
  };
  /*
const totalPrice = useMemo(
  () =>            ingredients
  ? ingredients.reduce((acc, props) => acc + props.price, 0)
  : 0,
[ingredients]

);*/


  const { Bun, ElmArr} = useMemo(() => {
    return burgerArr.reduce(
      (acc, { type, ...props }) => {
        if (type === 'bun') {
          acc.Bun = props;
          acc.totalPrice += props.price;
        } else {
          acc.ElmArr.push(props);
          acc.totalPrice += props.price;
        }

        return acc;
      },
      { Bun: null, ElmArr: [], totalPrice: 0 }
    );
  }, [burgerArr]);

  const handleModalOpen = async () => {
    try {
      const ingredientsIds = burgerArr.map((ingredient) => ingredient._id);
      const response = await axios.post(OrderURL, { ingredients: ingredientsIds });

      if (response.data.success) {
        setOrderNum(response.data.order.number);
        setModalOpen(true);
      } else {
        console.error('Не удалось получить номер заказа');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
    console.log(totalPrice);
  };
  return (
    <section className={`${styles.section} mt-25`}>
      <div className={`${styles.list} custom-scroll pt-4 pl-4`}>
        <div className={`${styles['burger-bun']} pl-8`}>
          {Bun && Bun.name ? (
            <ConstructorElement
              type='top'
              isLocked={true}
              text={`${Bun.name} (верх)`}
              price={Bun.price}
              thumbnail={Bun.image}
            />
          ) : null}
        </div>
        {burgerArr.length !== 0 ? <BurgerElement elements={ElmArr} /> : null}

        <div className={`${styles['burger-bun']} pl-8`}>
          {Bun && Bun.name ? (
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={`${Bun.name} (низ)`}
              price={Bun.price}
              thumbnail={Bun.image}
            />
          ) : null}
        </div>
      </div>
      <div className={`${styles.order} mr-4 mt-10`}>
        <div className={styles.total}>
          <span className='text text_type_digits-medium'>{totalPrice}</span>
          <CurrencyIcon type='primary' />
        </div>
        {modalOpen && orderNum && (
          <Modal onClose={() => setModalOpen(false)}>
            <OrderDetails orderNum={orderNum} />
          </Modal>
        )}
        <Button htmlType='button' type='primary' size='large' onClick={handleModalOpen}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}



export default BurgerConstructor;