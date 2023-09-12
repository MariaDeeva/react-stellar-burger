import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import React, { useEffect, useState } from "react";


function App() {
  const [data, setData] = useState([]);

  const BaseURL = 'https://norma.nomoreparties.space/api/ingredients ';

  useEffect(() => {
    fetch(BaseURL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [BaseURL]);


  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles['app-body']}>
        <BurgerIngredients ingredients = {data}/>
        <BurgerConstructor burgerArr={data} />
      </main>
    </div>

  );
}

export default App;
