import React, { useContext, useEffect, useState } from "react";
import classes from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import Button from "../button/Button";
import SideDrawer from "../sideDrawer/SideDrawer";
import MenuToggle from "../menuToggle/MenuToggle";

const Navbar = ({ title }) => {

  const [showSideDrawer, setState] = useState(false);

  const sideDrawerClosedHandler = () => {
    setState(false);
  };

  const sideDrawerToggleHandler = () => {
    setState(!showSideDrawer);
  };

  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const linksUser = (
    <>
      <div className={classes.nav__list_myItems}>
        <Link to='/my-items'>My Items</Link>
      </div>
      <li className={classes.nav__list_add}>
        <Link to='/add-item'>Add Item</Link>
      </li>
      <li>
        <span className={classes.name}>{user && user.first_name}</span>
        <span className={classes.name}>{user && user.last_name}</span>
      </li>
      <li>
        <Button onClick={logout} confirm>
          Logout
        </Button>
      </li>
    </>
  );

  const linksUnregistered = (
    <>
      <li>
        <Link to='/register'>
          <Button confirm>Register</Button>
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <Button confirm>Login</Button>
        </Link>
      </li>
    </>
  );

  return (
    <div className={classes.nav}>
      <h3>
        <Link to='/'>{title}</Link>
      </h3>
      <ul className={classes.nav__list}>
        {isAuthenticated ? linksUser : linksUnregistered}
      </ul>
      <MenuToggle onClick={sideDrawerToggleHandler} />
      <SideDrawer
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
        onClick={sideDrawerClosedHandler}
      />
    </div>
  );
};

export default Navbar;
