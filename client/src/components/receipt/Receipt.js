import React, { useContext } from "react";
import Web3 from "web3";
import classes from "./Receipt.module.scss";
import Button from "../button/Button";
import Modal from "../modal/Modal";

import BlockchainContext from "../../context/blockchain/blockchainContext";

const Receipt = () => {
  const blockchainContext = useContext(BlockchainContext);

  const { showReceiptModal, toggleReceiptDetails, receipt } = blockchainContext;

  return (
    <>
      {receipt !== null ? (
        <Modal show={showReceiptModal} onClose={toggleReceiptDetails}>
          <div className={classes.container}>
            <div className={classes.receipt}>
              <h4 className={classes.receipt_title}>{receipt.name}</h4>
              <p>Congratulations on your renting your item!</p>
              <p>The final transaction details are below:</p>
              <h5 className={classes.receipt_heading}>Days Rented</h5>
              <p>{receipt.rentalDays}</p>
              <h5 className={classes.receipt_heading}>Total Rental Fees</h5>
              <p>{Web3.utils.fromWei(receipt.rentalCost, "Ether")} ETH</p>
              <h5 className={classes.receipt_heading}>Returned Deposit</h5>
              <p>{Web3.utils.fromWei(receipt.returnedDeposit, "Ether")} ETH</p>
            </div>
            <Button onClick={toggleReceiptDetails} details_lg>
              Close
            </Button>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Receipt;
