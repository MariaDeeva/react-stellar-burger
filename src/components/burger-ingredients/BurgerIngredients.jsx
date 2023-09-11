import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientCards from './ingredient-cards/ingredient-cards';



function BurgerIngredients({data}) {

    const [current, setCurrent] = useState('bun');

    const filterDataByType = (type) => data.filter((el) => el.type === type);

    return (
        <section className={styles.section}>
            <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
            <div className={`${styles['burger-menu']} pb-10`}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <div className={`${styles['burger-card']} custom-scroll`}>
                <IngredientCards title="Булки" cardsArr={filterDataByType('bun')} />
                <IngredientCards title="Соусы" cardsArr={filterDataByType('sauce')} />
                <IngredientCards title="Начинки" cardsArr={filterDataByType('main')} />
            </div>
        </section>
    );
};


export default BurgerIngredients;