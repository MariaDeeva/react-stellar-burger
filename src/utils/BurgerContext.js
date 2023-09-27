import { createContext } from "react";

const BurgerContext = createContext({
    burgerArr: [],
    setBurgerArr: () => {}, 
    handleBurgerClick: () => {},
});
export default BurgerContext;