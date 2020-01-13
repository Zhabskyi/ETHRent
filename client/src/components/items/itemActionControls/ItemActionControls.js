import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faInfoCircle,
  faEdit
} from "@fortawesome/free-solid-svg-icons";

import classes from "../item/Item.module.scss";
import Button from "../../button/Button";

const ItemActionControls = props => {
  const {
    id,
    user_id,
    user,
    toggleItemDetails,
    toggleFormDetails,
    deleteItem,
    account,
    products,
    returnProduct
  } = props;

  const deleteHandler = () => {
    deleteItem(id, user_id);
  };

  const registered = (
    <div className={classes.controls}>
      <Button onClick={toggleItemDetails} details>
        <FontAwesomeIcon icon={faInfoCircle} />
      </Button>
      <Button onClick={deleteHandler} danger>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <Button onClick={toggleFormDetails} edit>
        <FontAwesomeIcon icon={faEdit} />
      </Button>
    </div>
  );

  const unregistered = (
    <div className={classes.controls}>
      <Button onClick={toggleItemDetails} details>
        <FontAwesomeIcon icon={faInfoCircle} />
      </Button>
    </div>
  );

  const rented = (
    <div className={classes.container_rented}>
      <h6 className={classes.container_rented_heading}>Currently Rented</h6>
      {account === products[id - 1]?.owner ? (
        <Button onClick={() => returnProduct(id)} details_lg>
          Return
        </Button>
      ) : null}
    </div>
  );

  return (
    <>
      {products[id - 1]?.rented
        ? rented
        : user !== null
        ? user.id === user_id && account === products[id - 1]?.owner
          ? registered
          : unregistered
        : unregistered}
    </>
  );
};

export default ItemActionControls;
