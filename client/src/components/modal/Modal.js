import React from "react";
import classes from "./Modal.module.scss";
import Button from "../button/Button";
import classNames from "classnames";

import Backdrop from "../backdrop/Backdrop";

const Modal = props => {
  if (!props.show) {
    return null;
  }

  const modalClass = classNames (
    classes.close_button,
    props.editClose ? classes.editClose : null,
  )

  return (
    <>
      <Backdrop show={props.show} onClick={props.onClose} />
      <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
        <div className={classes.actions}>
          <Button className={modalClass} onClick={props.onClose}>
            <span></span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Modal;
