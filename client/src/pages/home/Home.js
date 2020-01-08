import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.scss";
import Items from "../../components/items/Items";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (    
    <>
      <div className={classes.info}>
        <h4 className={classes.banner}>Easy Peer-to-Peer Renting</h4>
        <ul className={classes.benefits}>
          <li>Find the gear you need for a short amount of time</li>
          <li>Earn ether for your stuff while it's not in use</li>
        </ul>
        <ol className={classes.directions}>
          <li>Transfer the required deposit to the Ethereum Blockchain</li>
          <li>Use the item for as long as you want</li>
          <li>Once the item is returned, the owner ends the Rental</li>
        </ol>
      </div>
      <div className={classes.manage}>
        {isAuthenticated ? <Link to='/my-items'>Manage my items</Link> : null}
      </div>
      <div className={classes.container}>
        <Items />
      </div>
    </>
  );
};

export default Home;
