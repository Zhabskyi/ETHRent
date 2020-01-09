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
  GET_MY_ITEMS,
  GET_USER_CONTACTS,
  GET_POSTAL_ITEMS
} from "../actionTypes";

const ItemState = props => {
  const initialState = {
    items: null,
    myItems: null,
    loading: true,
    showModal: false,
    contacts: null,
    itemsByPostal: null
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

  const getUserItemDetails = async id => {
    try {
      const res = await axios.get(`http://localhost:8001/api/items/${id}`);
      dispatch({
        type: GET_USER_CONTACTS,
        payload: res.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Add Item
  const addItem = async item => {
    try {
      const res = await axios.post("http://localhost:8001/api/items", item);

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
      const res = await axios.put(
        `http://localhost:8001/api/items/${id}`,
        item
      );

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
      const res = await axios.delete(
        `http://localhost:8001/api/items/delete/${id}`
      );

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

  const getUserByPostal = async (postalCode) => {
    try {
      const res = await axios.get(
        `http://localhost:8001/api/users/postal/${postalCode}`
      );
      console.log('res.data', res.data) //user ids
      console.log('state.items', state.items) // all items
      const result = null
      dispatch({
        type: GET_POSTAL_ITEMS,
        payload: result
      })

    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response
      });
    }
  };

  return (
    <ItemContext.Provider
      value={{
        items: state.items,
        myItems: state.myItems,
        loading: state.loading,
        contacts: state.contacts,
        getItems,
        getMyItems,
        addItem,
        editItem,
        deleteItem,
        getUserItemDetails,
        getUserByPostal
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemState;
