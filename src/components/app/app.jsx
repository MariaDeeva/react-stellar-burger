import styles from "./app.module.css";
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import React, { useEffect, useState} from "react";
import BurgerContext from '../../utils/BurgerContext';
import { getIngredients, getIngredientsSuccess } from '../../services/actions/ingredientsFetch';
import { useDispatch } from "react-redux";

function App() {
  const IngredientURL = 'https://norma.nomoreparties.space/api/ingredients';
  const [burgerArr, setBurgerArr] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
    fetch(IngredientURL)
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
  }, [IngredientURL, dispatch]);

  const handleBurgerClick = (element) => {
    setBurgerArr((prevState) => [...prevState, element]);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles['app-body']}>
        <BurgerContext.Provider value={{ burgerArr, setBurgerArr, handleBurgerClick }}>
          <BurgerIngredients />
          <BurgerConstructor />
        </BurgerContext.Provider>
      </main>
    </div>

  );
}

export default App;
