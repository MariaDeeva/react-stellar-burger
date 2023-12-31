import React, { useState, useEffect, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientCards from './ingredient-cards/IngredientCards';
import ingredientPropType from '../../utils/prop-types';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

function BurgerIngredients() {
    const ingredients = useSelector(state => state.ingredientsReducer) || {};
  
    const [current, setCurrent] = useState('bun');
    const { ref: bunRef, inView: bunView } = useInView({ threshold: 0 });
    const { ref: sauceRef, inView: sauceView } = useInView({ threshold: 0 });
    const { ref: mainRef, inView: mainView } = useInView({ threshold: 0 });
  
    useEffect(() => {
        setCurrent(bunView ? 'bun' : sauceView ? 'sauce' : mainView ? 'main' : '');
    }, [bunView, sauceView, mainView]);

    const filterIngredients = (type) =>
    ingredients?.ingredients?.filter((el) => el.type === type) || [];

    const bunArray = useMemo(() => filterIngredients('bun'), [ingredients.ingredients]);
    const sauceArray = useMemo(() => filterIngredients('sauce'), [ingredients.ingredients]);
    const mainArray = useMemo(() => filterIngredients('main'), [ingredients.ingredients]);

    const tabClick = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    if (!ingredients?.ingredients) {
        return null; 
    }

    return (
        <section className={styles.section}>
            <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
            <div className={`${styles['burger-menu']} pb-10`}>
                <Tab value='bun' active={current === 'bun'} onClick={() => {
                    tabClick('bun');
                }}>
                    Булки
                </Tab>
                <Tab value='sauce' active={current === 'sauce'} onClick={() => {
                    tabClick('sauce');
                }}>
                    Соусы
                </Tab>
                <Tab value='main' active={current === 'main'} onClick={() => {
                    tabClick('main');
                }}>
                    Начинки
                </Tab>
            </div>

            <div className={`${styles['burger-card']} custom-scroll`}>
                <IngredientCards title='Булки'
                    id='bun'
                    cardsArr={bunArray}
                    ref={bunRef} />
                <IngredientCards title='Соусы'
                    id='sauce'
                    cardsArr={sauceArray}
                    ref={sauceRef} />
                <IngredientCards title='Начинки'
                    id='main'
                    cardsArr={mainArray}
                    ref={mainRef} />
            </div>
        </section> 
    );
};


export default BurgerIngredients;