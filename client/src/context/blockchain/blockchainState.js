import React, { useReducer } from "react";

import BlockchainContext from "./blockchainContext";
import blockchainReducer from "./blockchainReducer";
import Web3 from "web3";

import {
  SET_LOADING,
  SET_ACCOUNT,
  SET_MARKETPLACE,
  SET_PRODUCTCOUNT,
  ADD_PRODUCT,
  CANCEL_LOADING
} from "../actionTypes";

const BlockchainState = props => {
  const initialState = {
    account: "",
    productCount: 0,
    products: [],
    loading: true,
    marketplace: null
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

  const setProducts = product => {
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

  const createProduct = (name, description, deposit, daily_rate) => {
    startLoading();
    state.marketplace.methods
      .createProduct(name, description, deposit, daily_rate)
      .send({ from: state.account })
      .once("receipt", receipt => {
        console.log("RECEIP recived!");
        cancelLoading();
      });
  };

  const rentProduct = id => {
    startLoading();
    console.log("ACCOUNT", state.account);
    console.log(id);
    const changedID = id - 1;
    console.log(state.products[changedID]);
    console.log("DEPOSIT", state.products[changedID].rentalDeposit);
    const valueInEther = state.products[changedID].rentalDeposit;
    state.marketplace.methods
      .rentProduct(id)
      .send({
        from: state.account,
        value: Web3.utils.toWei(valueInEther, "Ether")
      })
      .once("receipt", receipt => {
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
        setAccount,
        setMarketplace,
        setProductCount,
        setProducts,
        cancelLoading,
        startLoading,
        createProduct,
        rentProduct
      }}
    >
      {props.children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainState;
