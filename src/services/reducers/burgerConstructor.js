import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS } from '../actions/burgerConstructor';

const initialState = {
  ingredients: [],
  totalPrice: 0,
};

export function constructorReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_INGREDIENT: 
      const addedIngredient = action.payload;
      return { 
          ...state, 
          ingredients: [...state.ingredients, addedIngredient],
          // Здесь предполагается, что цена будет храниться в поле 'price'
          totalPrice: state.totalPrice + addedIngredient.price 
      };
      
    case REMOVE_INGREDIENT:
      const removedIngredients = [...state.ingredients];
      const removedIngredient = removedIngredients.splice(action.payload, 1)[0];
      return { 
          ...state, 
          ingredients: removedIngredients,
          totalPrice: state.totalPrice - removedIngredient.price
      };
      
    case SET_INGREDIENTS:
      const totalPrice = action.payload.reduce((acc, ingredient) => acc + ingredient.price, 0);
      return { 
          ...state, 
          ingredients: action.payload,
          totalPrice
      };
    default: 
      return state;
  }
}
