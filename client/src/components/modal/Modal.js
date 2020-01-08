import React from "react";
import classes from "./Modal.module.scss";
import classNames from "classnames";
import Button from "../button/Button";

import Backdrop from "../backdrop/Backdrop";

const Modal = props => {

  if (!props.show) {
    return null;
  }
  return (
    <>
      <Backdrop show={props.show} onClick={props.onClose} />
      <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
        <div className={classes.actions}>
        <Button className={classes.close_button} onClick={props.onClose} >
          <span></span>
          </Button>
          <Button details_lg>
            Contact info
          </Button>
        </div>
      </div>
    </>
  );
};

export default Modal;
