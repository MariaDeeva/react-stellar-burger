export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";


export const getIngredients = () => { // Экшен для начала загрузки
    return {
      type: "GET_INGREDIENTS_REQUEST"
    }
  };
  
  export const getIngredientsSuccess = (ingredients) => { // Экшен для успешной загрузки
    return {
      type: "GET_INGREDIENTS_SUCCESS",
      payload: ingredients
    }
  };
  