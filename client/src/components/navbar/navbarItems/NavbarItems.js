import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import classes from "../Navbar.module.scss";
import { Link } from "react-router-dom";
import Button from "../../button/Button";

const NavbarItems = props => {
  const { title, user, isAuthenticated, logout } = props;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated]);

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
    <>
      <h3>
        <Link to='/'>{title}</Link>
      </h3>
      <ul className={classes.nav__list}>
        {isAuthenticated ? linksUser : linksUnregistered}
      </ul>
    </>
  );
};

export default withRouter(NavbarItems);
