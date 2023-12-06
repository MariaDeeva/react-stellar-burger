import {
    ADD_INGREDIENT, 
    DELETE_CONSTRUCTOR,
    REORDER_CONSTRUCTOR, 
    RESET_CONSTRUCTOR
} from '../actions/burgerConstructor';


const initialState = {
    bun: false,
    ingredients: [],
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            if (action.payload.type === 'bun') {
                return {
                    ...state,
                    bun: action.payload
                };
            }
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case DELETE_CONSTRUCTOR:
            return {
                ...state,
                ingredients: state.ingredients.filter((item) => item.key !== action.payload)
            };
        case RESET_CONSTRUCTOR:
            return {
                bun: false,
                ingredients: []
            };
        case REORDER_CONSTRUCTOR:
            const dragIndex = action.dragIndex;
            const hoverIndex = action.hoverIndex;
            const ingredients = [...state.ingredients];
            const draggedIngredient = ingredients[dragIndex];
            ingredients.splice(dragIndex, 1);
            ingredients.splice(hoverIndex, 0, draggedIngredient);
            return {
                ...state,
                ingredients: ingredients
            };
        default:
            return state;
    }
};