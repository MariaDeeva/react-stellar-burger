import React from 'react';
import IngredientCard from '../ingredient-card/ingredient-card';
import styles from './ingredient-cards.module.css';
import  ingredientPropType from '../../../utils/prop-types';
import PropTypes from 'prop-types';
function IngredientCards({ title, cardsArr }) {
  
  return (
    <div className={styles.card}>
      <h2 className={`text text_type_main-large pb-6`}>{title}</h2>
      <div className={`${styles.container} pb-10`}>
        {cardsArr.map(({ _id, name, price, image }) => (
          <IngredientCard
            name={name}
            price={price}
            image={image}
            key={_id}
          />
        ))}
      </div>
    </div>
  );
}

IngredientCards.propTypes = {
  title: PropTypes.string.isRequired,
  cardsArr: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default IngredientCards;