import React from "react";

import classes from "./Button.module.scss";
import classNames from "classnames";

const Button = props => {
  const buttonClass = classNames(
    classes.button,
    props.className, 
    props.confirm ? classes.confirm :
    props.danger ? classes.danger :
    props.cancel ? classes.cancel :
    props.edit ? classes.edit :
    props.details ? classes.details :
    props.details_lg ? classes.details_lg : null
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
