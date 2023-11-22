import {
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS
} from '../actions/ingredientsFetch';

const initialState = {loading: false, ingredients: []}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS_REQUEST:
      return { ...state, loading: true }
    case FETCH_INGREDIENTS_SUCCESS:
      return { loading: false, ingredients: action.payload }
    default:
      return state;
  }
};
