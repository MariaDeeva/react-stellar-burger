import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientCards from './ingredient-cards/ingredient-cards';
import { data } from '../../utils/data';


function BurgerIngredients() {
    const [current, setCurrent] = useState('bun')

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
                <IngredientCards title="Булки"
                    cardsArr={data.filter((el) => {
                        return el.type === "bun";
                    })} />
                <IngredientCards title="Соусы"
                    cardsArr={data.filter((el) => {
                        return el.type === "sauce";
                    })} />
                <IngredientCards title="Начинки"
                    cardsArr={data.filter((el) => {
                        return el.type === "main";
                    })} />
            </div>
        </section>
    );
};


export default BurgerIngredients;