import {
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  ITEM_ERROR,
  GET_ITEMS,
  GET_MY_ITEMS,
  GET_USER_CONTACTS,
  GET_POSTAL_ITEMS
} from "../actionTypes";

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
        myItems: action.payload,
        loading: false
      };
      case GET_USER_CONTACTS:
        return {
          ...state,
          contacts: action.payload,
          loading: false
        };
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload ],
        loading: false
      };
    case EDIT_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === Number(action.payload.id) ? action.payload : item
        ),
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        loading: false
      };
    case ITEM_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case GET_POSTAL_ITEMS:
      return {
        ...state,
        itemsByPostal: action.payload
      };
    default:
      return state;
  }
};
