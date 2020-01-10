import React from "react";
import classes from "./Modal.module.scss";
import Button from "../button/Button";
import classNames from "classnames";

import Backdrop from "../backdrop/Backdrop";

const Modal = props => {
  if (!props.show) {
    return null;
  }

  const buttonClass = classNames (
    classes.close_button,
    props.editClose ? classes.editClose : null,
  )

  const modalClass = classNames (
    classes.modal,
    props.edit ? classes.edit : null
  )

  console.log('modal props', props)

  return (
    <>
      <Backdrop show={props.show} onClick={props.onClose} />
      <div className={modalClass}>
        <div className={classes.content}>{props.children}</div>
        <div className={classes.actions}>
          <Button className={buttonClass} onClick={props.onClose}>
            <span></span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Modal;
