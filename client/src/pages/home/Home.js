import React, { useContext, useEffect } from "react";
import classes from "./Home.module.scss";
import Items from "../../components/items/Items";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.container}>
      <Items />
    </div>
  );
};

export default Home;
