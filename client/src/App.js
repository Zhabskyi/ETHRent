import React, { Component, Fragment } from "react";
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

class App extends Component {
  //state = { storageValue: 0, web3: null, accounts: null, contract: null };

  // componentDidMount = async () => {
  //   try {
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();

  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();

  //     // Get the contract instance.
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = MarketplaceContract.networks[networkId];
  //     const instance = new web3.eth.Contract(
  //       MarketplaceContract.abi,
  //       deployedNetwork && deployedNetwork.address
  //     );

  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     this.setState({ web3, accounts, contract: instance }, this.runExample);
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`
  //     );
  //     console.error(error);
  //   }
  // };

  //runExample = async () => {
  // const { accounts, contract } = this.state;
  // // Stores a given value, 5 by default.
  // await contract.methods.set(5).send({ from: accounts[0] });
  // // Get the value from the contract to prove it worked.
  // const response = await contract.methods.get().call();
  // // Update state with the result.
  // this.setState({ storageValue: response });
  //};

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  async loadWeb3() {
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
  }
  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const marketplace = new web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      this.setState({ marketplace });
      const productCount = await marketplace.methods.productCount().call();
      this.setState({ productCount });
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        this.setState({
          products: [...this.state.products, product]
        });
      }
      this.setState({ loading: false });
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      productCount: 0,
      products: [],
      loading: true
    };
    this.createProduct = this.createProduct.bind(this);
    this.purchaseProduct = this.purchaseProduct.bind(this);
  }
  createProduct(name, deposit, daily_rate ) {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .createProduct(name, deposit, daily_rate)
      .send({ from: this.state.account })
      .once("receipt", receipt => {
        console.log("RECEIP recived!")
        this.setState({ loading: false });
        this.loadBlockchainData();
      });
  }
  purchaseProduct(id, price) {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .purchaseProduct(id)
      .send({ from: this.state.account, value: price })
      .once("receipt", receipt => {
        this.setState({ loading: false });
        
      });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <AuthState>
        <ItemState>
          <Router>
            <Fragment>
              <Navbar title={"ETHRent"} />
              <div className='container'>
                <Switch>
                  <Route exact path='/' render={() => {
                    return <Home createProduct={this.createProduct} />
                  }} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/add-item' render={() => {
                    return <AddItem createProduct={this.createProduct} />
                  }} />
                  {/* <PrivateRoute
                    exact
                    path='/my-items'
                    render={() => {
                      return <PrivateItems createProduct={this.state.createProduct} />
                    }}
                  /> */}
                </Switch>
              </div>
            </Fragment>
          </Router>
        </ItemState>
      </AuthState>
    );
  }
}

export default App;
