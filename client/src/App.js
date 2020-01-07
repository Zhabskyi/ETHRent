import React, { useEffect, useContext, Fragment } from "react";
import Marketplace from "./contracts/Marketplace.json";
import Web3 from "web3";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

import ItemState from "./context/Item/itemState";
import AuthState from "./context/auth/AuthState";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import PrivateRoute from "./components/routing/PrivateRoute";
import PrivateItems from "./components/items/PrivateItems";
import Register from "./components/form/FormRegister";
import Login from "./components/form/FormLogin";
import AddItem from "./components/form/FormAddItem";
import About from "./pages/about/About";
import BlockchainContext from "./context/blockchain/blockchainContext";

const App = () => {
  const blockchainContext = useContext(BlockchainContext);

  const {
    setAccount,
    setMarketplace,
    setProductCount,
    setProducts,
    cancelLoading,
    loading
  } = blockchainContext;

  useEffect(() => {
    loadWeb3();
  }, []);

  useEffect(() => {
    loadBlockchainData();
  },[])

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const marketplace = new web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      setMarketplace(marketplace);
      const productCount = await marketplace.methods.productCount().call();
      setProductCount(productCount);
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        setProducts(product);
      }
      cancelLoading();
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading Web3, accounts, and contract...</div>
      ) : (
        <AuthState>
          <ItemState>
            <Router>
              <Fragment>
                <Navbar title={"ETHRent"} />
                <div className='container'>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/add-item' component={AddItem} />
                    <PrivateRoute exact path='/my-items'>
                      <PrivateItems />
                    </PrivateRoute>
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </ItemState>
        </AuthState>
      )}
    </>
  );
};

export default App;
