import React from "react";

import classes from "./Button.module.scss";
import classNames from "classnames";

const Button = props => {
  const buttonClass = classNames(
    classes.button,
    props.className, 
    props.danger ? classes.danger :
    props.confirm ? classes.confirm :
    props.error ? classes.error :
    props.details ? classes.details : null
  );

  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={buttonClass}
    >
      {props.children}
    </button>
  );
};

export default Button;
