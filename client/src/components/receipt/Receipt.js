import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";

import classes from "./Receipt.module.scss";

import Button from "../button/Button";
import Modal from "../modal/Modal";

import BlockchainContext from "../../context/blockchain/blockchainContext";

const Receipt = props => {
  const blockchainContext = useContext(BlockchainContext);

  const {
    rentProduct,
    returnProduct,
    products,
    account,
    showReceiptModal,
    toggleReceiptDetails,
    receipt,
  } = blockchainContext;

  return (
    <>
      {receipt !== null ? 
      <Modal show={showReceiptModal} onClose={toggleReceiptDetails}>
        <div className={classes.details}>
          <div className={classes.details_container}>
            <h4 className={classes.details_container_title}>{receipt.name}</h4>
            <h5 className={classes.details_container_heading}>Total Rental Fees</h5>
            <p>{receipt.rentalCost} ETH</p>
            <h5 className={classes.details_container_heading}>Returned Deposit</h5>
            <p>{receipt.returnedDeposit} ETH</p>
          </div>
          <Button onClick={toggleReceiptDetails} details_lg>
            Close
          </Button>
        </div>
      </Modal>
      : null}
    </>
  );
};

export default Receipt;
