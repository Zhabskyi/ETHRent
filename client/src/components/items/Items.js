import React, { useContext } from "react";
import classes from "./Items.module.scss";
import ItemContext from "../../context/Item/ItemContext";
import Item from "./item/Item";

const Items = () => {
  const itemContext = useContext(ItemContext);

  const { items } = itemContext;

  return (
    <>
      {items.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </>
  );
};

export default Items;
