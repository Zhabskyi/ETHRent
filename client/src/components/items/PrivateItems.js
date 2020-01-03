import React, { useContext, useEffect } from "react";
import classes from "./Items.module.scss";
import ItemContext from "../../context/Item/ItemContext";
import AuthContext from "../../context/auth/authContext";
import Item from "./item/Item";
import Spinner from "../spinner/Spinner";

const Items = () => {
  const itemContext = useContext(ItemContext);
  const authContext = useContext(AuthContext);

  const { user } = authContext;
  const { items, myItems, getMyItems, getItems, loading } = itemContext;

  useEffect(() => {
    getItems();
    if (user && items) {
      getMyItems(user.id);
    }

    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      {myItems !== null && !loading ? (
        <>
          {myItems.map(item => (
            <Item key={item.id} item={item} />
          ))}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Items;
