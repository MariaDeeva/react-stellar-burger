export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';

export function addIngredient(ingredient) {
  return { type: ADD_INGREDIENT, payload: ingredient };
}

export function removeIngredient(index) {
  return { type: REMOVE_INGREDIENT, payload: index };
}

export function setIngredients(ingredients) {
  return { type: SET_INGREDIENTS, payload: ingredients };
}