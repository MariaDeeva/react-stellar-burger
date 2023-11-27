import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS } from '../actions/burgerConstructor';

const initialState = {
  ingredients: [],
};

export function constructorReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_INGREDIENT: 
      const addedIngredient = action.payload;
      
      return { 
          ...state, 
          ingredients: [...state.ingredients, addedIngredient],
       
      };
      
    case REMOVE_INGREDIENT:
      const removedIngredients = [...state.ingredients];
      const removedIngredient = removedIngredients.splice(action.payload, 1)[0];
      return { 
          ...state, 
          ingredients: removedIngredients,
        
      };
      
    case SET_INGREDIENTS:
    
      return { 
          ...state, 
          ingredients: action.payload,
      
      };
    default: 
      return state;
  }
}
