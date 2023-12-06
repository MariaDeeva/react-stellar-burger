import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsFetch';
import { constructorReducer } from './burgerConstructor';
import { ingredientDetailReducer } from './ingredientDetails';
import { orderDetailsReducer } from './orderDetails';


export default combineReducers({
  ingredientsReducer,
  constructorReducer,
  ingredientDetailReducer, 
  orderDetailsReducer,
});