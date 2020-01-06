import React, { useReducer } from "react";
// import axios from "../../utils/axios-instance";
import axios from "axios";
import ItemContext from "./ItemContext";
import itemReducer from "./itemReducer";

import {
  GET_ITEMS,
  ADD_ITEM,
  EDIT_ITEM,
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
      const res = await axios.get("http://localhost:8001/api/items");

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
  const addItem =  async (item) => {

    try {
      const res =  await axios.post("http://localhost:8001/api/items", item);
      // const userID = Number(res.data.user_id);
      // const data = {...res.data, user_id: userID}
      console.log(res.data)

      dispatch({
        type: ADD_ITEM,
        payload: res.data
      });
      getMyItems(res.data.user_id);
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response
      });
    }
  };

  //Edit Item
  const editItem = async (id, item) => {
    try {
      const res = await axios.put(`http://localhost:8001/api/items/${id}`, item);
      console.log(res)

      dispatch({
        type: EDIT_ITEM,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response
      });
    }
  };

  //Delete Item
  const deleteItem = async (id, user_id) => {
    try {
      const res = await axios.delete(`http://localhost:8001/api/items/delete/${id}`);

      dispatch({
        type: DELETE_ITEM,
        payload: id
      });

      if (res.status === 200) {
        getMyItems(user_id);
      }
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
        editItem,
        deleteItem
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemState;
