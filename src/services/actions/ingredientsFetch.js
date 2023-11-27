export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';


export const getIngredients = () => { // Экшен для начала загрузки
    return {
      type: 'FETCH_INGREDIENTS_REQUEST'
    }
  };
  
  export const getIngredientsSuccess = (ingredients) => { // Экшен для успешной загрузки
    return {
      type: 'FETCH_INGREDIENTS_SUCCESS',
      payload: ingredients
    }
  };
