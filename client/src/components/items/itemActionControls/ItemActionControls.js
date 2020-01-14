import React from "react";
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
    account,
    products,
    returnProduct,
    toggleConfirmDelete
  } = props;

  const daysRented = function(id) {
    const endDate = Date.now() / 1000; // JS is in milliseconds
    let rentalDays =
      (Math.trunc(endDate) - props.products[id - 1].rentalStart) / 86400;
    if (rentalDays < 1) {
      rentalDays = 'less than 1 day'
    } else if (Math.floor(rentalDays) === 1) {
      rentalDays = '1 day'
    } else {
      rentalDays = `${Math.floor(rentalDays)} days`
    }
    return rentalDays
  }

  const registered = (
    <div className={classes.controls}>
      <Button onClick={toggleItemDetails} details>
        <FontAwesomeIcon icon={faInfoCircle} />
      </Button>
      <Button onClick={toggleConfirmDelete} danger>
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
        <>
          <span className={classes.container_rented_heading_days}>for {daysRented(id)}</span>
          <Button onClick={() => returnProduct(id)} details_lg>
            Return
          </Button>
        </>
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
