import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import classes from "./Navbar.module.scss";
import AuthContext from "../../context/auth/authContext";
import NavbarItems from "./navbarItems/NavbarItems";

const Navbar = props => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const [ethPrice, setEthPrice] = useState(null);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getEthPrice();
  }, [ethPrice])

  const getEthPrice = () => {
    const headers = { "Content-Type": "application/x-www-form-urlencoded" };

    axios
      .get(
        "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=TXW4MT24GNRDX87EI79VGZKDQIEYTBK8N6",
        headers
      )
      .then(res => {
        console.log("Respobnse", res);
        setEthPrice(res.data.result.ethusd)
        console.log('EthPrice', ethPrice)
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <nav className={classes.nav}>
      <NavbarItems
        title={props.title}
        user={user}
        isAuthenticated={isAuthenticated}
        logout={logout}
        ethPrice={ethPrice}
      />
    </nav>
  );
};

export default withRouter(Navbar);
