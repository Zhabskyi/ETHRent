import { ADD_ITEM, DELETE_ITEM, ITEM_ERROR, GET_ITEMS, GET_MY_ITEMS } from "../actionTypes";

export default (state, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case GET_MY_ITEMS:
      return {
        ...state,
        myItems: action.payload
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        loading: false
      };
    case ITEM_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
