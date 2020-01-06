import React, { useEffect, useContext, Fragment } from "react";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Marketplace from "./contracts/Marketplace.json";
// import getWeb3 from "./getWeb3";
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

    // this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const marketplace = new web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      setMarketplace(marketplace);
      //this.setState({ marketplace });
      const productCount = await marketplace.methods.productCount().call();
      setProductCount(productCount);
      // this.setState({ productCount });
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        setProducts(product);
        //this.setState({
        // products: [...this.state.products, product]
        //});
      }
      cancelLoading();
      //this.setState({ loading: false });
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  };

  // createProduct(name, deposit, daily_rate) {
  //   this.setState({ loading: true });
  //   this.state.marketplace.methods
  //     .createProduct(name, deposit, daily_rate)
  //     .send({ from: this.state.account })
  //     .once("receipt", receipt => {
  //       console.log("RECEIP recived!");
  //       this.setState({ loading: false });
  //       this.loadBlockchainData();
  //     });
  // }

  // rentProduct(id) {
  //   this.setState({ loading: true });
  //   console.log("ACCOUNT", this.state.account);
  //   console.log(id);
  //   const changedID = id - 1;
  //   console.log(this.state.products[changedID]);
  //   console.log("DEPOSIT", this.state.products[changedID].rentalDeposit);
  //   const valueInEther = this.state.products[changedID].rentalDeposit;
  //   this.state.marketplace.methods
  //     .rentProduct(id)
  //     .send({
  //       from: this.state.account,
  //       value: Web3.utils.toWei(valueInEther, 'Ether')
  //     })
  //     .once("receipt", receipt => {
  //       this.setState({ loading: false });
  //     });
  // }

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
