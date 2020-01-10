import React, { useContext, useEffect } from "react";
import classes from "./Navbar.module.scss";
import AuthContext from "../../context/auth/authContext";
import NavbarItems from "./navbarItems/NavbarItems";

const Navbar = ({ title }) => {

  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);


  return (
    <nav className={classes.nav}>
      <NavbarItems
        title={title}
        user={user}
        isAuthenticated={isAuthenticated}
        logout={logout}
      />
    </nav>
  );
};

export default Navbar;
