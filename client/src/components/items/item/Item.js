import React from "react";
import classes from "./Item.module.scss";

import Button from "../../button/Button";

const Item = ({ item }) => {
  const { id, title, description, dailyRate, deposit, photo } = item;
  return (
    <div className={classes.container}>
      <p className={classes.title}>{title}</p>
      <div className={classes.photo}>
        <img src={photo} alt='item' />
      </div>
      <p>Daily Rate: {dailyRate}</p>
      <div>
        <Button details>Details</Button>
      </div>
    </div>
  );
};

export default Item;
