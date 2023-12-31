import React, { forwardRef } from 'react';
import IngredientCard from '../ingredient-card/IngredientCard';
import styles from './ingredient-cards.module.css';
import ingredientPropType from '../../../utils/prop-types';
import PropTypes from 'prop-types';

const IngredientCards = forwardRef(({ title, cardsArr, id }, ref) => {
 
  
  return (
    <div className={styles.card} ref={ref}>
      <h2 className={`text text_type_main-large pb-6`} id={id}>
        {title}
      </h2>
      <div className={`${styles.container} pb-10`}>
        {cardsArr.map((el) => (
          <IngredientCard
            name={el.name}
            image={el.image}
            price={el.price}
            el={el}
            key={el._id}
          />
        ))}
      </div>
    </div>
  );
});

IngredientCards.propTypes = {
  title: PropTypes.string.isRequired,
  cardsArr: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  id: PropTypes.string.isRequired,
};

export default IngredientCards;
