import React from "react";

import Navbar from "../navbar/Navbar";
import classes from "./SideDrawer.module.scss";
import Backdrop from "../backdrop/Backdrop";
import Button from "../button/Button";

const sideDrawer = props => {
  let attachedClasses = [classes.sideDrawer, classes.close];
  if (props.open) {
    attachedClasses = [classes.sideDrawer, classes.open];
  }
  return (
    <React.Fragment>
      <Backdrop show={props.open} onClick={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.wrapper}>
        <Button className={classes.close_button} onClick={props.onClose}>
            <span></span>
          </Button>
          <div className={classes.logo}></div>
          <nav>
            <h1>HElloo</h1>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;
