import React from "react";
import classes from "./Item.module.scss";

const Item = ({ item }) => {
  const { id, title, description, dailyRate, deposit, photo } = item;
  return (
    <div className={classes.container}>
      <h5>{title}</h5>
    </div>
  );
};

export default Item;
