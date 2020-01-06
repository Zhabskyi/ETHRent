import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import classes from "./Items.module.scss";
import ItemContext from "../../context/Item/ItemContext";
import Item from "./item/Item";
import Spinner from "../spinner/Spinner";

const Items = () => {
  const itemContext = useContext(ItemContext);

  const { items, getItems, loading } = itemContext;

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {items !== null && !loading ? (
        <>
          {items.map(item => (
            <Item key={item.id} item={item} />
          ))}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default withRouter(Items);
