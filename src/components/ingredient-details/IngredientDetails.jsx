import React from 'react';
import styles from './ingredient-details.module.css';
import ingredientPropTypes from '../../utils/prop-types'

function IngredientDetails({ el }) {

    return (
    <div className={styles.popup}>
    <h2 className='text text_type_main-large pt-10 pl-10 pr-10'>Детали ингредиента</h2>
    <div className={styles.container}>
    <img className={styles.image} src={el.image} alt={el.name} />
        <h2 className='text text_type_main-medium pt-4 pb-8'>{el.name}</h2>
        <div className={`${styles.info} text text_type_main-default pb-15`}>
          <div className={styles.item}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {el.calories}
            </p>
          </div>
          <div className={styles.item}>
            <p className="text text_type_main-default text_color_inactive">
              Белки,г
            </p>
            <p className="text text_type_digits-default text_color_inactive ml-2">
              {el.proteins}
            </p>
          </div>
          <div className={styles.item}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры,г
            </p>
            <p className="text text_type_digits-default text_color_inactive ml-2">
              {el.fat}
            </p>
          </div>
          <div className={styles.item}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы,г
            </p>
            <p className="text text_type_digits-default text_color_inactive ml-2">
              {el.carbohydrates}
            </p>
          </div>
        </div>
      </div>
      </div>

  )
}

IngredientDetails.propTypes = {
    el: ingredientPropTypes,
};

export default IngredientDetails;
  
