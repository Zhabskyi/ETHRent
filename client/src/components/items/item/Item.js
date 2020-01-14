import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import classes from "./Item.module.scss";
import Modal from "../../modal/Modal";
import FormAddItem from "../../form/FormAddItem";
import ItemDetails from "../itemDetails/ItemDetails";
import ItemActionControls from "../itemActionControls/ItemActionControls";
import Button from "../../button/Button";
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
  const [showDeleteConfirm, setConfirm] = useState(false);

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

  const toggleConfirmDelete = () => {
    setConfirm(!showDeleteConfirm);
  };

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
          <ItemActionControls
            id={id}
            user_id={user_id}
            user={user}
            toggleItemDetails={toggleItemDetails}
            toggleFormDetails={toggleFormDetails}
            deleteItem={deleteItem}
            account={account}
            products={products}
            returnProduct={returnProduct}
            toggleConfirmDelete={toggleConfirmDelete}
          />
        </div>
      </div>
      <Modal show={showItemModal} onClose={toggleItemDetails}>
        <ItemDetails
          item={props.item}
          user={user}
          contacts={contacts}
          account={account}
          products={products}
          rentProduct={rentProduct}
        />
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
      <Modal show={showDeleteConfirm} onClose={toggleConfirmDelete}>
        <div>
          <div>Are you sure that want to delete the item?</div>
          <Button onClick={toggleConfirmDelete} cancel>
            Cancel
          </Button>
          <Button onClick={deleteHandler} confirm>
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default withRouter(Item);
