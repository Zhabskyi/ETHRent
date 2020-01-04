import React, { useContext, useState } from "react";
import classes from "./Item.module.scss";

import Button from "../../button/Button";
import Modal from "../../modal/Modal";
import AuthContext from "../../../context/auth/authContext";
import ItemContext from "../../../context/Item/ItemContext";

const Item = ({ item }) => {
  const authContext = useContext(AuthContext);
  const itemContext = useContext(ItemContext);

  const { user, map } = authContext;
  const { deleteItem } = itemContext;
  const { id, user_id, title, daily_rate, deposit, photo } = item;

  const [showModal, setState] = useState(false);

  const deleteHandeler = () => {
    deleteItem(id, user_id);
  };

  const toggleDetails = () => {
    setState(!showModal);
  };

  const registered = (
    <>
      <Button onClick={toggleDetails} details>
        Details
      </Button>
      <Button onClick={deleteHandeler} danger>
        Delete
      </Button>
      <Button confirm>Edit</Button>
    </>
  );

  const unregistered = (
    <>
      <Button onClick={toggleDetails} details>
        Details
      </Button>
    </>
  );
  return (
    <>
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
      <Modal show={showModal} onClose={toggleDetails}>
        <div>
          <p className={classes.title}>{title}</p>
          <div className={classes.photo}>
            <img src={photo} alt='item' />
          </div>
          <p>Daily Rate: {daily_rate}</p>
          <p>Deposit: {deposit}</p>
          <div >
            <img src={map} alt='map' />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Item;
