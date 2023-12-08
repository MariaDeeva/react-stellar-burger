import React, { useState, useMemo, useCallback } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import ingredientPropType from '../../../utils/prop-types';
import Modal from '../../modal/Modal';
import IngredientDetails from '../../ingredient-details/IngredientDetails';
import { addSelectedIngredient, removeSelectedIngredient } from '../../../services/actions/ingredientDetails';
import { useDispatch,useSelector  } from 'react-redux';
import { useDrag } from "react-dnd";

function IngredientCard({ el }) {
  
  const [modalOpen, setModalOpen] = useState(false);  
  const ingredientsArr = useSelector(state => state.constructorReducer);
    const count = useMemo(() => {
    if (ingredientsArr.bun === null) return 0;
      const bunCount = el.type === 'bun' && el._id === ingredientsArr.bun._id ? 2 : 0;
    const ingredientCount = ingredientsArr.ingredients.filter((item) => item._id === el._id).length;
      return bunCount + ingredientCount;
  }, [ingredientsArr.ingredients, ingredientsArr.bun, el]);
  const dispatch = useDispatch();
  const handleModalOpen = () => {
    dispatch(addSelectedIngredient(el));
    setModalOpen(true);
  };
  const handleModalClose = useCallback(() => {
    dispatch(removeSelectedIngredient());
    setModalOpen(false);
  }, [dispatch]);
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: el,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  return (
    <div className={styles.card} ref={dragRef}>
      {count > 0 && <Counter count={count} size='default' />}
      <img className={styles.image}
        src={el.image}
        alt={el.name}
        style={{ opacity }}
        onClick={handleModalOpen} />
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