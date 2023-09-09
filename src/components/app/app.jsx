import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

function App() {

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles['app-body']}>
        <BurgerIngredients />
        <BurgerConstructor burgerArr={data} />
      </main>
    </div>

  );
}

export default App;
