import React, { useContext, useEffect } from "react";
import classes from "./Item.module.scss";

import Button from "../../button/Button";
import AuthContext from "../../../context/auth/authContext";
import ItemContext from "../../../context/Item/ItemContext";

const Item = ({ item }) => {
  const authContext = useContext(AuthContext);
  const itemContext = useContext(ItemContext);

  const { user } = authContext;
  const { deleteItem } = itemContext;
  const { id, user_id, title, daily_rate, deposit, photo } = item;

  const deleteHandeler = () => {
    deleteItem(id);
  };


  const registered = (
    <>
      <Button details>Details</Button>
      <Button onClick={deleteHandeler} danger>
        Delete
      </Button>
      <Button confirm>Edit</Button>
    </>
  );

  const unregistered = (
    <>
      <Button details>Details</Button>
    </>
  );
  return (
    <div className={classes.container}>
      <p className={classes.title}>{title}</p>
      <div className={classes.photo}>
        <img src={photo} alt='item' />
      </div>
      <p>Daily Rate: {daily_rate}</p>
      <div>
        {user !== null
          ? user.id === user_id
            ? registered
            : unregistered
          : unregistered}
      </div>
    </div>
  );
};

export default Item;
