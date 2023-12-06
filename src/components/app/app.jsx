import styles from './app.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import React, { useEffect, useState } from 'react';
import { getIngredients, getIngredientsSuccess } from '../../services/actions/ingredientsFetch';
import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { API_URL } from '../../utils/api';

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    fetch(`${API_URL}/ingredients`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        dispatch(getIngredientsSuccess(data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [`${API_URL}/ingredients`, dispatch]);


  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles['app-body']}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>

  );
}

export default App;
