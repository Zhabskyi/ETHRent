import React from "react";
import classes from "./Modal.module.scss";
import classNames from "classnames";

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
        <div className={classes.action}>
          <button className={classes.toggle_button} onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
