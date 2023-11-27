import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import ingredientPropType from '../../../utils/prop-types';
import Modal from '../../modal/Modal';
import IngredientDetails from '../../ingredient-details/IngredientDetails';
import BurgerContext from '../../../utils/BurgerContext';
import { addSelectedIngredient, removeSelectedIngredient } from '../../../services/actions/ingredientDetails';
import { useDispatch } from 'react-redux';



function IngredientCard({ el }) {
  const [count, setCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const { handleBurgerClick } = useContext(BurgerContext);

  const dispatch = useDispatch();

  const handleModalOpen = () => {
    dispatch(addSelectedIngredient(el));
    setModalOpen(true);
  }
  const handleClick = () => {
    handleBurgerClick(el);
  };
  const handleModalClose = useCallback(() => {
    dispatch(removeSelectedIngredient());
    setModalOpen(false);
  }, [dispatch]);

  /*const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });*/

  return (
    <div className={styles.card} onClick={handleClick} >
      {count > 0 && <Counter count={count} size='default' />}
      <img className={styles.image} src={el.image} alt={el.name} onClick={handleModalOpen} />

      {modalOpen && (
        <Modal onClose={handleModalClose}>
          <IngredientDetails el={el} />
        </Modal>
      )}
      <div className={styles.price}>
        <span className='text text_type_digits-default pb-1'>{el.price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <div className={`${styles['name-card']} text text_type_main-default`}>{el.name}</div>
    </div>
  );
}

IngredientCard.propTypes = {
  el: ingredientPropType,
};
export default IngredientCard;