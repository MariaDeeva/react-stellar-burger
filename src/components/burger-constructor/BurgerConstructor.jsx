import React from 'react';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import BurgerElement from './burger-element/burger-element';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropType from '../../utils/prop-types';

function BurgerConstructor({ burgerArr }) {
  const { Bun, ElmArr, totalPrice } = burgerArr.reduce(
    (acc, { type, ...props }) => {
      if (type === 'bun') {
        acc.Bun = props;
        acc.totalPrice += props.price * 2;
      } else {
        acc.ElmArr.push(props);
        acc.totalPrice += props.price;
      }

      return acc;
    },
    { Bun: null, ElmArr: [], totalPrice: 0 }
  );

  return (
    <section className={`${styles.section} mt-25`}>
      <div className={`${styles.list} custom-scroll pt-4 pl-4`}>
        <div className={`${styles['burger-bun']} pl-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${Bun.name} (верх)`}
            price={Bun.price}
            thumbnail={Bun.image}
          />
        </div>
        {BurgerElement(ElmArr)}
        <div className={`${styles['burger-bun']} pl-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${Bun.name} (низ)`}
            price={Bun.price}
            thumbnail={Bun.image}
          />
        </div>
      </div>
      <div className={`${styles.order} mr-4 mt-10`}>
        <div className={styles.total}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  burgerArr: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerConstructor;