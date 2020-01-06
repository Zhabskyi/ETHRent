import React, { useContext, useEffect } from "react";
import classes from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = ({ title }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const linksUser = (
    <>
      <li>
        {user && user.first_name} {user && user.last_name}
      </li>
      <li>
        <Link to='/add-item'>Add Item</Link>
      </li>
      <li>
        <button onClick={logout}>Logout</button>
      </li>
    </>
  );

  const linksUnregistered = (
    <>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </>
  );

  return (
    <div className={classes.nav}>
      <h1>
        <Link to='/'>{title}</Link>
      </h1>
      <ul className={classes.nav__list}>
        {isAuthenticated ? linksUser : linksUnregistered}
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
