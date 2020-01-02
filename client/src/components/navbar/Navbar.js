import React from "react";
import classes from "./Navbar.module.scss";
import { Link } from "react-router-dom";

const Navbar = ({ title, icon }) => {
  return (
    <div className={classes.nav}>
      <h1>{title}</h1>
      <ul className={classes.nav__list}>
        <li>Add Item</li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
