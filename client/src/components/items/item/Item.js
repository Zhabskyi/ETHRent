import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faInfoCircle,
  faEdit
} from "@fortawesome/free-solid-svg-icons";

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
  const { deleteItem, getUserItemDetails, contacts } = itemContext;
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
  const [showContact, setContacts] = useState(false);

  const deleteHandler = () => {
    deleteItem(id, user_id);
  };

  const toggleItemDetails = () => {
    getUserItemDetails(user_id);
    setItem(!showItemModal);
  };

  const toggleFormDetails = () => {
    setForm(!showFormModal);
  };

  const showContacts = () => {
    setContacts(!showContact);
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
      <div className={classes.container}>
        <p className={classes.title}>{title}</p>
        <div className={classes.photo}>
          <img src={photo} alt='item' className={classes.photo} />
        </div>

        <div className={classes.container_info}>
          <div>
            <div className={classes.container_info_row}>
              <h6 className={classes.container_info_row_heading}>Daily Rate</h6>
              <p>{daily_rate} ETH</p>
            </div>
            <div className={classes.container_info_row}>
              <h6 className={classes.container_info_row_heading}>Deposit</h6>
              <p>{deposit} ETH</p>
            </div>
            <div className={classes.container_info_row}>
              <h6 className={classes.container_info_row_heading}>Category</h6>
              <p>{category}</p>
            </div>
          </div>

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
      </Modal>

      <Modal show={showFormModal} onClose={toggleFormDetails} editClose edit>
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
