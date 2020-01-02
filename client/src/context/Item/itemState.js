import React, { useReducer } from "react";
import axios from "../../utils/axios-instance";
import ItemContext from "./ItemContext";
import itemReducer from "./itemReducer";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEM_ERROR } from "../actionTypes";

const ItemState = props => {
  const initialState = {
    items: null,
    isNewItem: false,
    loading: true
  };

  const [state, dispatch] = useReducer(itemReducer, initialState);

  // Get Items
  const getItems = async () => {
    try {
      const res = await axios.get("/items");

      dispatch({
        type: GET_ITEMS,
        payload: Object.values(res.data)
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  //Add Item
  const addItem = async item => {

    try {
       const res = await axios.post('/items', item );

      dispatch({
        type: ADD_ITEM,
        payload: res.item
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  //Delete Item
  const deleteItem = async id => {
    try {
      //await axios.delete(`/api/contacts/${id}`);

      dispatch({
        type: DELETE_ITEM,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  return (
    <ItemContext.Provider
      value={{
        items: state.items,
        isNewItem: state.isNewItem,
        loading: state.loading,
        getItems,
        addItem,
        deleteItem
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemState;
