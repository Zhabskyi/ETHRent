import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import classes from "./Navbar.module.scss";
import AuthContext from "../../context/auth/authContext";
import NavbarItems from "./navbarItems/NavbarItems";

const Navbar = ( props ) => {

  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);


  return (
    <nav className={classes.nav}>
      <NavbarItems
        title={props.title}
        user={user}
        isAuthenticated={isAuthenticated}
        logout={logout}
      />
    </nav>
  );
};

export default withRouter(Navbar);
