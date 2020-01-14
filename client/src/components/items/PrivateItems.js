import React, { useContext, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import classes from "./Items.module.scss";
import ItemContext from "../../context/Item/ItemContext";
import AuthContext from "../../context/auth/authContext";
import Item from "./item/Item";
import Spinner from "../spinner/Spinner";
import Receipt from "../receipt/Receipt";

const PrivateItems = () => {
  const itemContext = useContext(ItemContext);
  const authContext = useContext(AuthContext);

  const { user } = authContext;
  const { items, myItems, getMyItems, getItems, loading } = itemContext;

  useEffect(() => {
    if(items === null) {
      getItems()
    }
    if (user && items) {
      getMyItems(user.id);
    }
    // eslint-disable-next-line
  }, [user, items]);


  return (
    <div className={classes.container}>
      {myItems !== null && !loading ? (
        <>
          {myItems.map(item => (
            <Item key={item.id} item={item}/>
          ))}
        </>
      ) : (
        <Spinner />
      )}
      <Receipt />
    </div>
  );
};

export default withRouter(PrivateItems);
