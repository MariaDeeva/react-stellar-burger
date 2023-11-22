import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS
} from '../actions/ingredientsFetch';

const initialState = {loading: false, ingredients: []}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return { ...state, loading: true }
    case GET_INGREDIENTS_SUCCESS:
      return { loading: false, ingredients: action.payload }
    default:
      return state;
  }
};
