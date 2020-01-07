import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import classes from "./Item.module.scss";

import Button from "../../button/Button";
import Modal from "../../modal/Modal";
import FormAddItem from "../../form/FormAddItem";
import AuthContext from "../../../context/auth/authContext";
import ItemContext from "../../../context/Item/ItemContext";
import BlockchainContext from "../../../context/blockchain/blockchainContext";

const Item = props => {
  const authContext = useContext(AuthContext);
  const itemContext = useContext(ItemContext);
  const blockchainContext = useContext(BlockchainContext);

  const { user } = authContext;
  const { deleteItem } = itemContext;
  const {
    id,
    user_id,
    title,
    description,
    category,
    daily_rate,
    deposit,
    photo
  } = props.item;
  const { rentProduct, returnProduct, products, account } = blockchainContext;

  const [showItemModal, setItem] = useState(false);
  const [showFormModal, setForm] = useState(false);

  const deleteHandler = () => {
    deleteItem(id, user_id);
  };

  const toggleItemDetails = () => {
    setItem(!showItemModal);
  };

  const toggleFormDetails = () => {
    setForm(!showFormModal);
  };

  const registered = (
    <>
      <Button onClick={toggleItemDetails} details>
        Details
      </Button>
      <Button onClick={deleteHandler} danger>
        Delete
      </Button>
      <Button onClick={toggleFormDetails} confirm>
        Edit
      </Button>
    </>
  );

  const unregistered = (
    <>
      <Button onClick={toggleItemDetails} details>
        Details
      </Button>
      <Button
        onClick={() => {
          rentProduct(id);
        }}
        details
      >
        Rent
      </Button>
    </>
  );

  const rented = (
    <>
      <h3>Currently Rented</h3>
      {account === products[id - 1]?.owner ? (
        <Button onClick={() => returnProduct(id)} details>
          Return
        </Button>
      ) : null}
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
        <p>Deposit: {deposit}</p>
        <p>Category: {category}</p>
        <div>
          {products[id - 1]?.rented
            ? rented
            : user !== null
            ? user.id === user_id
              ? registered
              : unregistered
            : unregistered}
        </div>
      </div>
      <Modal show={showItemModal} onClose={toggleItemDetails}>
        <div>
          <p className={classes.title}>{title}</p>
          <div className={classes.photo}>
            <img src={photo} alt='item' />
          </div>
          <p>Description: {description}</p>
          <p>Daily Rate: {daily_rate}</p>
          <p>Deposit: {deposit}</p>
          <div>
            {/* new 2020 feature with ?. operator */}
            <img src={user?.map} alt='map' />
          </div>
        </div>
      </Modal>
      <Modal show={showFormModal} onClose={toggleFormDetails}>
        <FormAddItem
          toggleFormDetails={toggleFormDetails}
          id={id}
          user_id={user_id}
          title={title}
          description={description}
          daily_rate={daily_rate}
          deposit={deposit}
        />
      </Modal>
    </>
  );
};

export default withRouter(Item);
