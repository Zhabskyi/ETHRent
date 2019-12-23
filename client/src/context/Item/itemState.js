import React, { useReducer } from "react";
import ItemContext from "./ItemContext";
import itemReducer from "./itemReducer";
import { ADD_ITEM, DELETE_ITEM } from "../actionTypes";

const ItemState = props => {
  const initialState = {
    items: [
      {
        id: 1,
        title: "SnowBlower",
        description: "hight eficiency machine to help you clean snow",
        dailyRate: 0.2,
        deposit: 3,
        photo:
          "https://images.unsplash.com/photo-1576029765637-2931132ba2d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
      },
      {
        id: 2,
        title: "Hammer",
        description: "Havy-duty hammer to help you work done",
        dailyRate: 0.1,
        deposit: 2,
        photo:
          "https://images.unsplash.com/photo-1566937169390-7be4c63b8a0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 3,
        title: "Drill",
        description: "Power drill can make a hole in anything",
        dailyRate: 0.4,
        deposit: 5,
        photo:
          "https://images.unsplash.com/photo-1551631880-e807a4453bc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
      }
    ]
  };

  const [state, dispatch] = useReducer(itemReducer, initialState);

  //Add Item

  //Delete Item

  return (
    <ItemContext.Provider 
    value={{
      items: state.items
    }}>
      {props.children}
    </ItemContext.Provider>
  )
};

export default ItemState;