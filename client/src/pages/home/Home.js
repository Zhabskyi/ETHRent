import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.scss";
import Items from "../../components/items/Items";
import AuthContext from "../../context/auth/authContext";

const Home = props => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={classes.manage}>
        {isAuthenticated ? <Link to='/my-items'>Manage my items</Link> : null}
      </div>
      <div className={classes.container}>
        <Items createProduct={props.createProduct}/>
      </div>
    </>
  );
};

export default Home;
