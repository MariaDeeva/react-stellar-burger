import styles from "./app.module.css";
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import React, { useEffect, useState} from "react";
import BurgerContext from '../../utils/BurgerContext';

function App() {
  const [data, setData] = useState([]);
  const [burgerArr, setBurgerArr] = useState([]);
  const IngredientURL = 'https://norma.nomoreparties.space/api/ingredients';

  useEffect(() => {
    fetch(IngredientURL)
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
  }, [IngredientURL]);


  const handleBurgerClick = (element) => {
    setBurgerArr((prevState) => [...prevState, element]);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles['app-body']}>
        <BurgerContext.Provider value={{ burgerArr, setBurgerArr, handleBurgerClick }}>
          <BurgerIngredients ingredients={data} />
          <BurgerConstructor />
        </BurgerContext.Provider>
      </main>
    </div>

  );
}

export default App;
