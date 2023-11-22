import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredientsFetch";
import { constructorReducer } from './burgerConstructor';
import { ingredientDetailReducer } from './ingredientDetails';

export default combineReducers({

  ingredientsReducer,
  constructorReducer,
  ingredientDetailReducer
});