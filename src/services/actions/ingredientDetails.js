export const ADD_SELECTED_INGREDIENT = 'ADD_SELECTED_INGREDIENT';
export const REMOVE_SELECTED_INGREDIENT = 'REMOVE_SELECTED_INGREDIENT';

export function addSelectedIngredient(ingredient) {
    return {
        type: ADD_SELECTED_INGREDIENT,
        payload: ingredient
    };
}

export function removeSelectedIngredient() {
    return {
        type: REMOVE_SELECTED_INGREDIENT,
    };
}