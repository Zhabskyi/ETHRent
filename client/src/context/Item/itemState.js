import React, { useReducer } from "react";
import axios from "../../utils/axios-instance";
import ItemContext from "./ItemContext";
import itemReducer from "./itemReducer";

import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEM_ERROR,
  GET_MY_ITEMS
} from "../actionTypes";

const ItemState = props => {
  const initialState = {
    items: null,
    myItems: null,
    loading: true,
    showModal: false
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
        payload: err.response
      });
    }
  };

  const getMyItems = id => {
    const myItems = state.items.filter(item => item.user_id === id);

    dispatch({
      type: GET_MY_ITEMS,
      payload: Object.values(myItems)
    });
  };

  //Add Item
  const addItem = async item => {
    try {
      const res = await axios.post("/items", item);

      dispatch({
        type: ADD_ITEM,
        payload: res.item
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response
      });
    }
  };

  //Delete Item
  const deleteItem = async id => {
    
    try {
      await axios.delete(`/items/delete/${id}`);

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
        myItems: state.myItems,
        loading: state.loading,
        getItems,
        getMyItems,
        addItem,
        deleteItem
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemState;
