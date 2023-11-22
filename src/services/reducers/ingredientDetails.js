import {
    ADD_SELECTED_INGREDIENT,
    REMOVE_SELECTED_INGREDIENT
} from '../actions/ingredientDetails';

const initialState = {
    selectedIngredient: null,
};

export function ingredientDetailReducer (state = initialState, action) {
    switch (action.type) {
        case ADD_SELECTED_INGREDIENT: {
            return { ...state, selectedIngredient: action.payload };
        }
        case REMOVE_SELECTED_INGREDIENT: {
            return { ...state, selectedIngredient: null };
        }
        // other handlers...
        default: {
            return state;
        }
    }
}
