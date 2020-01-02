import React, { useContext, useEffect } from "react";
import classes from "./Home.module.scss";
import Items from "../../components/items/Items";
import AuthContext from "../../context/auth/authContext";
import Button from "../../components/button/Button";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={classes.manage}>
        {isAuthenticated ? <Button confirm>Manage your items</Button> : null}
      </div>
      <div className={classes.container}>
        <Items />
      </div>
    </>
  );
};

export default Home;
