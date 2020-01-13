import React, { useReducer } from "react";

import BlockchainContext from "./blockchainContext";
import blockchainReducer from "./blockchainReducer";

import {
  SET_LOADING,
  SET_ACCOUNT,
  SET_MARKETPLACE,
  SET_PRODUCTCOUNT,
  ADD_PRODUCT,
  CANCEL_LOADING,
  RENT_PRODUCT,
  TOGGLE_RECEIPT,
  SET_RECEIPT
} from "../actionTypes";

const BlockchainState = props => {
  const initialState = {
    account: "",
    productCount: 0,
    products: [],
    loading: true,
    marketplace: null,
    showReceiptModal: false,
    receipt: null,
  };

  const [state, dispatch] = useReducer(blockchainReducer, initialState);

  const setAccount = account => {
    dispatch({
      type: SET_ACCOUNT,
      payload: account
    });
  };

  const setMarketplace = marketplace => {
    dispatch({
      type: SET_MARKETPLACE,
      payload: marketplace
    });
  };

  const setProductCount = productCount => {
    dispatch({
      type: SET_PRODUCTCOUNT,
      payload: productCount
    });
  };

  const addProduct = product => {
    dispatch({
      type: ADD_PRODUCT,
      payload: product
    });
  };

  const startLoading = () => {
    dispatch({
      type: SET_LOADING
    });
  };

  const cancelLoading = () => {
    dispatch({
      type: CANCEL_LOADING
    });
  };

  const toggleReceiptDetails = () => {
    dispatch({
      type: TOGGLE_RECEIPT
    });
  };

  const setReceiptDetails = (receipt) => {
    dispatch({
      type: SET_RECEIPT,
      payload: receipt
    })
  }

  const handleRentState = (status, changedID) => {
    const rentItem = { ...state.products[changedID], rented: !status };
    let replacedProducts = state.products;
    replacedProducts.splice(changedID, 1, rentItem);
    dispatch({
      type: RENT_PRODUCT,
      payload: replacedProducts
    });
  };

  const createProduct = (name, description, category, deposit, daily_rate) => {
    startLoading();
    state.marketplace.methods
      .createProduct(name, description, category, deposit, daily_rate)
      .send({ from: state.account })
      .once("receipt", receipt => {
        const newProduct = {
          name,
          description,
          category,
          deposit,
          daily_rate,
          owner: state.account
        };
        addProduct(newProduct);
        cancelLoading();
      })
      .on("error", err => {
        cancelLoading();
      });
  };

  const rentProduct = id => {
    startLoading();
    const changedID = id - 1;
    state.marketplace.methods
      .rentProduct(id)
      .send({
        from: state.account,
        value: state.products[changedID].rentalDeposit
      })
      .once("receipt", receipt => {
        handleRentState(false, changedID);
        cancelLoading();
      })
      .on("error", err => {
        cancelLoading();
      });
  };

  const returnProduct = id => {
    startLoading();
    const changedID = id - 1;
    const idString = id.toString();
    const endDate = Date.now() / 1000; // JS is in milliseconds
    const rentalDays =
      (Math.trunc(endDate) - state.products[changedID].rentalStart) / 86400;
    state.marketplace.methods
      .returnProduct(idString, Math.ceil(rentalDays))
      .send({
        from: state.account
      })
      .once("receipt", receipt => {
        console.log('rentalCost', receipt.events.ProductReturned.returnValues.rentalCost)
        setReceiptDetails(receipt.events.ProductReturned.returnValues)
        handleRentState(true, changedID);
        cancelLoading();
      })
      .then(() => {
        toggleReceiptDetails();
      })
    cancelLoading();
  };

  const editProduct = (
    id,
    name,
    description,
    category,
    deposit,
    daily_rate
  ) => {
    startLoading();
    const idString = id.toString();
    state.marketplace.methods
      .editProduct(idString, name, description, category, deposit, daily_rate)
      .send({
        from: state.account
      })
      .once("receipt", receipt => {
        cancelLoading();
      })
      .on("error", err => {
        cancelLoading();
      });
  };

  return (
    <BlockchainContext.Provider
      value={{
        account: state.account,
        productCount: state.productCount,
        products: state.products,
        loading: state.loading,
        marketplace: state.marketplace,
        error: state.error,
        showReceiptModal: state.showReceiptModal,
        receipt: state.receipt,
        setAccount,
        setMarketplace,
        setProductCount,
        addProduct,
        cancelLoading,
        startLoading,
        createProduct,
        rentProduct,
        returnProduct,
        editProduct,
        toggleReceiptDetails
      }}
    >
      {props.children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainState;
