import React, { useState } from "react";

import classes from "../item/Item.module.scss";

import Button from "../../button/Button";

const ItemDetails = props => {
  const { user, contacts, account, products, rentProduct } = props;

  const {
    id,
    user_id,
    title,
    description,
    daily_rate,
    deposit,
    photo
  } = props.item;

  const [showContact, setContacts] = useState(false);

  const showContacts = () => {
    setContacts(!showContact);
  };

  return (
    <div className={classes.details}>
      <div className={classes.details_container}>
        <h4 className={classes.details_container_title}>{title}</h4>
        <h5 className={classes.details_container_heading}>Description</h5>
        <p>{description}</p>
        <h5 className={classes.details_container_heading}>Daily Rate</h5>
        <p>{daily_rate} ETH</p>
        <h5 className={classes.details_container_heading}>Deposit</h5>
        <p>{deposit} ETH</p>
      </div>
      <div className={classes.details_images}>
        <div className={classes.photo_modal}>
          <img src={photo} alt='item' className={classes.photo_modal} />
        </div>
        <div>
          <img
            src={contacts?.map}
            alt='map'
            className={classes.details_images_map}
          />
        </div>
      </div>
      <div className={classes.actions}>
        {showContact && user?.id !== user_id ? (
          <>
            <div>Phone number: {contacts?.phone_number}</div>
            <div>Email: {contacts?.email}</div>
            {account !== products[id - 1]?.owner ? (
              <Button onClick={() => rentProduct(id)} details_lg>
                Rent
              </Button>
            ) : null}
          </>
        ) : showContact ? (
          <>
            <div>Phone number: {contacts?.phone_number}</div>
            <div>Email: {contacts?.email}</div>
          </>
        ) : (
          <Button onClick={showContacts} details_lg>
            Contact info
          </Button>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
