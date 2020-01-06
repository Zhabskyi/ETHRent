import {
  SET_LOADING,
  SET_ACCOUNT,
  SET_MARKETPLACE,
  SET_PRODUCTCOUNT,
  ADD_PRODUCT,
  CANCEL_LOADING
} from "../actionTypes";

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case CANCEL_LOADING:
      return {
        ...state,
        loading: false
      };
    case SET_ACCOUNT:
      return {
        ...state,
        account: action.payload
      };
    case SET_MARKETPLACE:
      return {
        ...state,
        marketplace: action.payload
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false
      };
    case SET_PRODUCTCOUNT:
      return {
        ...state,
        productCount: action.payload
      };
    default:
      return state;
  }
};
