import React, { useContext } from "react";
import classes from "./Item.module.scss";

import Button from "../../button/Button";
import AuthContext from "../../../context/auth/authContext";

const Item = ({ item }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const { user_id, title, daily_rate, deposit, photo } = item;

  const registered = (
    <>
      <Button details>Details</Button>
      <Button danger>Delete</Button>
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
